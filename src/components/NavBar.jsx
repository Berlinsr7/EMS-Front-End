import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { Button } from 'react-bootstrap';

function NavBar() {
  let navigate = useNavigate()
  let role = sessionStorage.getItem("role")
  let logout = useLogout()
  return <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Empolyee Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigate("/profile")}>Profile</Nav.Link>
            <Nav.Link onClick={()=>navigate("/create")}>Create Task</Nav.Link>
            <Nav.Link onClick={()=>navigate("/status")}>Check Status</Nav.Link>
            <Nav.Link onClick={()=>navigate("/login")}>Login</Nav.Link>
            <Nav.Link onClick={()=>navigate("/dashboard")}>Dashboard</Nav.Link>
            {
                role === "admin" ? <Nav.Link onClick={()=>navigate("/users")}>Users</Nav.Link>:<></>
            }
            {
                role === "admin" ? <Nav.Link onClick={()=>navigate("/createUser")}>Create User</Nav.Link>:<></>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Button variant='warning'className='me-5' onClick={logout}>Logout</Button>
    </Navbar>
  </>
}

export default NavBar