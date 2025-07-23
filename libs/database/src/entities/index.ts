import { ActionAudience } from "./action-audience.entity";
import { Action } from "./action.entity";
import { Audience } from "./audience.entity";
import { EmailAction } from "./email-action.entity";
import { Organization } from "./organization.entity";

export * from './action-audience.entity';
export * from './action.entity';
export * from './audience.entity';
export * from './email-action.entity';
export * from './organization.entity';

export const entities = [
    ActionAudience,
    Action,
    Audience,
    EmailAction,
    Organization,
];
