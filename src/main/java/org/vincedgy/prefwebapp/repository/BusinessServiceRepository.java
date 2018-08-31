package org.vincedgy.prefwebapp.repository;

import org.vincedgy.prefwebapp.domain.BusinessService;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BusinessService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessServiceRepository extends JpaRepository<BusinessService, Long> {

}
