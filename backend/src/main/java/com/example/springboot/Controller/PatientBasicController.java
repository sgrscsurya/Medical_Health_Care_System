package com.example.springboot.Controller;


import com.example.springboot.Entity.PatientBasic;
import com.example.springboot.Entity.Policy;
import com.example.springboot.Repo.PatientBasicRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class PatientBasicController {

    @Autowired
    private PatientBasicRepo patientBasicRepo;

    @PostMapping("/AddBasic")
    public ResponseEntity<?>AddBasic(@RequestBody PatientBasic obj)
    {
        Random rnd=new Random();
        int id= rnd.nextInt(1000000,9999999);
        obj.setPatientid(id);
        patientBasicRepo.save(obj);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping("/GetPatientBasic/{ID}")
    public ResponseEntity<?>GetPatientBasic(@PathVariable String ID) {
        Optional<PatientBasic> P = patientBasicRepo.findById(Integer.valueOf(ID));
        if (P.isPresent()) {
            PatientBasic patientBasic = P.get();
            return new ResponseEntity<>(P, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Patient id not found", HttpStatus.OK);
        }
    }
}

