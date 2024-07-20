import React from 'react'
import { BrowserRouter, Routes,Route } from'react-router-dom'
import Home from './Component/Home'
import { ToastContainer } from 'react-toastify'
import Admin from './Component/Admin'
import AdminHospital from './Component/AdminHospital'
import AdminInsurance from './Component/AdminInsurance'
import AdminDepartment from './Component/AdminDepartment'
import Hospital from './Component/Hospital'
import Insurance from './Component/Insurance'
import Doctor from './Component/Doctor'
import PatientMedical from './Component/PatientMedical'
import PatientBasic from './Component/PatientBasic'
import Policy from './Component/Policy'
import AddPolicyHolder from './Component/AddPolicyHolder'
import PolicyMember from './Component/PolicyMember'
import DoctorDashboard from './Component/DoctorDashboard'
import ViewPatient from './Component/ViewPatient'
import AddTreatment from './Component/AddTreatment'
import MapPolicyPatient from './Component/MapPolicyPatient'
import TestMaster from './Component/TestMaster'
import PatientTest from './Component/PatientTest'
import MedicalTest from './Component/MedicalTest'
import ViewPolicyHolders from './Component/ViewPolicyHolders'


export default function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route path="" element={<Home/>} />
          
          <Route path="admin" element={<Admin/>} >
            <Route path="adminhospital" element={<AdminHospital/>} />
            <Route path="admininsurance" element={<AdminInsurance/>} />
            <Route path="admindepartment" element={<AdminDepartment/>} />
            <Route path="addtest" element={<TestMaster/>} />
          </Route>
          <Route path="hospital" element={<Hospital/>} >
          <Route path="adddoctor" element={<Doctor/>} />
          <Route path="addpatientbasic" element={<PatientBasic/>}/>
          <Route path="medicaltest" element={<MedicalTest/>} />
          <Route path="mappatientpolicy" element={<MapPolicyPatient/>}/>
          <Route path="addpatientmedical" element={<PatientMedical/>}/>
          </Route>
         
          
          <Route path="insurance" element={<Insurance/>} >
            <Route path="addpolicy" element={<Policy/>}/>
            <Route path="addpolicyholder" element={<AddPolicyHolder/>}/>
            <Route path="addpolicymember" element={<PolicyMember/>}/>
            <Route path="viewpolicy" element={<ViewPolicyHolders/>} />
          </Route>
          

          <Route path="doctor" element={<DoctorDashboard/>} >
            <Route path="viewpatient" element={<ViewPatient/>} />
            <Route path="addtreatment" element={<AddTreatment/>} />
            <Route path="patienttest" element={<PatientTest/>} />

          </Route>

          
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

