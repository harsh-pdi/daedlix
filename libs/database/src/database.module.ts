import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseService } from './database.service';
import dbConfig from './datastore/mikro-orm.config';
import { entities } from './entities';
import { repositories } from './repositories';

@Module({
    imports: [
        MikroOrmModule.forRootAsync({
            useFactory: () => {
                return {
                    ...dbConfig,
                };
            },
        }),
        MikroOrmModule.forFeature(entities),
    ],
    providers: [...repositories, DatabaseService],
    exports: [...repositories, DatabaseService],
})
export class DatabaseModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MikroOrmMiddleware).forRoutes('*');
    }
}
