package com.example.springboot.Controller;


import com.example.springboot.Entity.Doctor;
import com.example.springboot.Entity.Hospital;
import com.example.springboot.Entity.Policy;
import com.example.springboot.Entity.PolicyHolder;
import com.example.springboot.Repo.PolicyHolderRepo;
import com.example.springboot.Repo.PolicyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class PolicyHolderController {

    @Autowired
    private PolicyHolderRepo policyHolderRepo;

    @Autowired
    private PolicyRepo policyRepo;

    @PostMapping("AddHolder/{polno}")
    public ResponseEntity<?>AddHolder(@RequestBody PolicyHolder obj, @PathVariable Integer polno)
    {
        Random rnd=new Random();
        int id= rnd.nextInt(100000,999999);
        obj.setPolicyholderid(id);
        obj.setStatus("active");
        Optional<Policy> P=policyRepo.findById(Integer.valueOf(polno));
        if(P.isPresent()) {
            Policy policy = P.get();
            obj.setPolicy(policy);
        }
        else
        {
            return new ResponseEntity<>("Policy Id not Found", HttpStatus.OK);
        }
        policyHolderRepo.save(obj);
        return new ResponseEntity<>(id,HttpStatus.OK);
    }

    @GetMapping("/GetHolder")
    public ResponseEntity<?>GetHolder()
    {
        List<PolicyHolder> list=policyHolderRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);

    }
}
