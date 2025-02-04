package com.example.springboot.Controller;

import com.example.springboot.Entity.*;
import com.example.springboot.Repo.PolicyHolderRepo;
import com.example.springboot.Repo.PolicyMemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class PolicyMemberController {

    @Autowired
    private PolicyMemberRepo policyMemberRepo;

    @Autowired
    private PolicyHolderRepo policyHolderRepo;

    @PostMapping("/AddMember/{PHId}")
    public ResponseEntity<?> AddMedical(@RequestBody PolicyMember obj, @PathVariable String PHId)
    {
        Random rnd=new Random();
        int id= rnd.nextInt(10000,99999);
        obj.setPolicymemberid(id);
        Optional<PolicyHolder> P=policyHolderRepo.findById(Integer.parseInt(PHId));
        if(P.isPresent()) {
            PolicyHolder policyHolder = P.get();
            obj.setPolicyholder(policyHolder);
            obj.setStatus("active");
            policyMemberRepo.save(obj);
            return new ResponseEntity<>("Policy member details added successfully", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("Policy Holder ID not Found",HttpStatus.OK);
        }
    }

    @GetMapping("/GetMember")
    public ResponseEntity<?>GetMember()
    {
        List<PolicyMember> list=policyMemberRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);

    }

    @GetMapping("/getPolicyMembers/{ID}")
    public ResponseEntity<?> getPolicyMembers(@PathVariable Integer ID)
    {
        Optional<PolicyHolder> Pb=policyHolderRepo.findById(ID);
        if(Pb.isPresent())
        {
            var policymember=policyMemberRepo.findByPolicyholderid(ID);
            return new ResponseEntity<>(policymember,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Policy Holder ID not found",HttpStatus.OK);
    }
}
