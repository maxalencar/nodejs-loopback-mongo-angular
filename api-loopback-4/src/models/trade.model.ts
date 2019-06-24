import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class Trade extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  product: string;

  @property({
    type: 'string',
    required: true,
  })
  orderType: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  openingPrice: number;

  @property({
    type: 'date',
    required: true,
  })
  openingDateTime: Date;

  @property({
    type: 'number',
    required: false,
    default: 0,
  })
  closingPrice: number;

  @property({
    type: 'date',
  })
  closingDateTime?: Date;

  @property({
    type: 'string',
    required: true,
    default: 'eur',
  })
  currency: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  size: number;

  @property({
    type: 'number',
    required: false,
    default: 0,
  })
  profitLoss: number;

  constructor(data?: Partial<Trade>) {
    super(data);
  }
}

export interface TradeRelations {
  // describe navigational properties here
}

export type TradeWithRelations = Trade & TradeRelations;
