import axios from "axios"

const REST_BASE_URI = "http://localhost:8080/api/department"

export const departmentList = () => axios.get(REST_BASE_URI)

export const createDepartment = (department) => axios.post(REST_BASE_URI, department)

export const getDepartment = (departmentId) => axios.get(REST_BASE_URI+'/'+departmentId)

export const updateDepartment = (departmentId, department) => axios.put(REST_BASE_URI+'/'+departmentId, department)

export const deleteDepartment = (departmentId) => axios.delete(REST_BASE_URI+'/'+departmentId)