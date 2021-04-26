import {Entity, model, property} from '@loopback/repository';

@model()
export class Genre extends Entity {

    @property({
        id: true,
        generated: false,
        required: true
    })
    id: string;

    @property({
        type: 'string',
        required: true,
    })
    name: string;

    @property({
        type: 'boolean',
        required: false,
        default: true
    })
    is_active: boolean;

    @property({
        type: 'date',
        required: true,
    })
    created_at: string;

    @property({
        type: 'date',
        required: true,
    })
    updated_at: string;

    constructor(data?: Partial<Genre>) {
        super(data);
    }
}

export interface GenreRelations {
    // describe navigational properties here
}

export type GenreWithRelations = Genre & GenreRelations;
