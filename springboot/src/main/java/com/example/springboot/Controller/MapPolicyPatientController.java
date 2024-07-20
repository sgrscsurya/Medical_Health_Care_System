package com.example.springboot.Controller;

import com.example.springboot.Entity.*;
import com.example.springboot.Repo.HospitalRepo;
import com.example.springboot.Repo.MapPolicyPatientRepo;
import com.example.springboot.Repo.PatientBasicRepo;
import com.example.springboot.Repo.PolicyMemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class MapPolicyPatientController {
    @Autowired
    private MapPolicyPatientRepo mapPolicyPatientRepo;

    @Autowired
    private PolicyMemberRepo policyMemberRepo;

    @Autowired
    private PatientBasicRepo patientBasicRepo;

    @Autowired
    private HospitalRepo hospitalRepo;

    @PostMapping("MapPolicyPatient/{mid}/{pid}/{hid}")
    public ResponseEntity<?> MapPolicyPatient( @PathVariable Integer mid,@PathVariable Integer pid,@PathVariable Integer hid)
    {
        Optional<PolicyMember> P=policyMemberRepo.findById(mid);
        Optional<PatientBasic> Pb=patientBasicRepo.findById(pid);
        Optional<Hospital>H=hospitalRepo.findById(hid);
        if(P.isPresent() && Pb.isPresent() && H.isPresent() ) {
            PolicyMember policyMember = P.get();
            MapPolicyPatient mapPolicyPatient=new MapPolicyPatient();
            mapPolicyPatient.setPolicyMember(policyMember);
            PatientBasic patientBasic=Pb.get();
            mapPolicyPatient.setPatientBasic(patientBasic);
            Hospital hospital=H.get();
            mapPolicyPatient.setHospital(hospital);
            mapPolicyPatientRepo.save(mapPolicyPatient);
            return new ResponseEntity<>("Patient policy details added Successfully",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Data not Found", HttpStatus.OK);


        }
}
