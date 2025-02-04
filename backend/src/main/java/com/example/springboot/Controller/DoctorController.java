package com.example.springboot.Controller;


import com.example.springboot.DTO.Emaildata;
import com.example.springboot.Entity.Department;
import com.example.springboot.Entity.Doctor;
import com.example.springboot.Entity.Hospital;
import com.example.springboot.Repo.DepartmentRepo;
import com.example.springboot.Repo.DoctorRepo;
import com.example.springboot.Repo.HospitalRepo;
import com.example.springboot.Smtpservice.Smtpservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin

public class DoctorController {

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private HospitalRepo hospitalRepo;

    @Autowired
    private DepartmentRepo departmentRepo;
    @Autowired
    private Smtpservice smtpservice;


    @PostMapping("/AddDoctor/{name}/{phno}/{doc}/{deptno}")
    public ResponseEntity<?>AddDoctor(@RequestBody Doctor obj, @PathVariable String name,@PathVariable String phno,@PathVariable String doc,@PathVariable Integer deptno)
    {
        Optional<Doctor> L=doctorRepo.findByEmail(obj.getEmail());
        if(L.isPresent()) {
            return new ResponseEntity<>("Email ID Already exist", HttpStatus.OK);
        }
        else{
            Random rnd=new Random();
            int id= rnd.nextInt(100000,999999);
            int password= rnd.nextInt(1000,9999);
            obj.setDcid(id);
            obj.setPassword(String.valueOf(password));
            obj.setDcname(name);
            obj.setPno(phno);
            Optional<Hospital>H=hospitalRepo.findById(Integer.valueOf(doc));
            if(H.isPresent()) {
                Hospital hospital = H.get();
                obj.setHospital(hospital);
            }
            else
            {
                return new ResponseEntity<>("Hospital Id not Found",HttpStatus.OK);
            }
            Optional<Department>D=departmentRepo.findById(deptno);
            if(D.isPresent()){
                Department department=D.get();
                obj.setDepartment(department);
            }
            else
            {
                return new ResponseEntity<>("Department not Found",HttpStatus.OK);
            }

            doctorRepo.save(obj);

            Emaildata emaildata=new Emaildata();
            emaildata.setRecipient(obj.getEmail());
            emaildata.setSubject("Login credentails");
            String Message="Login Credentails Doctor ID:"+ id + "& Password" + password;
            emaildata.setMessage(Message);
            smtpservice.sendMail(emaildata);

            return new ResponseEntity<>("Doctor added Successfully",HttpStatus.OK);
        }
    }
    @GetMapping("/GetDoctor")
    public ResponseEntity<?>GetDoctor()
    {
        List<Doctor>list=doctorRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);

    }

    @GetMapping("/chkDoctorLogin/{inchargerid}/{inpassword}")
    public ResponseEntity<?> chkDoctorLoginData(@PathVariable Integer inchargerid,@PathVariable String inpassword)
    {
        Optional<Doctor>L=doctorRepo.findById(inchargerid);
        if(L.isPresent())
        {
            Doctor doctor=L.get();
            if(doctor.getPassword().equals(inpassword))
                return new ResponseEntity<>("Correct Password",HttpStatus.OK);
            else
                return new ResponseEntity<>("Invalid Password",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Doctor ID not found",HttpStatus.OK);
    }

}



