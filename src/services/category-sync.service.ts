import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscribe} from "../decorators/rabbitmq-subscribe.decorator";
import {repository} from "@loopback/repository";
import {CategoryRepository} from "../repositories";
import {Message} from "amqplib";
import {BaseModelSyncService} from "./base-model-sync.service";
import {ResponseEnum} from "../servers";

@bind({scope: BindingScope.SINGLETON})
export class CategorySyncService extends BaseModelSyncService{

    constructor(
        @repository(CategoryRepository) private repo: CategoryRepository,
    ) {
        super()
    }

    @rabbitmqSubscribe({
        exchange: 'amq.topic',
        queue: 'micro-catalog/sync-videos/category',
        routingKey: 'model.category.*'
    })
    async handler({data, message}: { data: any, message: Message }) {

        await this.sync({
            repo: this.repo,
            data,
            message
        })

    }
}
