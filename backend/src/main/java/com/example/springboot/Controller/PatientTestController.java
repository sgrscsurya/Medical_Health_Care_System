package com.example.springboot.Controller;

import com.example.springboot.Entity.*;
import com.example.springboot.Repo.PatientBasicRepo;
import com.example.springboot.Repo.PatientTestRepo;
import com.example.springboot.Repo.TestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class PatientTestController {

    @Autowired
    private PatientTestRepo patientTestRepo;

    @Autowired
    private TestRepo testRepo;

    @Autowired
    private PatientBasicRepo patientBasicRepo;

    @PostMapping("AddPatientTest/{pid}/{testid}")
    public ResponseEntity<?> AddPatientTest( @PathVariable Integer pid, @PathVariable Integer testid)
    {

        Optional<PatientBasic> Pb=patientBasicRepo.findById(pid);
        Optional<TestMaster>T=testRepo.findById(testid);
        if(  Pb.isPresent() && T.isPresent() ) {
            PatientTest patientTest=new PatientTest();
            PatientBasic patientBasic=Pb.get();
            patientTest.setPatientBasic(patientBasic);
            TestMaster testMaster=T.get();
            patientTest.setTestMaster(testMaster);
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
            String date=dateFormat.format(d);
            patientTest.setDate(date);
            patientTest.setStatus("pending");
            patientTestRepo.save(patientTest);
            return new ResponseEntity<>("Patient test details added Successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Data not Found", HttpStatus.OK);
    }

    @PutMapping("/UpdateStatus/{pid}/{testid}")
    public ResponseEntity<?>UpdateStatus(@PathVariable Integer pid, @PathVariable Integer testid)
    {
        Optional<PatientBasic> Pb=patientBasicRepo.findById(pid);
        Optional<TestMaster>T=testRepo.findById(testid);
        if(  Pb.isPresent() && T.isPresent() )
        {
            String status="pending";
            Optional<PatientTest>Pt=patientTestRepo.findByStatus(pid,testid,status);
            if(Pt.isPresent())
            {
                PatientTest patientTest=Pt.get();
                patientTest.setStatus("completed");
                patientTestRepo.save(patientTest);
                return new ResponseEntity<>("Patient test status updated Successfully", HttpStatus.OK);

            }
            else
            {
                return new ResponseEntity<>("Patient test details not found", HttpStatus.OK);
            }

        }
        else
        {
            return new ResponseEntity<>("Patient Id/Test Id missmatch", HttpStatus.OK);
        }

    }

}
