import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";


class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDoctor: false
    };

    this.onTypeChange = this.onTypeChange.bind(this);
    this.onRegisterButtonPressed = this.onRegisterButtonPressed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkRequestResponse = this.checkRequestResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  checkRequestResponse(data) {
    this.props.onLoginCompleteCallback(data);
    this.props.history.push('/admin/dashboard');
  }

  handleError(error) {
    console.log(error);
    this.setState({ hasError: true });
  }

  onRegisterButtonPressed() {
    this.setState({ hasError: false });
    console.log(this.state); // for debugging purposes
    //Make api request for register
    const url = 'http://localhost:8080/register/doctor?email=' + this.state.email + '&password=' + this.state.password + '&username=' + this.state.username + '&firstname=' + this.state.firstname + '&lastname=' + this.state.lastname + '&degree=' + this.state.degree + '&gender=' + this.state.gender + '&phone=' + this.state.phone;
    fetch(url, { method: 'post' })
      .then(response => response.json())
      .then(data => this.checkRequestResponse(data))
      .catch(this.handleError);
  }

  onTypeChange(e) {
    this.setState({ isDoctor: e.currentTarget.value === "doctor" });
  }

  getDoctorForm() {
    return (
      <FormGroup>
        <Label for="firstname">First Name</Label>
        <Input type="text" name="firstname" id="firstname" onChange={this.handleChange} />
        <Label for="lastname">Last Name</Label>
        <Input type="text" name="lastname" id="lastname" onChange={this.handleChange} />
        <Label for="degree">Qualification</Label>
        <Input name="degree" id="degree" onChange={this.handleChange} />
        <Label for="gender">Gender</Label>
        <Input type="text" name="gender" id="gender" onChange={this.handleChange} />
        <Label for="phone">Contact Number</Label>
        <Input type="number" name="phone" id="phone" onChange={this.handleChange} />
      </FormGroup>
    );
  }

  getPatientForm() {
    return (
      <FormGroup>
        <Label for="firstname">First Name</Label>
        <Input type="text" name="firstname" id="firstname" />
        <Label for="lastname">Last Name</Label>
        <Input type="text" name="lastname" id="lastname" />
        <Label for="age">Age</Label>
        <Input type="number" name="age" id="age" />
        <Label for="gender">Gender</Label>
        <Input type="text" name="gender" id="gender" />
        <Label for="address">Address</Label>
        <Input type="string" name="address" id="address" />
        <Label for="phone">Contact Number</Label>
        <Input type="number" name="phone" id="phone" />
        <Label for="deviceid">Device ID</Label>
        <Input type="string" name="deviceid" id="deviceid" />
        <Label for="docID">Doctor ID</Label>
        <Input type="string" name="docID" id="docID" />
      </FormGroup>
    );
  }

  render() {
    return (
      <>
        <Container className="content" fluid>
          <Row className="my-3 justify-content-center">
            <Col lg="3" md="6" sm="6">
              <Card>
                <CardBody>
                  <Row className="justify-content-center">
                    <h1>
                      mVitals
                    </h1>
                  </Row>
                  <Row className="justify-content-center">
                    <p className="text-center">
                      An Intelligent Edge Computing Based Mobile Healthcare System
                    </p>
                  </Row>
                  <Row className="justify-content-center">
                    <h2>
                      Register
                    </h2>
                  </Row>
                  <Form onSubmit={(e) => e.preventDefault()}>
                    <FormGroup tag="fieldset">
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" value="doctor" checked={this.state.isDoctor} onChange={this.onTypeChange} />{' '}
                          Doctor
                        </Label>
                        <Label check>
                          <Input type="radio" value="patient" checked={!this.state.isDoctor} onChange={this.onTypeChange} />{' '}
                          Patient
                        </Label>
                      </FormGroup>

                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input type="email" name="email" id="exampleEmail" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleusername">Username</Label>
                      <Input type="string" name="username" id="exampleusername" onChange={this.handleChange} />
                    </FormGroup>
                    {this.state.isDoctor ? this.getDoctorForm() : this.getPatientForm()}
                    <Button onClick={this.onRegisterButtonPressed}>Register</Button>
                  </Form>
                </CardBody>
                <CardFooter>

                </CardFooter>
              </Card>
            </Col>

          </Row>
        </Container>
      </>
    );
  }
};

export default Register;