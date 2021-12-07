
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onUpdateButtonClicked = this.onUpdateButtonClicked.bind(this);
    this.handleError = this.handleError.bind(this);
    this.checkRequestResponse = this.checkRequestResponse.bind(this);

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onUpdateButtonClicked() {
    const userData = this.props.userData;
    this.setState({ hasError: false });

    const username = this.state["username"] ? this.state["username"] : userData.username;
    const email = this.state["email"] ? this.state["email"] : userData.email;
    const firstname = this.state["firstname"] ? this.state["firstname"] : userData.firstname;
    const lastname = this.state["lastname"] ? this.state["lastname"] : userData.lastname;
    const qualification = this.state["qualification"] ? this.state["qualification"] : userData.qualification;
    const contactno = this.state["contactno"] ? this.state["contactno"] : userData.contactno;
    const password = this.state["password"] ? this.state["password"] : userData.password;
    const url = 'http://localhost:8080/doctor/' + userData._id + '?username=' + username + '&email=' + email + '&firstname=' + firstname + '&lastname=' + lastname + '&qualification=' + qualification + '&contactno=' + contactno + '&password=' + password;
    fetch(url, { method: 'put' })
      .then(response => response.json())
      .then(data => this.checkRequestResponse(data))
      .catch(this.handleError);
  }

  handleError() {
    console.log("error");
    this.setState({ hasError: true });
  }

  checkRequestResponse(data) {
    console.log(data);
    this.props.history.push('/admin/dashboard');
  }

  render() {
    const { userData } = this.props;

    console.log(userData);

    if (userData == null)
      return null;

    const username = this.state["username"] ? this.state["username"] : userData.username;
    const email = this.state["email"] ? this.state["email"] : userData.email;
    const firstname = this.state["firstname"] ? this.state["firstname"] : userData.firstname;
    const lastname = this.state["lastname"] ? this.state["lastname"] : userData.lastname;
    const qualification = this.state["qualification"] ? this.state["qualification"] : userData.qualification;
    const contactno = this.state["contactno"] ? this.state["contactno"] : userData.contactno;
    const password = this.state["password"] ? this.state["password"] : userData.password;



    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={require("assets/img/cover.jpg")}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/doctor.png")}
                      />
                      <h5 className="title">Dr {firstname} {lastname}</h5>
                    </a>
                    <p className="description">@{username}</p>
                  </div>
                  <p className="description text-center">
                    {qualification}
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={(e) => e.preventDefault()}>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            placeholder="Username"
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="Email" type="email" name="email" value={email} onChange={this.handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            placeholder="First Name"
                            type="text"
                            name="firstname"
                            value={firstname}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            placeholder="Last Name"
                            type="text"
                            name="lastname"
                            value={lastname}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Qualification</label>
                          <Input
                            placeholder="Qualification"
                            type="text"
                            name="qualification"
                            value={qualification}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Contact Number</label>
                          <Input
                            placeholder="Number"
                            type="text"
                            name="contactno"
                            value={contactno}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="6">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            name="password"
                            value={password}
                            placeholder="Password"
                            type="password"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                          onClick={this.onUpdateButtonClicked}
                        >
                          Update Profile
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;
