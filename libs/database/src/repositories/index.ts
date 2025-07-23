import { ActionAudienceRepository } from "./action-audience.repository";
import { ActionRepository } from "./action.repository";
import { AudienceRepository } from "./audience.repository";
import { EmailActionRepository } from "./email-action.repository";
import { OrganizationRepository } from "./organization.repository";

export * from './action-audience.repository';
export * from './action.repository';
export * from './audience.repository';
export * from './email-action.repository';
export * from './organization.repository';

export const repositories = [
    ActionAudienceRepository,
    ActionRepository,
    AudienceRepository,
    EmailActionRepository,
    OrganizationRepository,
];
