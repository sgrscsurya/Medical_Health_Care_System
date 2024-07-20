package com.example.springboot.Controller;

import com.example.springboot.Entity.*;
import com.example.springboot.Repo.InsuranceRepo;
import com.example.springboot.Repo.PolicyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin("*")
public class PolicyController {

    @Autowired
    private PolicyRepo policyRepo;

    @Autowired
    private InsuranceRepo insuranceRepo;

    @PostMapping("/AddPolicy/{icid}")
    public ResponseEntity<?> AddPolicy(@RequestBody Policy obj, @PathVariable String icid)
    {
        Optional<Insurance> I=insuranceRepo.findById(Integer.parseInt(icid));
        if(I.isPresent()) {
            Insurance insurance = I.get();
            obj.setInsurance(insurance);
            obj.setStatus("active");
            policyRepo.save(obj);
            return new ResponseEntity<>("Policy details added successfully", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("Policy ID not Found",HttpStatus.OK);
        }
    }

    @GetMapping("/GetPolicy")
    public ResponseEntity<?>GetPolicy()
    {
        List<Policy> list=policyRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);

    }
}
