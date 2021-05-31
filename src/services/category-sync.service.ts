import {bind, /* inject, */ BindingScope, service} from '@loopback/core';
import {rabbitmqSubscribe} from '../decorators/rabbitmq-subscribe.decorator';
import {repository} from '@loopback/repository';
import {CategoryRepository} from '../repositories';
import {Message} from 'amqplib';
import {BaseModelSyncService} from './base-model-sync.service';
import {ValidatorService} from './validator.service';

@bind({scope: BindingScope.SINGLETON})
export class CategorySyncService extends BaseModelSyncService {
  constructor(
    @repository(CategoryRepository) private repo: CategoryRepository,
    @service(ValidatorService) private validator: ValidatorService,
  ) {
    super(validator);
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/category',
    routingKey: 'model.category.*',
    queueOptions: {
      deadLetterExchange: 'dlx.amq.topic',
    },
  })
  async handler({data, message}: {data: any; message: Message}) {
    // await this.sleep(10000);
    await this.sync({
      repo: this.repo,
      data,
      message,
    });
  }

  //   sleep(ms: number) {
  //     return new Promise((resolve) => {
  //       setTimeout(resolve, ms);
  //     });
  //   }
}
