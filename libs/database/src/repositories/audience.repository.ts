import { InjectRepository } from "@mikro-orm/nestjs";
import { BaseEntityRepository } from "./base.repository";
import { Audience } from "../entities";

export class AudienceRepository extends BaseEntityRepository<Audience> {
    constructor(@InjectRepository(Audience) private readonly audienceRepo: BaseEntityRepository<Audience>) {
        super(audienceRepo.getEntityManager(), audienceRepo.getEntityName());
    }
}
