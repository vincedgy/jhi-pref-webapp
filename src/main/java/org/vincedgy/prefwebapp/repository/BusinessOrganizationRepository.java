package org.vincedgy.prefwebapp.repository;

import org.vincedgy.prefwebapp.domain.BusinessOrganization;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BusinessOrganization entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessOrganizationRepository extends JpaRepository<BusinessOrganization, Long> {

}
