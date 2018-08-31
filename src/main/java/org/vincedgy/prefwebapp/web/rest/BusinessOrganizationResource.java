package org.vincedgy.prefwebapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.vincedgy.prefwebapp.service.BusinessOrganizationService;
import org.vincedgy.prefwebapp.web.rest.errors.BadRequestAlertException;
import org.vincedgy.prefwebapp.web.rest.util.HeaderUtil;
import org.vincedgy.prefwebapp.web.rest.util.PaginationUtil;
import org.vincedgy.prefwebapp.service.dto.BusinessOrganizationDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BusinessOrganization.
 */
@RestController
@RequestMapping("/api")
public class BusinessOrganizationResource {

    private final Logger log = LoggerFactory.getLogger(BusinessOrganizationResource.class);

    private static final String ENTITY_NAME = "businessOrganization";

    private final BusinessOrganizationService businessOrganizationService;

    public BusinessOrganizationResource(BusinessOrganizationService businessOrganizationService) {
        this.businessOrganizationService = businessOrganizationService;
    }

    /**
     * POST  /business-organizations : Create a new businessOrganization.
     *
     * @param businessOrganizationDTO the businessOrganizationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new businessOrganizationDTO, or with status 400 (Bad Request) if the businessOrganization has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/business-organizations")
    @Timed
    public ResponseEntity<BusinessOrganizationDTO> createBusinessOrganization(@Valid @RequestBody BusinessOrganizationDTO businessOrganizationDTO) throws URISyntaxException {
        log.debug("REST request to save BusinessOrganization : {}", businessOrganizationDTO);
        if (businessOrganizationDTO.getId() != null) {
            throw new BadRequestAlertException("A new businessOrganization cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BusinessOrganizationDTO result = businessOrganizationService.save(businessOrganizationDTO);
        return ResponseEntity.created(new URI("/api/business-organizations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /business-organizations : Updates an existing businessOrganization.
     *
     * @param businessOrganizationDTO the businessOrganizationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated businessOrganizationDTO,
     * or with status 400 (Bad Request) if the businessOrganizationDTO is not valid,
     * or with status 500 (Internal Server Error) if the businessOrganizationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/business-organizations")
    @Timed
    public ResponseEntity<BusinessOrganizationDTO> updateBusinessOrganization(@Valid @RequestBody BusinessOrganizationDTO businessOrganizationDTO) throws URISyntaxException {
        log.debug("REST request to update BusinessOrganization : {}", businessOrganizationDTO);
        if (businessOrganizationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BusinessOrganizationDTO result = businessOrganizationService.save(businessOrganizationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, businessOrganizationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /business-organizations : get all the businessOrganizations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of businessOrganizations in body
     */
    @GetMapping("/business-organizations")
    @Timed
    public ResponseEntity<List<BusinessOrganizationDTO>> getAllBusinessOrganizations(Pageable pageable) {
        log.debug("REST request to get a page of BusinessOrganizations");
        Page<BusinessOrganizationDTO> page = businessOrganizationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/business-organizations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /business-organizations/:id : get the "id" businessOrganization.
     *
     * @param id the id of the businessOrganizationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the businessOrganizationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/business-organizations/{id}")
    @Timed
    public ResponseEntity<BusinessOrganizationDTO> getBusinessOrganization(@PathVariable Long id) {
        log.debug("REST request to get BusinessOrganization : {}", id);
        Optional<BusinessOrganizationDTO> businessOrganizationDTO = businessOrganizationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(businessOrganizationDTO);
    }

    /**
     * DELETE  /business-organizations/:id : delete the "id" businessOrganization.
     *
     * @param id the id of the businessOrganizationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/business-organizations/{id}")
    @Timed
    public ResponseEntity<Void> deleteBusinessOrganization(@PathVariable Long id) {
        log.debug("REST request to delete BusinessOrganization : {}", id);
        businessOrganizationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
