import {DefaultCrudRepository} from '@loopback/repository';
import {CastMember, CastMemberRelations} from '../models';
import {Esv7DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CastMemberRepository extends DefaultCrudRepository<
  CastMember,
  typeof CastMember.prototype.id,
  CastMemberRelations
> {
  constructor(@inject('datasources.esv7') dataSource: Esv7DataSource) {
    super(CastMember, dataSource);
  }
}
