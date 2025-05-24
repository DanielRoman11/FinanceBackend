export enum Currency {
  USD = 'USD', // Dólar estadounidense
  EUR = 'EUR', // Euro
  GBP = 'GBP', // Libra esterlina
  JPY = 'JPY', // Yen japonés
  COP = 'COP', // Peso colombiano
  MXN = 'MXN', // Peso mexicano
  ARS = 'ARS', // Peso argentino
  BRL = 'BRL', // Real brasileño
  CLP = 'CLP', // Peso chileno
  PEN = 'PEN', // Sol peruano
}

export enum PaymentPlanStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  PAUSED = 'paused',
}

export enum PaymentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
}

export enum PaymentInterval {
  WEEKLY = 'WEEKLY', // Cada semana
  BIWEEKLY = 'BIWEEKLY', // Cada 15 días
  MONTHLY = 'MONTHLY', // Cada 30 días o mensualmente
  QUARTERLY = 'QUARTERLY', // Cada 3 meses
  YEARLY = 'YEARLY', // Una vez al año
  ONCE = 'ONCE', // Solo una vez (sin recurrencia)
}
