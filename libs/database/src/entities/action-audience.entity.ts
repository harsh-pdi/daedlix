import { Entity, ManyToOne } from '@mikro-orm/core';
import { Action } from './action.entity';
import { Audience } from './audience.entity';
import { BaseEntity } from './base.entity';

@Entity({ tableName: 'action_audience' })
export class ActionAudience extends BaseEntity {

    @ManyToOne(() => Action, { deleteRule: 'cascade' })
    action!: Action;

    @ManyToOne(() => Audience, { deleteRule: 'cascade' })
    audience!: Audience;

}
