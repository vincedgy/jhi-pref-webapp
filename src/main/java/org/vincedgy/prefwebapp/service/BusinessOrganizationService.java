package org.vincedgy.prefwebapp.service;

import org.vincedgy.prefwebapp.service.dto.BusinessOrganizationDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing BusinessOrganization.
 */
public interface BusinessOrganizationService {

    /**
     * Save a businessOrganization.
     *
     * @param businessOrganizationDTO the entity to save
     * @return the persisted entity
     */
    BusinessOrganizationDTO save(BusinessOrganizationDTO businessOrganizationDTO);

    /**
     * Get all the businessOrganizations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BusinessOrganizationDTO> findAll(Pageable pageable);


    /**
     * Get the "id" businessOrganization.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BusinessOrganizationDTO> findOne(Long id);

    /**
     * Delete the "id" businessOrganization.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
