import { ActionRepository } from "./action.repository";
import { EmailActionRepository } from "./email-action.repository";
import { OrganizationRepository } from "./organization.repository";

export * from './action.repository';
export * from './email-action.repository';
export * from './organization.repository';

export const repositories = [
    ActionRepository,
    EmailActionRepository,
    OrganizationRepository,
];
