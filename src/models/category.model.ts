import {Entity, model, property} from '@loopback/repository';

@model() //Metadata
export class Category extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
    default: ''
  })
  description: string;

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
  created_at: string; //iso 8601 YYYY-MM-DDT00:00:00

  @property({
    type: 'date',
    required: true,
  })
  updated_at: string;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
