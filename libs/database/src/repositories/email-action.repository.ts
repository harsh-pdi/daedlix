import { InjectRepository } from "@mikro-orm/nestjs";
import { EmailAction } from "../entities";
import { BaseEntityRepository } from "./base.repository";

export class EmailActionRepository extends BaseEntityRepository<EmailAction> {
    constructor(@InjectRepository(EmailAction) private readonly emailActionRepo: BaseEntityRepository<EmailAction>) {
        super(emailActionRepo.getEntityManager(), emailActionRepo.getEntityName());
    }
}
