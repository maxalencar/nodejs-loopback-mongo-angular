import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Trade} from '../models';
import {TradeRepository} from '../repositories';

export class TradeController {
  constructor(
    @repository(TradeRepository)
    public tradeRepository : TradeRepository,
  ) {}

  @post('/trades', {
    responses: {
      '200': {
        description: 'Trade model instance',
        content: {'application/json': {schema: {'x-ts-type': Trade}}},
      },
    },
  })
  async create(@requestBody() trade: Trade): Promise<Trade> {
    return await this.tradeRepository.create(trade);
  }

  @get('/trades/count', {
    responses: {
      '200': {
        description: 'Trade model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Trade)) where?: Where<Trade>,
  ): Promise<Count> {
    return await this.tradeRepository.count(where);
  }

  @get('/trades', {
    responses: {
      '200': {
        description: 'Array of Trade model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Trade}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Trade)) filter?: Filter<Trade>,
  ): Promise<Trade[]> {
    return await this.tradeRepository.find(filter);
  }

  @patch('/trades', {
    responses: {
      '200': {
        description: 'Trade PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() trade: Trade,
    @param.query.object('where', getWhereSchemaFor(Trade)) where?: Where<Trade>,
  ): Promise<Count> {
    return await this.tradeRepository.updateAll(trade, where);
  }

  @get('/trades/{id}', {
    responses: {
      '200': {
        description: 'Trade model instance',
        content: {'application/json': {schema: {'x-ts-type': Trade}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Trade> {
    return await this.tradeRepository.findById(id);
  }

  @patch('/trades/{id}', {
    responses: {
      '204': {
        description: 'Trade PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() trade: Trade,
  ): Promise<void> {
    await this.tradeRepository.updateById(id, trade);
  }

  @put('/trades/{id}', {
    responses: {
      '204': {
        description: 'Trade PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() trade: Trade,
  ): Promise<void> {
    await this.tradeRepository.replaceById(id, trade);
  }

  @del('/trades/{id}', {
    responses: {
      '204': {
        description: 'Trade DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tradeRepository.deleteById(id);
  }
}
