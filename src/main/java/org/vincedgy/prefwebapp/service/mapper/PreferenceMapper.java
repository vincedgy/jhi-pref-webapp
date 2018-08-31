package org.vincedgy.prefwebapp.service.mapper;

import org.vincedgy.prefwebapp.domain.*;
import org.vincedgy.prefwebapp.service.dto.PreferenceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Preference and its DTO PreferenceDTO.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, BusinessServiceMapper.class})
public interface PreferenceMapper extends EntityMapper<PreferenceDTO, Preference> {

    @Mapping(source = "employee.id", target = "employeeId")
    @Mapping(source = "businessService.id", target = "businessServiceId")
    PreferenceDTO toDto(Preference preference);

    @Mapping(source = "employeeId", target = "employee")
    @Mapping(source = "businessServiceId", target = "businessService")
    Preference toEntity(PreferenceDTO preferenceDTO);

    default Preference fromId(Long id) {
        if (id == null) {
            return null;
        }
        Preference preference = new Preference();
        preference.setId(id);
        return preference;
    }
}
