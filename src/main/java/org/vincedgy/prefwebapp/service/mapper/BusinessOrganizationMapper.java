package org.vincedgy.prefwebapp.service.mapper;

import org.vincedgy.prefwebapp.domain.*;
import org.vincedgy.prefwebapp.service.dto.BusinessOrganizationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BusinessOrganization and its DTO BusinessOrganizationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BusinessOrganizationMapper extends EntityMapper<BusinessOrganizationDTO, BusinessOrganization> {


    @Mapping(target = "employees", ignore = true)
    BusinessOrganization toEntity(BusinessOrganizationDTO businessOrganizationDTO);

    default BusinessOrganization fromId(Long id) {
        if (id == null) {
            return null;
        }
        BusinessOrganization businessOrganization = new BusinessOrganization();
        businessOrganization.setId(id);
        return businessOrganization;
    }
}
