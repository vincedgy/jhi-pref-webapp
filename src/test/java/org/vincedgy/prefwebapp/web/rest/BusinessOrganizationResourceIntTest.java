package org.vincedgy.prefwebapp.web.rest;

import org.vincedgy.prefwebapp.PrefWebApp;

import org.vincedgy.prefwebapp.domain.BusinessOrganization;
import org.vincedgy.prefwebapp.repository.BusinessOrganizationRepository;
import org.vincedgy.prefwebapp.service.BusinessOrganizationService;
import org.vincedgy.prefwebapp.service.dto.BusinessOrganizationDTO;
import org.vincedgy.prefwebapp.service.mapper.BusinessOrganizationMapper;
import org.vincedgy.prefwebapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static org.vincedgy.prefwebapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BusinessOrganizationResource REST controller.
 *
 * @see BusinessOrganizationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrefWebApp.class)
public class BusinessOrganizationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private BusinessOrganizationRepository businessOrganizationRepository;


    @Autowired
    private BusinessOrganizationMapper businessOrganizationMapper;
    

    @Autowired
    private BusinessOrganizationService businessOrganizationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBusinessOrganizationMockMvc;

    private BusinessOrganization businessOrganization;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BusinessOrganizationResource businessOrganizationResource = new BusinessOrganizationResource(businessOrganizationService);
        this.restBusinessOrganizationMockMvc = MockMvcBuilders.standaloneSetup(businessOrganizationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BusinessOrganization createEntity(EntityManager em) {
        BusinessOrganization businessOrganization = new BusinessOrganization()
            .name(DEFAULT_NAME)
            .active(DEFAULT_ACTIVE);
        return businessOrganization;
    }

    @Before
    public void initTest() {
        businessOrganization = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusinessOrganization() throws Exception {
        int databaseSizeBeforeCreate = businessOrganizationRepository.findAll().size();

        // Create the BusinessOrganization
        BusinessOrganizationDTO businessOrganizationDTO = businessOrganizationMapper.toDto(businessOrganization);
        restBusinessOrganizationMockMvc.perform(post("/api/business-organizations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessOrganizationDTO)))
            .andExpect(status().isCreated());

        // Validate the BusinessOrganization in the database
        List<BusinessOrganization> businessOrganizationList = businessOrganizationRepository.findAll();
        assertThat(businessOrganizationList).hasSize(databaseSizeBeforeCreate + 1);
        BusinessOrganization testBusinessOrganization = businessOrganizationList.get(businessOrganizationList.size() - 1);
        assertThat(testBusinessOrganization.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBusinessOrganization.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createBusinessOrganizationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessOrganizationRepository.findAll().size();

        // Create the BusinessOrganization with an existing ID
        businessOrganization.setId(1L);
        BusinessOrganizationDTO businessOrganizationDTO = businessOrganizationMapper.toDto(businessOrganization);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessOrganizationMockMvc.perform(post("/api/business-organizations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessOrganizationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessOrganization in the database
        List<BusinessOrganization> businessOrganizationList = businessOrganizationRepository.findAll();
        assertThat(businessOrganizationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessOrganizationRepository.findAll().size();
        // set the field null
        businessOrganization.setName(null);

        // Create the BusinessOrganization, which fails.
        BusinessOrganizationDTO businessOrganizationDTO = businessOrganizationMapper.toDto(businessOrganization);

        restBusinessOrganizationMockMvc.perform(post("/api/business-organizations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessOrganizationDTO)))
            .andExpect(status().isBadRequest());

        List<BusinessOrganization> businessOrganizationList = businessOrganizationRepository.findAll();
        assertThat(businessOrganizationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBusinessOrganizations() throws Exception {
        // Initialize the database
        businessOrganizationRepository.saveAndFlush(businessOrganization);

        // Get all the businessOrganizationList
        restBusinessOrganizationMockMvc.perform(get("/api/business-organizations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(businessOrganization.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    

    @Test
    @Transactional
    public void getBusinessOrganization() throws Exception {
        // Initialize the database
        businessOrganizationRepository.saveAndFlush(businessOrganization);

        // Get the businessOrganization
        restBusinessOrganizationMockMvc.perform(get("/api/business-organizations/{id}", businessOrganization.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(businessOrganization.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingBusinessOrganization() throws Exception {
        // Get the businessOrganization
        restBusinessOrganizationMockMvc.perform(get("/api/business-organizations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusinessOrganization() throws Exception {
        // Initialize the database
        businessOrganizationRepository.saveAndFlush(businessOrganization);

        int databaseSizeBeforeUpdate = businessOrganizationRepository.findAll().size();

        // Update the businessOrganization
        BusinessOrganization updatedBusinessOrganization = businessOrganizationRepository.findById(businessOrganization.getId()).get();
        // Disconnect from session so that the updates on updatedBusinessOrganization are not directly saved in db
        em.detach(updatedBusinessOrganization);
        updatedBusinessOrganization
            .name(UPDATED_NAME)
            .active(UPDATED_ACTIVE);
        BusinessOrganizationDTO businessOrganizationDTO = businessOrganizationMapper.toDto(updatedBusinessOrganization);

        restBusinessOrganizationMockMvc.perform(put("/api/business-organizations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessOrganizationDTO)))
            .andExpect(status().isOk());

        // Validate the BusinessOrganization in the database
        List<BusinessOrganization> businessOrganizationList = businessOrganizationRepository.findAll();
        assertThat(businessOrganizationList).hasSize(databaseSizeBeforeUpdate);
        BusinessOrganization testBusinessOrganization = businessOrganizationList.get(businessOrganizationList.size() - 1);
        assertThat(testBusinessOrganization.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBusinessOrganization.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingBusinessOrganization() throws Exception {
        int databaseSizeBeforeUpdate = businessOrganizationRepository.findAll().size();

        // Create the BusinessOrganization
        BusinessOrganizationDTO businessOrganizationDTO = businessOrganizationMapper.toDto(businessOrganization);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restBusinessOrganizationMockMvc.perform(put("/api/business-organizations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessOrganizationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessOrganization in the database
        List<BusinessOrganization> businessOrganizationList = businessOrganizationRepository.findAll();
        assertThat(businessOrganizationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBusinessOrganization() throws Exception {
        // Initialize the database
        businessOrganizationRepository.saveAndFlush(businessOrganization);

        int databaseSizeBeforeDelete = businessOrganizationRepository.findAll().size();

        // Get the businessOrganization
        restBusinessOrganizationMockMvc.perform(delete("/api/business-organizations/{id}", businessOrganization.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BusinessOrganization> businessOrganizationList = businessOrganizationRepository.findAll();
        assertThat(businessOrganizationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessOrganization.class);
        BusinessOrganization businessOrganization1 = new BusinessOrganization();
        businessOrganization1.setId(1L);
        BusinessOrganization businessOrganization2 = new BusinessOrganization();
        businessOrganization2.setId(businessOrganization1.getId());
        assertThat(businessOrganization1).isEqualTo(businessOrganization2);
        businessOrganization2.setId(2L);
        assertThat(businessOrganization1).isNotEqualTo(businessOrganization2);
        businessOrganization1.setId(null);
        assertThat(businessOrganization1).isNotEqualTo(businessOrganization2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessOrganizationDTO.class);
        BusinessOrganizationDTO businessOrganizationDTO1 = new BusinessOrganizationDTO();
        businessOrganizationDTO1.setId(1L);
        BusinessOrganizationDTO businessOrganizationDTO2 = new BusinessOrganizationDTO();
        assertThat(businessOrganizationDTO1).isNotEqualTo(businessOrganizationDTO2);
        businessOrganizationDTO2.setId(businessOrganizationDTO1.getId());
        assertThat(businessOrganizationDTO1).isEqualTo(businessOrganizationDTO2);
        businessOrganizationDTO2.setId(2L);
        assertThat(businessOrganizationDTO1).isNotEqualTo(businessOrganizationDTO2);
        businessOrganizationDTO1.setId(null);
        assertThat(businessOrganizationDTO1).isNotEqualTo(businessOrganizationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(businessOrganizationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(businessOrganizationMapper.fromId(null)).isNull();
    }
}
