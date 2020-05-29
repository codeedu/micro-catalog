import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscribe} from "../decorators/rabbitmq-subscribe.decorator";
import {repository} from "@loopback/repository";
import {GenreRepository} from "../repositories";
import {Message} from "amqplib";
import {BaseModelSyncService} from "./base-model-sync.service";

@bind({scope: BindingScope.SINGLETON})
export class GenreSyncService extends BaseModelSyncService{
    constructor(
        @repository(GenreRepository) private repo: GenreRepository,
    ) {
        super();
    }

    @rabbitmqSubscribe({
        exchange: 'amq.topic',
        queue: 'micro-catalog/sync-videos/genre',
        routingKey: 'model.genre.*'
    })
    async handler({data, message}: { data: any, message: Message }) {
        await this.sync({
            repo: this.repo,
            data,
            message
        })
    }
}
