import { InjectRepository } from "@mikro-orm/nestjs";
import { EmailAction } from "../entities/email-action.entity";
import { BaseEntityRepository } from "./base.repository";

export class EmailActionRepository extends BaseEntityRepository<EmailAction> {
    constructor(@InjectRepository(EmailAction) private readonly emailActionRepo: BaseEntityRepository<EmailAction>) {
        super(emailActionRepo.getEntityManager(), emailActionRepo.getEntityName());
    }
}
