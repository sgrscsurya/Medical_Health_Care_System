package com.example.springboot.Controller;

import com.example.springboot.Entity.*;
import com.example.springboot.Repo.MedicalTestRepo;
import com.example.springboot.Repo.PatientBasicRepo;
import com.example.springboot.Repo.PatientTestRepo;
import com.example.springboot.Repo.TestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class MedicalTestController {

    @Autowired
    private MedicalTestRepo medicalTestRepo;

    @Autowired
    private TestRepo testRepo;

    @Autowired
    private PatientBasicRepo patientBasicRepo;

    @Autowired
    private PatientTestRepo patientTestRepo;


    @PostMapping("/AddMedicalTest/{pid}/{testid}")
    public ResponseEntity<?> AddMedicalTest(@PathVariable Integer pid, @PathVariable Integer testid, @RequestBody MedicalTest obj)
    {
        Optional<PatientBasic> Pb=patientBasicRepo.findById(pid);
        Optional<TestMaster>T=testRepo.findById(testid);
        if(  Pb.isPresent() && T.isPresent() ) {

            Random rnd=new Random();
            int id= rnd.nextInt(1000,9999);
            obj.setMtid(id);
            PatientBasic patientBasic=Pb.get();
            obj.setPatientBasic(patientBasic);
            TestMaster testMaster=T.get();
            obj.setTestMaster(testMaster);
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
            String date=dateFormat.format(d);
            obj.setDate(date);
            medicalTestRepo.save(obj);
            return new ResponseEntity<>("Medical test details added Successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Data not Found", HttpStatus.OK);


    }

    @GetMapping("/GetDetails")
    public ResponseEntity<?>GetDetails()
    {
        List<PatientTest> list=patientTestRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);

    }

    @GetMapping("/getTestReport/{ID}")
    public ResponseEntity<?> getTestReport(@PathVariable Integer ID)
    {
        Optional<PatientBasic> Pb=patientBasicRepo.findById(ID);
        if(Pb.isPresent())
        {
           var Mt=medicalTestRepo.findBypatientid(ID);
            return new ResponseEntity<>(Mt,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Patient ID not found",HttpStatus.OK);
    }
}
