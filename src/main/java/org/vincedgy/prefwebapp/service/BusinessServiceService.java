package org.vincedgy.prefwebapp.service;

import org.vincedgy.prefwebapp.service.dto.BusinessServiceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing BusinessService.
 */
public interface BusinessServiceService {

    /**
     * Save a businessService.
     *
     * @param businessServiceDTO the entity to save
     * @return the persisted entity
     */
    BusinessServiceDTO save(BusinessServiceDTO businessServiceDTO);

    /**
     * Get all the businessServices.
     *
     * @return the list of entities
     */
    List<BusinessServiceDTO> findAll();


    /**
     * Get the "id" businessService.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BusinessServiceDTO> findOne(Long id);

    /**
     * Delete the "id" businessService.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
