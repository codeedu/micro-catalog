import {DefaultCrudRepository} from '@loopback/repository';
import {Genre, GenreRelations} from '../models';
import {Esv7DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GenreRepository extends DefaultCrudRepository<
  Genre,
  typeof Genre.prototype.id,
  GenreRelations
> {
  constructor(
    @inject('datasources.esv7') dataSource: Esv7DataSource,
  ) {
    super(Genre, dataSource);
  }
}
