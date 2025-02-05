import React from 'react'
import NavBar from './NavBar'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateUser = () => {

    let navigate = useNavigate()

    const createUser = async(e)=>{
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);

            let res = await AxiosService.post(ApiRoutes.GET_USERS.path, formProps,{
                authenticate: ApiRoutes.GET_USERS.authenticate
            })

            if(res.status===200)
                {
                    toast.success(res.data.message);
                    navigate('/users');
                }
        } catch (error) {
            toast.error(error.response.data.message)
            if(error.response.status===401)
                logout()
        }
        console.log('hi')
    }
  return (  <>
    <NavBar/>
    <div className='loginWrapper'>
    <h3>Create User</h3>
    <Form onSubmit={createUser}>
    <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" name="name"/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email"/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Password" name="password"/>
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Role</Form.Label>
      <Form.Select defaultValue={"default"} name="role">
        <option value="default" disabled>Select Role</option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
      </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
  </>
  )
}

export default CreateUser