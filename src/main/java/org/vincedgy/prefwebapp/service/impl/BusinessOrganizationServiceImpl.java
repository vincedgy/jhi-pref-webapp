package org.vincedgy.prefwebapp.service.impl;

import org.vincedgy.prefwebapp.service.BusinessOrganizationService;
import org.vincedgy.prefwebapp.domain.BusinessOrganization;
import org.vincedgy.prefwebapp.repository.BusinessOrganizationRepository;
import org.vincedgy.prefwebapp.service.dto.BusinessOrganizationDTO;
import org.vincedgy.prefwebapp.service.mapper.BusinessOrganizationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing BusinessOrganization.
 */
@Service
@Transactional
public class BusinessOrganizationServiceImpl implements BusinessOrganizationService {

    private final Logger log = LoggerFactory.getLogger(BusinessOrganizationServiceImpl.class);

    private final BusinessOrganizationRepository businessOrganizationRepository;

    private final BusinessOrganizationMapper businessOrganizationMapper;

    public BusinessOrganizationServiceImpl(BusinessOrganizationRepository businessOrganizationRepository, BusinessOrganizationMapper businessOrganizationMapper) {
        this.businessOrganizationRepository = businessOrganizationRepository;
        this.businessOrganizationMapper = businessOrganizationMapper;
    }

    /**
     * Save a businessOrganization.
     *
     * @param businessOrganizationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BusinessOrganizationDTO save(BusinessOrganizationDTO businessOrganizationDTO) {
        log.debug("Request to save BusinessOrganization : {}", businessOrganizationDTO);
        BusinessOrganization businessOrganization = businessOrganizationMapper.toEntity(businessOrganizationDTO);
        businessOrganization = businessOrganizationRepository.save(businessOrganization);
        return businessOrganizationMapper.toDto(businessOrganization);
    }

    /**
     * Get all the businessOrganizations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BusinessOrganizationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BusinessOrganizations");
        return businessOrganizationRepository.findAll(pageable)
            .map(businessOrganizationMapper::toDto);
    }


    /**
     * Get one businessOrganization by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BusinessOrganizationDTO> findOne(Long id) {
        log.debug("Request to get BusinessOrganization : {}", id);
        return businessOrganizationRepository.findById(id)
            .map(businessOrganizationMapper::toDto);
    }

    /**
     * Delete the businessOrganization by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BusinessOrganization : {}", id);
        businessOrganizationRepository.deleteById(id);
    }
}
