import {Entity, model, property} from '@loopback/repository';
export interface SmallCategory {
  id: string;
  name: string;
  is_active: boolean;
}

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
    jsonSchema: {
      minLength: 1,
      maxLength: 255,
    },
  })
  name: string;

  @property({
    type: 'string',
    required: false,
    jsonSchema: {
      nullable: true,
    },
    default: null,
  })
  description: string;

  @property({
    type: 'boolean',
    required: false,
    default: true,
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
