import axios from 'axios'

const REST_BASE_URI = "http://localhost:8080/api/employee"

export const employeeList = () => axios.get(REST_BASE_URI)

export const createEmployee = (employee) => axios.post(REST_BASE_URI, employee)

export const getEmployee = (employeeId) => axios.get(REST_BASE_URI+'/'+employeeId)

export const updateEmployee = (employeeId, employee) => axios.put(REST_BASE_URI+'/'+employeeId, employee)

export const deleteEmployee = (employeeId) => axios.delete(REST_BASE_URI+'/'+employeeId)