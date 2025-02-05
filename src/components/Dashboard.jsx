import React, { useState,useEffcet, useEffect } from 'react'
import NavBar from './NavBar'
import useLogout from '../hooks/useLogout'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  let [countData,setCountData] = useState({})
  let [data,setData] = useState([])
  let logout = useLogout()
  let navigate = useNavigate()
  let getDashboardCount = async()=>{
    try {
      let res = await AxiosService.get(ApiRoutes.DASHBOARD_COUNT.path,{
        authenticate:ApiRoutes.DASHBOARD_COUNT.authenticate
      })

      if(res.status===200)
      {
          setCountData(res.data.data)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if(error.response.status===401)
        logout()
    }
  }

  let loadData = async(status)=>{
    try {
      let res = await AxiosService.get(`${ApiRoutes.LIST.path}/${status}`,{
        authenticate:ApiRoutes.LIST.authenticate
      })

      if(res.status===200)
      {
          setData(res.data.data)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if(error.response.status===401)
        logout()
    }
  }

  useEffect(()=>{
    getDashboardCount()
  },[])
  return <>
  <NavBar/>
  <div className='cardWrapper'>
  <Card style={{ width: '18rem',cursor:"pointer" }} onClick={()=>loadData("Open")}>
      <Card.Body style={{display:"flex",justifyContent:"space-between"}}>
        <Card.Title>Open</Card.Title>
        <Card.Title>{countData["Open"]?countData["Open"]:0}</Card.Title>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem',cursor:"pointer" }} onClick={()=>loadData("To-Do")}>
      <Card.Body style={{display:"flex",justifyContent:"space-between"}}>
        <Card.Title>To-Do</Card.Title>
        <Card.Title>{countData["To-Do"]?countData["To-Do"]:0}</Card.Title>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem',cursor:"pointer" }} onClick={()=>loadData("In-Progress")}>
      <Card.Body style={{display:"flex",justifyContent:"space-between"}}>
        <Card.Title>In-Progress</Card.Title>
        <Card.Title>{countData["In-Progress"]?countData["In-Progress"]:0}</Card.Title>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem',cursor:"pointer" }} onClick={()=>loadData("Done")}>
      <Card.Body style={{display:"flex",justifyContent:"space-between"}}>
        <Card.Title>Done</Card.Title>
        <Card.Title>{countData["Done"]?countData["Done"]:0}</Card.Title>
      </Card.Body>
    </Card>
  </div>
  {
    data.length?<div className='details-wrapper'>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Progress</th>
          <th>AssignedTo</th>
          <th>Date</th>
          <th>Deadline</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
          {
            data.map((e,i)=>{
              return <tr key={e._id}>
                <td>{i+1}</td>
                <td>{e.title}</td>
                <td>{e.description}</td>
                <td>{e.progress}</td>
                <td>{e.assignedTo?.name}</td>
                <td>{e.date}</td>
                <td>{e.deadline}</td>
                <td><Button variant='primary' onClick={()=>navigate(`/tasks/${e.no}`)}>View</Button></td>
              </tr>
            })
          }
      </tbody>
    </Table>

    </div>:<h3 style={{textAlign:"center"}}>No Data Available</h3>
  }
  </>
}

export default Dashboard