package com.example.springboot.Repo;

import com.example.springboot.Entity.PolicyMember;
import com.example.springboot.Entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PolicyMemberRepo extends JpaRepository<PolicyMember,Integer> {

    @Query("select p from PolicyMember p where p.policyholder.policyholderid=?1")
    List<PolicyMember> findByPolicyholderid(Integer pid);

}
