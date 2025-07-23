import { Action } from "./action.entity";
import { EmailAction } from "./email-action.entity";
import { Organization } from "./organization.entity";

export * from './action.entity';
export * from './email-action.entity';
export * from './organization.entity';

export const entities = [
    Action,
    EmailAction,
    Organization,
];
