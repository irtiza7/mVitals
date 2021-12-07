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


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };

    this.handleError = this.handleError.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onLoginButtonClicked = this.onLoginButtonClicked.bind(this);
    this.checkRequestResponse = this.checkRequestResponse.bind(this);

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleError() {
    console.log("error");
    this.setState({ hasError: true });
  }

  onLoginButtonClicked() {
    this.setState({ hasError: false });
    console.log(this.state);
    //Make api request for login
    const url = 'http://localhost:8080/doctor/login?email=' + this.state.email + '&password=' + this.state.password;
    fetch(url, { method: 'get' })
      .then(response => response.json())
      .then(data => this.checkRequestResponse(data))
      .catch(this.handleError);

  }

  checkRequestResponse(data) {
    this.props.onLoginCompleteCallback(data);
    this.props.history.push('/admin/dashboard');
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
                      Login
                    </h2>
                  </Row>
                  <Form onSubmit={(e) => e.preventDefault()}>
                    <FormGroup className={this.state.hasError ? "has-danger" : ""}>
                      <Label for="exampleEmail">Email</Label>
                      <Input type="email" name="email" id="exampleEmail" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className={this.state.hasError ? "has-danger" : ""}>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" onChange={this.handleChange} />
                    </FormGroup>
                    <Button onClick={this.onLoginButtonClicked} > Login</Button>
                    <Button onClick={() => this.props.history.push("/register")}>Register an account</Button>
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

export default Login;