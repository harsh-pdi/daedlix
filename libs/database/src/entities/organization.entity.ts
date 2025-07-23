import { Entity, Property } from '@mikro-orm/core';
import { SCHEMA_NAME } from '../datastore/constants';
import { BaseEntity } from './base.entity';

// @Entity({ repository: () => OrganizationRepository })
@Entity({ schema: SCHEMA_NAME, tableName: 'organization' })
export class Organization extends BaseEntity {

    // [EntityRepositoryType]?: OrganizationRepository;

    @Property()
    name!: string;

}
