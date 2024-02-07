import React, { useEffect, useState } from 'react'
import { deleteDepartment, departmentList } from '../services/DepartmentService'
import { Link, useNavigate } from 'react-router-dom'

const ListDepartmentComponent = () => {

    const[departments,setDepartments] = useState([])

    const navigator = useNavigate()

    useEffect(()=>getDepartments(),[])

    function getDepartments() {
        departmentList().then((response)=>{
            setDepartments(response.data)
        }).catch(error=>{
            console.error(error)
        })
    }

    function updateDepartment(id) {
        navigator(`/edit-department/${id}`)
    }

    function removeDepartment(id) {
        deleteDepartment(id).then((response)=>{
            console.log(response.data)
            getDepartments()
        }).catch(error=>{
            console.error(error)
        })
    }

  return (
    <div className='container py-5'>
        <h2 className='text-center'>List of Departments</h2>
        <Link to='/add-department' className='btn btn-primary mb-2'>Add Department</Link>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Department ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr> 
            </thead>
            <tbody>
                {departments.map(department=>
                    <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                        <td>
                            <button className='btn btn-info' onClick={()=>updateDepartment(department.id)}>Update</button>
                            <button className='btn btn-danger' onClick={()=>removeDepartment(department.id)} style={{marginLeft:'10px'}}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default ListDepartmentComponent