package org.vincedgy.prefwebapp.service.mapper;

import org.vincedgy.prefwebapp.domain.*;
import org.vincedgy.prefwebapp.service.dto.BusinessServiceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BusinessService and its DTO BusinessServiceDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BusinessServiceMapper extends EntityMapper<BusinessServiceDTO, BusinessService> {


    @Mapping(target = "preferences", ignore = true)
    BusinessService toEntity(BusinessServiceDTO businessServiceDTO);

    default BusinessService fromId(Long id) {
        if (id == null) {
            return null;
        }
        BusinessService businessService = new BusinessService();
        businessService.setId(id);
        return businessService;
    }
}
