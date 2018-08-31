package org.vincedgy.prefwebapp.service.impl;

import org.vincedgy.prefwebapp.service.BusinessServiceService;
import org.vincedgy.prefwebapp.domain.BusinessService;
import org.vincedgy.prefwebapp.repository.BusinessServiceRepository;
import org.vincedgy.prefwebapp.service.dto.BusinessServiceDTO;
import org.vincedgy.prefwebapp.service.mapper.BusinessServiceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing BusinessService.
 */
@Service
@Transactional
public class BusinessServiceServiceImpl implements BusinessServiceService {

    private final Logger log = LoggerFactory.getLogger(BusinessServiceServiceImpl.class);

    private final BusinessServiceRepository businessServiceRepository;

    private final BusinessServiceMapper businessServiceMapper;

    public BusinessServiceServiceImpl(BusinessServiceRepository businessServiceRepository, BusinessServiceMapper businessServiceMapper) {
        this.businessServiceRepository = businessServiceRepository;
        this.businessServiceMapper = businessServiceMapper;
    }

    /**
     * Save a businessService.
     *
     * @param businessServiceDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BusinessServiceDTO save(BusinessServiceDTO businessServiceDTO) {
        log.debug("Request to save BusinessService : {}", businessServiceDTO);
        BusinessService businessService = businessServiceMapper.toEntity(businessServiceDTO);
        businessService = businessServiceRepository.save(businessService);
        return businessServiceMapper.toDto(businessService);
    }

    /**
     * Get all the businessServices.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BusinessServiceDTO> findAll() {
        log.debug("Request to get all BusinessServices");
        return businessServiceRepository.findAll().stream()
            .map(businessServiceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one businessService by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BusinessServiceDTO> findOne(Long id) {
        log.debug("Request to get BusinessService : {}", id);
        return businessServiceRepository.findById(id)
            .map(businessServiceMapper::toDto);
    }

    /**
     * Delete the businessService by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BusinessService : {}", id);
        businessServiceRepository.deleteById(id);
    }
}
