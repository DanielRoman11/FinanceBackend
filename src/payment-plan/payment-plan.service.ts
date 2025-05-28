import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
import { UpdatePaymentPlanDto } from './dto/update-payment-plan.dto';
import { PaymentPlan } from './entities/payment-plan.entity';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../auth/user.service';

@Injectable()
export class PaymentPlanService {
  constructor(
    @InjectRepository(PaymentPlan)
    private paymentPlanRepo: Repository<PaymentPlan>,
    private userService: UserService,
  ) {}

  async create(
    dto: CreatePaymentPlanDto,
    currentUser: User,
  ): Promise<PaymentPlan> {
    return await this.paymentPlanRepo.save({ ...dto, owner: currentUser });
  }

  async findAll(user: User): Promise<PaymentPlan[]> {
    return this.paymentPlanRepo.find({ where: { owner: { id: user.id } } });
  }

  async findOne(id: string, user: User): Promise<PaymentPlan> {
    const paymentPlan = await this.paymentPlanRepo.findOne({
      where: { owner: { id: user.id }, id },
    });
    if (!paymentPlan)
      throw new NotFoundException(`Payment plan with id ${id} not found`);
    return paymentPlan;
  }

  async update(
    id: string,
    dto: UpdatePaymentPlanDto,
    user: User,
  ): Promise<PaymentPlan> {
    const paymentPlan = await this.findOne(id, user);
    if (paymentPlan.owner.id !== user.id)
      throw new ForbiddenException(
        'You are not authorized to update this payment plan',
      );
    const collaborators = await this.userService.findUsersByIds(
      dto.participantIds,
    );
    if (collaborators.length !== dto.participantIds.length)
      throw new BadRequestException('Some participants do not exist');
    return await this.paymentPlanRepo.save({
      ...paymentPlan,
      ...dto,
      collaborators,
    });
  }

  async remove(id: string, user: User) {
    const paymentPlan = await this.findOne(id, user);
    if (paymentPlan.owner.id !== user.id)
      throw new ForbiddenException(
        'You are not authorized to delete this payment plan',
      );
    return await this.paymentPlanRepo.delete(id);
  }
}
