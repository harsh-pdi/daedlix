import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { SCHEMA_NAME } from '../datastore/constants';
import { ActionAudience } from './action-audience.entity';
import { BaseEntity } from './base.entity';
import { Organization } from './organization.entity';

// @Entity({ repository: () => ActionRepository })
@Entity({ schema: SCHEMA_NAME, tableName: 'action' })
export class Action extends BaseEntity {

   // [EntityRepositoryType]?: ActionRepository;

   @Property({ type: 'text', name: 'name' })
   name!: string;

   @ManyToOne({ entity: () => Organization })
   organization!: Organization;

   @OneToMany(() => ActionAudience, (aa) => aa.action)
   actionAudiences = new Collection<ActionAudience>(this);

   constructor(name: string, organization: Organization) {
      super();
      this.name = name;
      this.organization = organization;
   }

}
