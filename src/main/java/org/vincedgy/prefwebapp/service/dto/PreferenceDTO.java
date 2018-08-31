package org.vincedgy.prefwebapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Preference entity.
 */
public class PreferenceDTO implements Serializable {

    private Long id;

    private Boolean active;

    @Lob
    private String content;

    private Long employeeId;

    private Long businessServiceId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getBusinessServiceId() {
        return businessServiceId;
    }

    public void setBusinessServiceId(Long businessServiceId) {
        this.businessServiceId = businessServiceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PreferenceDTO preferenceDTO = (PreferenceDTO) o;
        if (preferenceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), preferenceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PreferenceDTO{" +
            "id=" + getId() +
            ", active='" + isActive() + "'" +
            ", content='" + getContent() + "'" +
            ", employee=" + getEmployeeId() +
            ", businessService=" + getBusinessServiceId() +
            "}";
    }
}
