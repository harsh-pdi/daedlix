import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { controllers } from './controllers';
import { services } from './services';

@Module({
    imports: [
        // MikroOrmModule.forRoot({
        //     ...dbConfig,
        //     autoLoadEntities: true,
        // }),
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
    ],
    controllers: [...controllers, AppController],
    providers: [
        ...services,
        AppService,
    ],
})
export class AppModule {}
