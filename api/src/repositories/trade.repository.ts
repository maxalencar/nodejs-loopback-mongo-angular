import {DefaultCrudRepository} from '@loopback/repository';
import {Trade, TradeRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TradeRepository extends DefaultCrudRepository<
  Trade,
  typeof Trade.prototype.id,
  TradeRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Trade, dataSource);
  }
}
