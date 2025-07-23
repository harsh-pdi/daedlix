import { OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {

  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey({ type: 'int8', autoincrement: true })
  id!: number;

  @Property({ defaultRaw: 'now()' })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), defaultRaw: 'now()' })
  updatedAt = new Date();

}