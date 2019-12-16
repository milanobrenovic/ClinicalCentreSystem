package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.ClinicDTO;
import ftn.tim16.ClinicalCentreSystem.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/clinic")
public class ClinicController {

    @Autowired
    private ClinicService clinicService;

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasAnyRole('CLINICAL_CENTRE_ADMIN','PATIENT')")
    public ResponseEntity<ClinicDTO> getClinic(@PathVariable Long id) {
        ClinicDTO clinicDTO = clinicService.findById(id);
        if (clinicDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(clinicDTO, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<ClinicDTO> addClinic(@RequestBody ClinicDTO clinicDTO) {
        ClinicDTO clinic = clinicService.create(clinicDTO);
        if (clinic == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(clinic, HttpStatus.CREATED);
    }

    @GetMapping(value = "/all")
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<List<ClinicDTO>> getAllClinics() {
        List<ClinicDTO> allClinics = clinicService.findAll();
        return new ResponseEntity<>(allClinics, HttpStatus.OK);
    }
}
