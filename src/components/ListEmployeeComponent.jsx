import React, { useEffect, useState } from 'react'
import { deleteEmployee, employeeList } from '../services/EmployeeService'
import {useNavigate} from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate()

    useEffect(()=>{
        getEmployees()
    },[])

    function getEmployees() {
        employeeList().then((response) =>{
            setEmployees(response.data)
        }).catch(error =>{
            console.error(error)
        })
    }

    function addEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {
        deleteEmployee(id).then((response) =>{
            console.log(response.data)
            getEmployees()
        }).catch(error => {
            console.log(error)
        })
    }

  
  return (
    <div className='container py-5'>
        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
           <thead>
            <tr>
                <th>Employee ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Actions</th>
            </tr> 
            </thead> 
            <tbody>
                {employees.map(employee =>
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button>
                            <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)} style={{marginLeft:'10px'}}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent