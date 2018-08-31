package org.vincedgy.prefwebapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.vincedgy.prefwebapp.service.BusinessServiceService;
import org.vincedgy.prefwebapp.web.rest.errors.BadRequestAlertException;
import org.vincedgy.prefwebapp.web.rest.util.HeaderUtil;
import org.vincedgy.prefwebapp.service.dto.BusinessServiceDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BusinessService.
 */
@RestController
@RequestMapping("/api")
public class BusinessServiceResource {

    private final Logger log = LoggerFactory.getLogger(BusinessServiceResource.class);

    private static final String ENTITY_NAME = "businessService";

    private final BusinessServiceService businessServiceService;

    public BusinessServiceResource(BusinessServiceService businessServiceService) {
        this.businessServiceService = businessServiceService;
    }

    /**
     * POST  /business-services : Create a new businessService.
     *
     * @param businessServiceDTO the businessServiceDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new businessServiceDTO, or with status 400 (Bad Request) if the businessService has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/business-services")
    @Timed
    public ResponseEntity<BusinessServiceDTO> createBusinessService(@Valid @RequestBody BusinessServiceDTO businessServiceDTO) throws URISyntaxException {
        log.debug("REST request to save BusinessService : {}", businessServiceDTO);
        if (businessServiceDTO.getId() != null) {
            throw new BadRequestAlertException("A new businessService cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BusinessServiceDTO result = businessServiceService.save(businessServiceDTO);
        return ResponseEntity.created(new URI("/api/business-services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /business-services : Updates an existing businessService.
     *
     * @param businessServiceDTO the businessServiceDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated businessServiceDTO,
     * or with status 400 (Bad Request) if the businessServiceDTO is not valid,
     * or with status 500 (Internal Server Error) if the businessServiceDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/business-services")
    @Timed
    public ResponseEntity<BusinessServiceDTO> updateBusinessService(@Valid @RequestBody BusinessServiceDTO businessServiceDTO) throws URISyntaxException {
        log.debug("REST request to update BusinessService : {}", businessServiceDTO);
        if (businessServiceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BusinessServiceDTO result = businessServiceService.save(businessServiceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, businessServiceDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /business-services : get all the businessServices.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of businessServices in body
     */
    @GetMapping("/business-services")
    @Timed
    public List<BusinessServiceDTO> getAllBusinessServices() {
        log.debug("REST request to get all BusinessServices");
        return businessServiceService.findAll();
    }

    /**
     * GET  /business-services/:id : get the "id" businessService.
     *
     * @param id the id of the businessServiceDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the businessServiceDTO, or with status 404 (Not Found)
     */
    @GetMapping("/business-services/{id}")
    @Timed
    public ResponseEntity<BusinessServiceDTO> getBusinessService(@PathVariable Long id) {
        log.debug("REST request to get BusinessService : {}", id);
        Optional<BusinessServiceDTO> businessServiceDTO = businessServiceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(businessServiceDTO);
    }

    /**
     * DELETE  /business-services/:id : delete the "id" businessService.
     *
     * @param id the id of the businessServiceDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/business-services/{id}")
    @Timed
    public ResponseEntity<Void> deleteBusinessService(@PathVariable Long id) {
        log.debug("REST request to delete BusinessService : {}", id);
        businessServiceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
