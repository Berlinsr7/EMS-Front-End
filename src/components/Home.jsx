import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate()
  return (
    <Container className="mt-4">
      <Row className="text-center">
        <Col>
          <h1>Welcome to Employee Management System</h1>
          <p>Manage employees, track tasks, and monitor productivity efficiently.</p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={4}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title>Employee Management</Card.Title>
              <Card.Text>View, add, edit, and remove employees.</Card.Text>
              <Button variant="primary" disabled>Go to Employees</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title>Task Tracking</Card.Title>
              <Card.Text>Assign and monitor tasks for each employee.</Card.Text>
              <Button variant="success" disabled>Manage Tasks</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title>Reports & Analytics</Card.Title>
              <Card.Text>Analyze employee performance and generate reports.</Card.Text>
              <Button variant="warning" disabled>View Reports</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5 justify-content-center">
        <Col md={4}>
          <Card className="shadow-lg border-primary text-center">
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Card.Text>Access your account to manage employees and tasks.</Card.Text>
              <Button variant="primary" onClick={()=> navigate("/login")}>Login</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
