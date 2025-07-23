import { GetObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class AudienceFileService {
    private s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {
        const s3Config: S3ClientConfig = {
            region: this.configService.get('S3_REGION')!,
            credentials: {
                accessKeyId: this.configService.get('S3_KEY')!,
                secretAccessKey: this.configService.get('S3_SECRET')!,
            },
        };
        this.s3Client = new S3Client(s3Config);
    }

    async streamFromS3(url: string, folder: string) {
        try {
            const urlParts = url.split('/');
            let fileName = urlParts[urlParts.length - 1];
            if (folder) {
                fileName = `${folder}/${fileName}`;
            }
            const bucketName = this.configService.get('S3_MEDIA_BUCKET')!;

            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: fileName,
            });
            const response = await this.s3Client.send(command);
            return response.Body as Readable;
        } catch (err) {
            throw err;
        }
    }
}
