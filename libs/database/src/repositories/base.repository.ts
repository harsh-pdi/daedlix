import { AnyEntity, EntityManager, EntityRepository, FilterQuery, RequiredEntityData, wrap } from '@mikro-orm/postgresql';

export class BaseEntityRepository<T extends object> extends EntityRepository<T> {
    persist(entity: AnyEntity | AnyEntity[]): EntityManager {
        return this.em.persist(entity);
    }

    async persistAndFlush(entity: AnyEntity | AnyEntity[]): Promise<void> {
        await this.em.persistAndFlush(entity);
    }

    remove(entity: AnyEntity): EntityManager {
        return this.em.remove(entity);
    }

    async removeAndFlush(entity: AnyEntity): Promise<void> {
        await this.em.removeAndFlush(entity);
    }

    async flush(): Promise<void> {
        return this.em.flush();
    }

    async insertNewRecord<K extends keyof T>(data: RequiredEntityData<T>, fields: K[] = []): Promise<Pick<T, K>> {
        const entity = this.create(data);
        await this.persistAndFlush(entity);

        return this.selectFields(entity, fields);
    }

    async insertMultiple<K extends keyof T>(data: RequiredEntityData<T>[], fields: K[] = []): Promise<Pick<T, K>[]> {
        const entities = data.map((item) => this.create(item));
        await this.persistAndFlush(entities);

        return entities.map((entity) => this.selectFields(entity, fields));
    }

    async update(filterQuery: FilterQuery<T>, data: AnyEntity) {
        const entity = await this.findOne(filterQuery);
        if (!entity) {
            return null;
        }
        wrap(entity).assign(data);
        return this.persistAndFlush(entity);
    }

    private selectFields<K extends keyof T>(entity: T, fields: K[]): Pick<T, K> {
        const entityObject = wrap(entity).toObject() as T;
        if (fields.length === 0) {
            return entityObject as Pick<T, K>;
        }
        return fields.reduce(
            (acc, field) => {
                acc[field] = entityObject[field];
                return acc;
            },
            {} as Pick<T, K>,
        );
    }
}
