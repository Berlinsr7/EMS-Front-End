import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Button, Table } from 'react-bootstrap'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom'

const Users = () => {

  let [data,setData] = useState([])
  let navigate = useNavigate()

  const loadData = async()=>{
    try {
      let res = await AxiosService.get(ApiRoutes.GET_USERS.path,{
        authenticate:ApiRoutes.GET_USERS.authenticate
      })
      if(res.status === 200){
        setData(res.data.users)
      } 
    } catch (error) {
        toast.error(error.response.data.message)
        if(error.response.status===401)
          logout()
    }
  }

  useEffect(()=>{
      loadData()
    },[])

  return (
    <>
      <NavBar/>
      {data ? <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
          {
            data.map((e,i)=>{
              return <tr key={e._id}>
                <td>{i+1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td><Button variant='primary' onClick={()=>navigate(`/users/${e._id}`)}>View</Button></td>
              </tr>
            })
          }
      </tbody>
    </Table> : <></>}
      
    </>
  )
}

export default Users