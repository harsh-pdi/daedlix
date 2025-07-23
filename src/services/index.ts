import { ActionService } from "./action.service";
import { AudienceFileService } from "./audience-file.service";
import { AudienceService } from "./audience.service";

export * from './action.service';
export * from './audience-file.service';
export * from './audience.service';

export const services = [
    ActionService,
    AudienceFileService,
    AudienceService,
];
