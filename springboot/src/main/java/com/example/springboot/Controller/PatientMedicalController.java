package com.example.springboot.Controller;

import com.example.springboot.Entity.Hospital;
import com.example.springboot.Entity.PatientBasic;
import com.example.springboot.Entity.PatientMedical;
import com.example.springboot.Repo.PatientBasicRepo;
import com.example.springboot.Repo.PatientMedicalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class PatientMedicalController {
    @Autowired
    private PatientMedicalRepo patientMedicalRepo;

    @Autowired
    private PatientBasicRepo patientBasicRepo;

    @PostMapping("/AddMedical/{PID}")
    public ResponseEntity<?>AddMedical(@RequestBody PatientMedical obj, @PathVariable String PID)
    {
        Optional<PatientBasic> P=patientBasicRepo.findById(Integer.parseInt(PID));
        if(P.isPresent()) {
            PatientBasic patientBasic = P.get();
            obj.setPatientBasic(patientBasic);
            patientMedicalRepo.save(obj);
            return new ResponseEntity<>("Patient medical details added successfully", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("Patient ID not Found",HttpStatus.OK);
        }
    }

    @GetMapping("/getPatientmedical/{ID}")
    public ResponseEntity<?> getPatientmedicalVal(@PathVariable Integer ID)
    {
        Optional<PatientBasic> Pb=patientBasicRepo.findById(ID);
        if(Pb.isPresent())
        {
            PatientMedical patientMedical=patientMedicalRepo.findByPatientid(ID);
            return new ResponseEntity<>(patientMedical,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Patient ID not found",HttpStatus.OK);
    }


}
