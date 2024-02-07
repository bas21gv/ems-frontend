import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { departmentList } from '../services/DepartmentService'

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [departments, setDepartments] = useState([])

  const navigator = useNavigate()
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  })

  const {id} = useParams()

  useEffect(()=>{
    departmentList().then((response)=>{
      console.log(response.data)
      setDepartments(response.data)
    }).catch(error=>{
      console.log(error)
    })
  },[])

  useEffect(()=>{
    if(id) {
      getEmployee(id).then((response)=>{
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setDepartmentId(response.data.departmentId)
      }).catch(error =>{
        console.log(error)
      })
    }
  },[id])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if(formValidation()) {
      const employee = {firstName, lastName, email, departmentId}
      console.log(employee)

      if(id) {
        updateEmployee(id, employee).then((response) =>{
          console.log(response.data)
          navigator('/employees')
        }).catch(error => {
          console.error(error)
        })
      } else {
        createEmployee(employee).then((response) =>{
          console.log(response.data)
          navigator('/employees')
        }).catch(error => {
          console.error(error)
        })
      }
    }
  }

  function formValidation() {
    let valid = true;

    const errorsCopy = {... errors}

    if(firstName.trim()) {
      errorsCopy.firstName = ''
    } else {
      errorsCopy.firstName = 'Employee firstname is required'
      valid = false
    } 

    if(lastName.trim()) {
      errorsCopy.lastName = ''
    } else {
      errorsCopy.lastName = 'Employee lastname is required'
      valid = false
    }

    if(email.trim()) {
      errorsCopy.email = ''
    } else {
      errorsCopy.email = 'Employee email is required'
      valid = false
    }

    if(departmentId){
      errorsCopy.department = ''
    }else {
      errorsCopy.department = 'Select Department'
      valid = false
    }

    setErrors(errorsCopy)
    return valid
  }

  function pageTitle() {
      if(id) {
        return <h2 className='text-center py-3'>Update Employee</h2>
      } else {
        return <h2 className='text-center py-3'>Add Employee</h2>
      }
  }

  return (
    <div className='container py-3'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            {pageTitle()}
            <div className='card-body'>
              <form>
                <div className='form-body mb-2'>
                  <label className='form-label'>Firstname:</label>
                  <input
                    type='text'
                    placeholder='enter employee firstname'
                    name='firstName'
                    value={firstName}
                    className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                    onChange={(e)=>setFirstName(e.target.value)}
                  />
                  {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                </div>
                <div className='form-body mb-2'>
                  <label className='form-label'>Lastname:</label>
                  <input
                    type='text'
                    placeholder='enter employee lastname'
                    name='lastName'
                    value={lastName}
                    className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                    onChange={(e)=>setLastName(e.target.value)}
                  />
                  {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                </div>
                <div className='form-body mb-2'>
                  <label className='form-label'>Email:</label>
                  <input
                    type='text'
                    placeholder='enter employee email'
                    name='email'
                    value={email}
                    className={`form-control ${errors.email ? 'is-invalid': ''}`}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                </div>
                <div className='form-body mb-2'>
                  <label className='form-label'>Department:</label>
                  <select
                    className={`form-control ${errors.department ? 'is-invalid': ''}`}
                    value={departmentId}
                    onChange={(e)=>setDepartmentId(e.target.value)}
                    >
                      <option value="Select Department">Select Department</option>
                      {
                        departments.map(department=>
                          <option key={department.id} value={department.id}>{department.departmentName}</option>
                        )
                      }
                  </select>
                  {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
                </div>

                <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
              </form>
            </div>
          </div>

        </div>
    </div>
  )
}

export default EmployeeComponent