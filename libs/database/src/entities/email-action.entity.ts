import { Entity, OneToOne } from '@mikro-orm/core';
import { SCHEMA_NAME } from '../datastore/constants';
import { Action } from './action.entity';
import { BaseEntity } from './base.entity';

// @Entity({ repository: () => EmailActionRepository })
@Entity({ schema: SCHEMA_NAME, tableName: 'email_action' })
export class EmailAction extends BaseEntity {

   // [EntityRepositoryType]?: EmailActionRepository;

   @OneToOne({ entity: () => Action })
   action!: Action;

}
