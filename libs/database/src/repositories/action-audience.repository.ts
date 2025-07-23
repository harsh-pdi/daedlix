import { InjectRepository } from "@mikro-orm/nestjs";
import { ActionAudience } from "../entities";
import { BaseEntityRepository } from "./base.repository";

export class ActionAudienceRepository extends BaseEntityRepository<ActionAudience> {
    constructor(@InjectRepository(ActionAudience) private readonly actionAudienceRepo: BaseEntityRepository<ActionAudience>) {
        super(actionAudienceRepo.getEntityManager(), actionAudienceRepo.getEntityName());
    }
}
