import React,{useState} from 'react'
import NavBar from './NavBar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../utils/AxiosService'
import toast from 'react-hot-toast';
import ApiRoutes from '../utils/ApiRoutes';
import Table from 'react-bootstrap/Table';
import Helper from '../utils/Helper'

function Status() {

  let [data,setData] = useState({})

  const getTaskDetails = async(e)=>{
    e.preventDefault()
    try {
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);
      let taskNo = formProps.taskNo

      let res = await AxiosService.get(`${ApiRoutes.TA.path}/${taskNo}`,{
        authenticate:ApiRoutes.TA.authenticate
      })

      if(res.status === 200)
      {
          toast.success(res.data.message)
          setData(res.data.data)
          console.log(res.data.data)
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return<>
  <NavBar/>
  <div className='loginWrapper'>
  <Form onSubmit={getTaskDetails}>
      <Form.Group className="mb-3">
        <Form.Label>TASK NO:</Form.Label>
        <Form.Control type="text" placeholder="Enter Task No" name="taskNo"/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
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
  </>
}

export default Status