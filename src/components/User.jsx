import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { Button, ButtonGroup, Card, Table } from 'react-bootstrap'
import toast from 'react-hot-toast'

const User = () => {

    let [data,setData] = useState({})
    let [task,setTask] = useState({})
    let logout = useLogout()
    let navigate = useNavigate()

    let params = useParams()
    const {userId} = params;

    useEffect(()=>{
        if(userId)
            loadUser();
    },[])

    const loadUser = async()=>{
        try {
            let res = await AxiosService.get(`${ApiRoutes.GET_USER.path}/${userId}`,{
                authenticate: ApiRoutes.GET_USER.authenticate
            })

            if(res.status === 200){
                setData(res.data.user)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            if(error.response.status===401)
                logout();
        }
    }

    const loadTask = async()=>{
        try {
            setTask(data.tasks)
        } catch (error) {
            toast.error(error.response.data.message)
            if(error.response.status===401)
                logout();
        }
    }

    const deleteUser = async()=>{
        try {
            let res = await AxiosService.delete(`${ApiRoutes.GET_USER.path}/${userId}`,{
                authenticate: ApiRoutes.GET_USER.authenticate
            } ) 

            if(res.status  == 200){
                toast.success("User Deleted Successfully");
                navigate('/users')
            }
        } catch (error) {
            toast.error(error.response.data.message)
            if(error.response.status===401)
                logout();
        }
    }

  return (
    <>
        <Card className="text-center">
            <Card.Header>User Info</Card.Header>
            <Card.Body>
                <Card.Title>{`EMPName: ${data.name}`}</Card.Title>
                <Card.Title>{`EMPID: ${data._id}`}</Card.Title>
                <Card.Title>{`Mail: ${data.email}`}</Card.Title>
                <Card.Title>{`Role: ${data.role}`}</Card.Title>
                {data?.tasks && data.tasks.length > 0 ? (
                    <div className="d-grid gap-2">
                        <Button variant="primary" onClick={loadTask}>Click to View Tasks</Button>
                    </div>
                    ) : (
                    <h4>No Tasks Assigned</h4>
                    )}
                {
                    task.length ? <div className='details-wrapper'>

                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>description</th>
                          <th>progress</th>
                          <th>assignedTo</th>
                          <th>date</th>
                          <th>deadline</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                            task.map((e,i)=>{
                              return <tr key={e._id}>
                                <td>{i+1}</td>
                                <td>{e.title}</td>
                                <td>{e.description}</td>
                                <td>{e.progress}</td>
                                <td>{e.assignedTo}</td>
                                <td>{e.date}</td>
                                <td>{e.deadline}</td>
                                <td><Button variant='primary' onClick={()=>navigate(`/tasks/${e.no}`)}>View</Button></td>
                              </tr>
                            })
                          }
                      </tbody>
                    </Table>
                
                    </div> : <></>
                }
                <ButtonGroup size="lg" className="mt-2">
                    <Button variant='warning' className='me-5' onClick={()=>navigate('/users')}>Back to Users</Button>
                    <Button variant='danger' className='ms-5' onClick={deleteUser}>Delete User</Button>
                </ButtonGroup>            
            </Card.Body>
            <Card.Footer className="text-muted">{`${data.name}@EMS.in`}</Card.Footer>
        </Card>
    </>
  )
}

export default User