import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const appVersion = '1';

async function bootstrap() {
    // await MikroORM.init(dbConfig);
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get('PORT');

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: appVersion,
    });

    await app.listen(port);
}
bootstrap();
