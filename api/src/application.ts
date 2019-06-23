import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
import {TradeRepository} from './repositories';
import {Trade} from './models';

export class Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  async migrateSchema(options?: SchemaMigrationOptions) {
    // 1. Run migration scripts provided by connectors
    await super.migrateSchema(options);

    // 2. Make further changes. When creating predefined model instances,
    // handle the case when these instances already exist.
    const tradeRepository = await this.getRepository(TradeRepository);

    let trades: Partial<Trade>[] = [
      {id: '1', product: 'EUR/USD', orderType: 'buy', openingPrice: 1100, openingDateTime: new Date(), closingDateTime: new Date(), closingPrice: 1200, currency: 'eur', size: 10, profitLoss: 1000},
      {id: '2', product: 'EUR/GBP', orderType: 'sell', openingPrice: 5100, openingDateTime: new Date(), currency: 'eur', size: 5},
      {id: '3', product: 'EUR/JPY', orderType: 'buy', openingPrice: 4300, openingDateTime: new Date(), currency: 'eur', size: 4},
      {id: '4', product: 'USD/EUR', orderType: 'sell', openingPrice: 2100, openingDateTime: new Date(), currency: 'eur', size: 100},
      {id: '5', product: 'USD/GBP', orderType: 'sell', openingPrice: 7100, openingDateTime: new Date(), currency: 'eur', size: 50},
      {id: '6', product: 'USD/JPY', orderType: 'buy', openingPrice: 9000, openingDateTime: new Date(), currency: 'eur', size: 8},
    ];

    for (let trade of trades) {
      const found = await tradeRepository.findOne({where: {id: trade.id}});

      if (!found) {
        await tradeRepository.create(trade);
      }
    }
  }
}
