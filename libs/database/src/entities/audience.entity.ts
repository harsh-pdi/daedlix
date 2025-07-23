import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { ActionAudience } from './action-audience.entity';
import { BaseEntity } from './base.entity';
import { Organization } from './organization.entity';

@Entity({ tableName: 'audience' })
export class Audience extends BaseEntity {

    @ManyToOne(() => Organization, { deleteRule: 'cascade' })
    organization!: Organization;

    @Property()
    url!: string;

    @OneToMany(() => ActionAudience, (aa: any) => aa.audience)
    actionAudiences = new Collection<ActionAudience>(this);

}
