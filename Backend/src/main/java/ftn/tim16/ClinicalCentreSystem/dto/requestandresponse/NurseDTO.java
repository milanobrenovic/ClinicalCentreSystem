package ftn.tim16.ClinicalCentreSystem.dto.requestandresponse;

import ftn.tim16.ClinicalCentreSystem.model.Nurse;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class NurseDTO {
    private Long id;

    @NotEmpty(message = "Email is empty.")
    @Email(message = "Email is invalid.")
    private String email;

    @NotEmpty(message = "First name is empty.")
    @Size(message = "Max size for first name is 30.", max = 30)
    private String firstName;

    @NotEmpty(message = "Last name is empty.")
    @Size(message = "Max size for last name is 30.", max = 30)
    private String lastName;

    @NotEmpty(message = "Start work hours is empty.")
    private String workHoursFrom;

    @NotEmpty(message = "End work hours is empty.")
    private String workHoursTo;

    @NotEmpty(message = "Phone number is empty.")
    @Size(min = 9, max = 10)
    @Pattern(regexp = "0[0-9]+")
    private String phoneNumber;

    public NurseDTO() {
    }

    public NurseDTO(Long id, String email, String firstName, String lastName, String workHoursFrom, String workHoursTo, String phoneNumber) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.workHoursFrom = workHoursFrom;
        this.workHoursTo = workHoursTo;
        this.phoneNumber = phoneNumber;
    }

    public NurseDTO(Nurse nurse) {
        this(nurse.getId(), nurse.getEmail(), nurse.getFirstName(), nurse.getLastName(),
                nurse.getWorkHoursFrom().toString(), nurse.getWorkHoursTo().toString(), nurse.getPhoneNumber());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getWorkHoursFrom() {
        return workHoursFrom;
    }

    public void setWorkHoursFrom(String workHoursFrom) {
        this.workHoursFrom = workHoursFrom;
    }

    public String getWorkHoursTo() {
        return workHoursTo;
    }

    public void setWorkHoursTo(String workHoursTo) {
        this.workHoursTo = workHoursTo;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
