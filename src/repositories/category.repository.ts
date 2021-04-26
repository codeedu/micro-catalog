import {DefaultCrudRepository} from '@loopback/repository';
import {Category, CategoryRelations} from '../models';
import {Esv7DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {
  constructor(
    @inject('datasources.esv7') dataSource: Esv7DataSource,
  ) {
    super(Category, dataSource);
  }
}
