import React, { useEffect,useState } from 'react'
import NavBar from './NavBar'
import Button from 'react-bootstrap/Button';
import AxiosService from '../utils/AxiosService'
import toast from 'react-hot-toast';
import ApiRoutes from '../utils/ApiRoutes';
import Table from 'react-bootstrap/Table';
import Helper from '../utils/Helper'
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import useLogout from '../hooks/useLogout';
import { Modal } from 'react-bootstrap';
import {jwtDecode} from "jwt-decode";

function Task() {

  let [data,setData] = useState({})
  let [users,setUsers] = useState([])
  let [showModal, setShowModal] = useState(false); 
  let params = useParams()
  let {taskNo} = params
  let logout = useLogout()
  const role = sessionStorage.getItem('role')
  const getData = async()=>{
    try {
      let res = await AxiosService.get(`${ApiRoutes.TA.path}/${taskNo}`,{
        authenticate:ApiRoutes.TA.authenticate
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

  const changeStatus = async(payload)=>{
    try {
      let res = await AxiosService.patch(`${ApiRoutes.CHANGE_STATUS.path}/${payload.id}`,payload,{
        authenticate:ApiRoutes.CHANGE_STATUS.authenticate
      })

      if(res.status===200)
      {
        toast.success(res.data.message)
        getData()
      }

    } catch (error) {
       toast.error(error.response.data.message)
       if(error.response.status===401)
         logout()
       
    }
  }

  let handleSubmit = (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    formProps.id = data.no
    changeStatus(formProps)

  }

  const handleAssign = ()=>{
    console.log(users)
    setShowModal(true)
  }

  const assignUser = (e)=>{
    e.preventDefault()
    setShowModal(false)
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    changeStatus({user:JSON.parse(formProps.user),id:data.no})
  }

  // const getUserIdFromToken = () => {
  //         const token = sessionStorage.getItem("token"); // Retrieve token from session storage
  //         if (!token) return null; // Return null if no token
      
  //         try {
  //             const decoded = jwtDecode(token);
  //             return decoded.id; // Extract user_id from token
  //         } catch (error) {
  //             console.error("Invalid token:", error);
  //             return null;
  //         }
  //     }
  
  useEffect(()=>{
    if(taskNo)
      getData()
        const fetch = async()=>{
      //     const userId = await getUserIdFromToken();
      //     if(userId){
      //     try {
      //         let res = await AxiosService.get(`${ApiRoutes.GET_USER.path}`,{
      //             authenticate: ApiRoutes.GET_USER.authenticate
      //         })

      //         if(res.status === 200){
      //             setUsers(res.data.user)
      //         }
      //     } catch (error) {
      //         toast.error(error.response.data.message)
      //         if(error.response.status===401)
      //             logout();
      //     }
      // }
      try {
        let res = await AxiosService.get(ApiRoutes.GET_USERS.path,{
          authenticate:ApiRoutes.GET_USERS.authenticate
        })
        if(res.status === 200){
          setUsers(res.data.users)
        } 
      } catch (error) {
          toast.error(error.response.data.message)
          if(error.response.status===401)
            logout()
      }
    }
    fetch();
  },[])

  return <>
  <NavBar/>
  <div className="details-wrapper">
  <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
          {
            Object.keys(data).map((e,i)=>{
              return <tr>
                <td>{Helper.upperCase(e)}</td>
                <td>{data[e]!==null?data[e]:"-"}</td>
              </tr>
            })
          }
      </tbody>
    </Table>
  </div>
  <div>
        {
          data.progress==="Open" ? <Button className='me-5 ms-5' variant='warning' onClick={()=>changeStatus({id:data.no})}>Assign To Me</Button>:
          data.progress === "To-Do"? <Button variant='warning' onClick={()=>changeStatus({id:data.no})}>Move to In-progress</Button>:
          data.progress==="In-Progress"?<> 
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <FloatingLabel label="Resolution">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                name="resolution"
              />
            </FloatingLabel>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          </Form>
          </>:<></>
        }
        {role === "admin" && data.progress==="Open" ? <Button className='ms-5' variant='warning' onClick={()=>handleAssign()}>Assign to someone</Button>: <></>}
  </div>

  {
    showModal && <div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
  >
    <Form onSubmit={assignUser}>
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Assign a User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Select name="user">
          <option>Select a User</option>
          {users.map((user) => (
            <option key={user._id} value={JSON.stringify(user)}>
              {user.name}
            </option>
          ))}
        </Form.Select>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Save changes
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
</Form>

    
  </div>
  }
  </>
}

export default Task