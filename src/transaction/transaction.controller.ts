import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { FindQueryParams } from './dto/findParams';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { UserData } from '../auth/common/decorators/user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @UserData() user: User,
  ): Promise<Transaction> {
    return this.transactionService.create(createTransactionDto, user);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  findAllByUser(@Query() query: FindQueryParams, @UserData() user: User) {
    return this.transactionService.findAll(query, user);
  }

	@Get('all')
	findAll() {
		return this.transactionService.findAllUsers();
	}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  update(
    @Param('id') id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @UserData() user: User,
  ) {
    return this.transactionService.update(+id, updateTransactionDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  remove(@Param('id') id: number, @UserData() user: User) {
    return this.transactionService.remove(+id, user);
  }
}
