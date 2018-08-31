package org.vincedgy.prefwebapp.web.rest;

import org.vincedgy.prefwebapp.PrefWebApp;

import org.vincedgy.prefwebapp.domain.BusinessService;
import org.vincedgy.prefwebapp.repository.BusinessServiceRepository;
import org.vincedgy.prefwebapp.service.BusinessServiceService;
import org.vincedgy.prefwebapp.service.dto.BusinessServiceDTO;
import org.vincedgy.prefwebapp.service.mapper.BusinessServiceMapper;
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
 * Test class for the BusinessServiceResource REST controller.
 *
 * @see BusinessServiceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrefWebApp.class)
public class BusinessServiceResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private BusinessServiceRepository businessServiceRepository;


    @Autowired
    private BusinessServiceMapper businessServiceMapper;
    

    @Autowired
    private BusinessServiceService businessServiceService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBusinessServiceMockMvc;

    private BusinessService businessService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BusinessServiceResource businessServiceResource = new BusinessServiceResource(businessServiceService);
        this.restBusinessServiceMockMvc = MockMvcBuilders.standaloneSetup(businessServiceResource)
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
    public static BusinessService createEntity(EntityManager em) {
        BusinessService businessService = new BusinessService()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .active(DEFAULT_ACTIVE);
        return businessService;
    }

    @Before
    public void initTest() {
        businessService = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusinessService() throws Exception {
        int databaseSizeBeforeCreate = businessServiceRepository.findAll().size();

        // Create the BusinessService
        BusinessServiceDTO businessServiceDTO = businessServiceMapper.toDto(businessService);
        restBusinessServiceMockMvc.perform(post("/api/business-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessServiceDTO)))
            .andExpect(status().isCreated());

        // Validate the BusinessService in the database
        List<BusinessService> businessServiceList = businessServiceRepository.findAll();
        assertThat(businessServiceList).hasSize(databaseSizeBeforeCreate + 1);
        BusinessService testBusinessService = businessServiceList.get(businessServiceList.size() - 1);
        assertThat(testBusinessService.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBusinessService.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testBusinessService.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createBusinessServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessServiceRepository.findAll().size();

        // Create the BusinessService with an existing ID
        businessService.setId(1L);
        BusinessServiceDTO businessServiceDTO = businessServiceMapper.toDto(businessService);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessServiceMockMvc.perform(post("/api/business-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessServiceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessService in the database
        List<BusinessService> businessServiceList = businessServiceRepository.findAll();
        assertThat(businessServiceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessServiceRepository.findAll().size();
        // set the field null
        businessService.setName(null);

        // Create the BusinessService, which fails.
        BusinessServiceDTO businessServiceDTO = businessServiceMapper.toDto(businessService);

        restBusinessServiceMockMvc.perform(post("/api/business-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessServiceDTO)))
            .andExpect(status().isBadRequest());

        List<BusinessService> businessServiceList = businessServiceRepository.findAll();
        assertThat(businessServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBusinessServices() throws Exception {
        // Initialize the database
        businessServiceRepository.saveAndFlush(businessService);

        // Get all the businessServiceList
        restBusinessServiceMockMvc.perform(get("/api/business-services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(businessService.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    

    @Test
    @Transactional
    public void getBusinessService() throws Exception {
        // Initialize the database
        businessServiceRepository.saveAndFlush(businessService);

        // Get the businessService
        restBusinessServiceMockMvc.perform(get("/api/business-services/{id}", businessService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(businessService.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingBusinessService() throws Exception {
        // Get the businessService
        restBusinessServiceMockMvc.perform(get("/api/business-services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusinessService() throws Exception {
        // Initialize the database
        businessServiceRepository.saveAndFlush(businessService);

        int databaseSizeBeforeUpdate = businessServiceRepository.findAll().size();

        // Update the businessService
        BusinessService updatedBusinessService = businessServiceRepository.findById(businessService.getId()).get();
        // Disconnect from session so that the updates on updatedBusinessService are not directly saved in db
        em.detach(updatedBusinessService);
        updatedBusinessService
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .active(UPDATED_ACTIVE);
        BusinessServiceDTO businessServiceDTO = businessServiceMapper.toDto(updatedBusinessService);

        restBusinessServiceMockMvc.perform(put("/api/business-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessServiceDTO)))
            .andExpect(status().isOk());

        // Validate the BusinessService in the database
        List<BusinessService> businessServiceList = businessServiceRepository.findAll();
        assertThat(businessServiceList).hasSize(databaseSizeBeforeUpdate);
        BusinessService testBusinessService = businessServiceList.get(businessServiceList.size() - 1);
        assertThat(testBusinessService.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBusinessService.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testBusinessService.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingBusinessService() throws Exception {
        int databaseSizeBeforeUpdate = businessServiceRepository.findAll().size();

        // Create the BusinessService
        BusinessServiceDTO businessServiceDTO = businessServiceMapper.toDto(businessService);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restBusinessServiceMockMvc.perform(put("/api/business-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessServiceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessService in the database
        List<BusinessService> businessServiceList = businessServiceRepository.findAll();
        assertThat(businessServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBusinessService() throws Exception {
        // Initialize the database
        businessServiceRepository.saveAndFlush(businessService);

        int databaseSizeBeforeDelete = businessServiceRepository.findAll().size();

        // Get the businessService
        restBusinessServiceMockMvc.perform(delete("/api/business-services/{id}", businessService.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BusinessService> businessServiceList = businessServiceRepository.findAll();
        assertThat(businessServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessService.class);
        BusinessService businessService1 = new BusinessService();
        businessService1.setId(1L);
        BusinessService businessService2 = new BusinessService();
        businessService2.setId(businessService1.getId());
        assertThat(businessService1).isEqualTo(businessService2);
        businessService2.setId(2L);
        assertThat(businessService1).isNotEqualTo(businessService2);
        businessService1.setId(null);
        assertThat(businessService1).isNotEqualTo(businessService2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessServiceDTO.class);
        BusinessServiceDTO businessServiceDTO1 = new BusinessServiceDTO();
        businessServiceDTO1.setId(1L);
        BusinessServiceDTO businessServiceDTO2 = new BusinessServiceDTO();
        assertThat(businessServiceDTO1).isNotEqualTo(businessServiceDTO2);
        businessServiceDTO2.setId(businessServiceDTO1.getId());
        assertThat(businessServiceDTO1).isEqualTo(businessServiceDTO2);
        businessServiceDTO2.setId(2L);
        assertThat(businessServiceDTO1).isNotEqualTo(businessServiceDTO2);
        businessServiceDTO1.setId(null);
        assertThat(businessServiceDTO1).isNotEqualTo(businessServiceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(businessServiceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(businessServiceMapper.fromId(null)).isNull();
    }
}
