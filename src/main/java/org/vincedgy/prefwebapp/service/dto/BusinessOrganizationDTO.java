package org.vincedgy.prefwebapp.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the BusinessOrganization entity.
 */
public class BusinessOrganizationDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private Boolean active;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BusinessOrganizationDTO businessOrganizationDTO = (BusinessOrganizationDTO) o;
        if (businessOrganizationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), businessOrganizationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BusinessOrganizationDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
