import { ActionRepository, EmailActionRepository, OrganizationRepository } from '@app/database/repositories';
import { Injectable } from '@nestjs/common';
import { AudienceService } from './audience.service';

@Injectable()
export class ActionService {
    constructor(
        private readonly audienceService: AudienceService,
        private readonly actionRepository: ActionRepository,
        private readonly emailActionRepository: EmailActionRepository,
        private readonly organizationRepository: OrganizationRepository,
    ) {}

    async createAction(input: { name: string, audienceUrls: Array<string> }) {
        if (!input.audienceUrls || !input.audienceUrls.length) {
            return {
                message: `Audience url missing`,
            }
        }

        const organizationId = await this.organizationRepository.insert({
            name: input.name,
        });
        const actionId = await this.actionRepository.insert({
            name: input.name,
            organization: organizationId,
        });

        await this.audienceService.processAudience({
            actionId: 1,
            organizationId: 1,
            audienceUrls: input.audienceUrls,
        });

        return await this.getAction(1);
    }

    async getAction(actionId: number) {
        return await this.actionRepository.findOne(actionId);
    }

    async enableEmailAction(actionId: number) {
        const isEmailActionExists = await this.emailActionRepository.findOne({ action: actionId });

        if (isEmailActionExists) {
            return {
                message: `Email action exists for action: ${actionId}`,
            }
        }

        await this.emailActionRepository.insert({
            action: actionId,
        });

        return true;
    }

    async disableEmailAction(actionId: number) {
        const isEmailActionExists = await this.emailActionRepository.findOne({ action: actionId });

        if (!isEmailActionExists) {
            return {
                message: `Email action doesn't exists for action: ${actionId}`,
            }
        }

        await this.emailActionRepository.nativeDelete({
            action: actionId,
        });

        return true;
    }
}
