import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import { AudienceFileService } from './audience-file.service';
import { ActionAudienceRepository, AudienceMember, AudienceRepository } from '@app/database';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripBomStream = require('fix-esm').require('strip-bom-stream');

@Injectable()
export class AudienceService {
    constructor(
        private readonly audienceFileService: AudienceFileService,
        private readonly audienceRepository: AudienceRepository,
        private readonly actionAudienceRepository: ActionAudienceRepository,
    ) {}

    async processAudience(input: { actionId: number; organizationId: number; audienceUrls: Array<string> }) {
        for (const url of input.audienceUrls) {
            const audienceId = await this.audienceRepository.insert({
                organization: input.organizationId,
                url,
            });
            await this.actionAudienceRepository.insert({
                action: input.actionId,
                audience: audienceId,
            });

            await this.streamMembersFromAudienceFile(url);
        }
    }

    async streamMembersFromAudienceFile(audienceUrl: string) {
        try {
            const stream = await this.audienceFileService.streamFromS3(audienceUrl, 'email-audiences');
            let data: Array<AudienceMember> = [];
            for await (const row of stream.pipe(stripBomStream.default()).pipe(csv())) {
                data.push({
                    email: row['Email'],
                    firstName: row['FirstName'],
                    lastName: row['LastName'],
                    status: '',
                    statusMessage: '',
                    rawData: row,
                });
                if (data.length === 1000) {
                    await stream.pause();
                    await this.insertMembersToDatabase(data);
                    data = [];
                    await stream.resume();
                }
            }

            if (data.length) {
                await this.insertMembersToDatabase(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async insertMembersToDatabase(data: Array<AudienceMember>) {}
}
