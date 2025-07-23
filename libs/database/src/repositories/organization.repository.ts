import { InjectRepository } from "@mikro-orm/nestjs";
import { Organization } from "../entities";
import { BaseEntityRepository } from "./base.repository";

export class OrganizationRepository extends BaseEntityRepository<Organization> {
    constructor(@InjectRepository(Organization) private readonly organizationRepo: BaseEntityRepository<Organization>) {
        super(organizationRepo.getEntityManager(), organizationRepo.getEntityName());
    }
}
