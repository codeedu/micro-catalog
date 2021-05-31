import {bind, /* inject, */ BindingScope, inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CategoryRepository} from '../repositories';
import {
  AjvFactory,
  getModelSchemaRef,
  RestBindings,
  validateRequestBody,
} from '@loopback/rest';

interface ValidateOptions<T> {
  data: object;
  entityClass: Function & {prototype: T};
}

@bind({scope: BindingScope.SINGLETON})
export class ValidatorService {
  cache = new Map();

  constructor(
    @repository(CategoryRepository) private repo: CategoryRepository,
    @inject(RestBindings.AJV_FACTORY) private ajvFactory: AjvFactory,
  ) {}

  async validate<T extends object>({data, entityClass}: ValidateOptions<T>) {
    const modelSchema = getModelSchemaRef(entityClass);
    if (!modelSchema) {
      const error = new Error('The parameter entityClass is not a entity');
      error.name = 'NotEntityClass';
      throw error;
    }
    const schemaRef = {$ref: modelSchema.$ref};
    const schemaName = Object.keys(modelSchema.definitions)[0];
    if (!this.cache.has(schemaName)) {
      this.cache.set(schemaName, modelSchema.definitions[schemaName]);
    }

    const globalSchemas = Array.from(this.cache).reduce<any>(
      (obj, [key, value]) => {
        obj[key] = value;
        return obj;
      },
      {},
    );
    console.dir(globalSchemas, {depth: 8});
    await validateRequestBody(
      {value: data, schema: schemaRef},
      {required: true, content: {}},
      globalSchemas,
      {
        ajvFactory: this.ajvFactory,
      },
    );
  }
}
//services e dependency injection

//ajv instance

//keywords - service

//tag

//grupo serviços - keywords
