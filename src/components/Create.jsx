import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../utils/AxiosService'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ApiRoutes from '../utils/ApiRoutes';

function Create() {

  const navigate = useNavigate()
  
  const createTask = async(e)=>{
    e.preventDefault()
   try {
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let res = await AxiosService.post(ApiRoutes.TA_CREATE.path,formProps,{
      authenticate:ApiRoutes.TA_CREATE.authenticate
    })

    if(res.status===200)
    {
        toast.success(res.data.message)
        navigate('/status')
    }
   
   } catch (error) {
      toast.error(error.response.data.message)
   }
  }
  return <>
    <NavBar/>
    <div className='loginWrapper'>
    <h3>Create Task here</h3>
    <Form onSubmit={createTask}>
    <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title" name="title"/>
      </Form.Group>

      <Form.Group className="mb-3">
      <FloatingLabel label="Description">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          name="description"
        />
      </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Progress</Form.Label>
      <Form.Select defaultValue={"Open"} name="progress">
        <option value="Open" disabled>Open</option>
        <option value="To-Do">To-Do</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Done">Done</option>
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Deadline</Form.Label>
        <Form.Control type="text" placeholder="Deadline (DD/MM/YYYY format)" name="deadline"/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
  </>
 
}

export default Create