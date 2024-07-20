package com.example.springboot.Controller;

import com.example.springboot.Entity.*;
import com.example.springboot.Repo.DoctorRepo;
import com.example.springboot.Repo.PatientBasicRepo;
import com.example.springboot.Repo.TreatmentRepo;
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
public class TreatmenController {
     @Autowired
    private TreatmentRepo treatmentRepo;

     @Autowired
    private DoctorRepo doctorRepo;

     @Autowired
    private PatientBasicRepo patientBasicRepo;
     @PostMapping("/AddTreatment/{pid}/{did}")
    public ResponseEntity<?>AddTreatment(@RequestBody Treatment obj, @PathVariable String pid,@PathVariable String did)
     {
         Random rnd=new Random();
         int id= rnd.nextInt(100,999);
         obj.setTreatmentid(id);
         Date d=new Date();
         SimpleDateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
         String date=dateFormat.format(d);
         obj.setTreatmentdate(date);
         Optional<PatientBasic> P=patientBasicRepo.findById(Integer.parseInt(pid));
         if(P.isPresent()) {
             PatientBasic patientBasic = P.get();
             obj.setPatientBasic(patientBasic);
         }
         Optional<Doctor> D=doctorRepo.findById(Integer.parseInt(did));
         if(D.isPresent()) {
             Doctor doctor = D.get();
             obj.setDoctor(doctor);
         }
         treatmentRepo.save(obj);
         return new ResponseEntity<>("Treatment details added successfully", HttpStatus.OK);
     }

    @GetMapping("/getTreatmentDetails/{ID}")
    public ResponseEntity<?> getPatientTreatment(@PathVariable Integer ID)
    {
        Optional<PatientBasic> Pb=patientBasicRepo.findById(ID);
        if(Pb.isPresent())
        {
            var treatment=treatmentRepo.findByPatientId(ID);
            return new ResponseEntity<>(treatment,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Patient ID not found",HttpStatus.OK);
    }
}
