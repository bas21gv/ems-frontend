import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartment, updateDepartment } from '../services/DepartmentService'
import { useNavigate, useParams } from 'react-router-dom'

const DepartmentComponent = () => {

  const [departmentName, setDepartmentName] = useState('')
  const [departmentDescription, setDepartmentDescription] = useState('')

  const navigator = useNavigate()

  const {id} = useParams()

  useEffect(()=>{
    if(id) {
        getDepartment(id).then((response)=>{
            console.log(response.data)
            setDepartmentName(response.data.departmentName)
            setDepartmentDescription(response.data.departmentDescription)
        }).catch(error=>{
            console.error(error)
        })
    }
  },[id])

  function saveOrUpdateDepartment(e) {
    e.preventDefault()
    const department = {departmentName, departmentDescription}
    console.log(department)

    if(id) {
        updateDepartment(id, department).then((response)=>{
            console.log(response.data)
            navigator('/departments')
        }).catch(error=>{
            console.error(error)
        })
    } else {
        createDepartment(department).then((response)=>{
            console.log(response.data)
            navigator('/departments')
        }).catch(error=>{
            console.error(error)
        })
    }
  }

  function pageTitle() {
    if(id) {
        return <h2 className='text-center py-3'>Update Department</h2>
    } else {
        return <h2 className='text-center py-3'>Add Department</h2>
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
                  <label className='form-label'>Department Name:</label>
                  <input
                    type='text'
                    placeholder='enter department name'
                    name='departmentName'
                    value={departmentName}
                    className='form-control'
                    onChange={(e)=>setDepartmentName(e.target.value)}
                  />
                </div>
                <div className='form-body mb-2'>
                  <label className='form-label'>Department Description:</label>
                  <input
                    type='text'
                    placeholder='enter department description'
                    name='departmentDescription'
                    value={departmentDescription}
                    className='form-control'
                    onChange={(e)=>setDepartmentDescription(e.target.value)}
                  />
                </div>
                <button className='btn btn-success' onClick={(e)=>saveOrUpdateDepartment(e)}>Submit</button>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DepartmentComponent