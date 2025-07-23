import { InjectRepository } from "@mikro-orm/nestjs";
import { Action } from "../entities";
import { BaseEntityRepository } from "./base.repository";

export class ActionRepository extends BaseEntityRepository<Action> {
    constructor(@InjectRepository(Action) private readonly actionRepo: BaseEntityRepository<Action>) {
        super(actionRepo.getEntityManager(), actionRepo.getEntityName());
    }
}
