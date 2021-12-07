
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Alert
} from "reactstrap";

class AddUser extends React.Component {

  constructor(props) {
    super(props);

    this.getAllPatients = this.getAllPatients.bind(this);
    this.checkRequestResponse = this.checkRequestResponse.bind(this);
    this.onClickAddButton = this.onClickAddButton.bind(this);

    this.state = {
      patientdata: []
    };

  }

  componentDidMount() {
    this.getAllPatients();
    console.log(this.props.userData);
  }

  onClickAddButton(e) {
    // console.log(this.state);

    //Make api request for search
    const url = 'http://localhost:8080/patient/' + e.target.value + '/docID?docID=' + this.props.userData._id;
    console.log(url);
    fetch(url, { method: 'put' })
      .then(() => {
        this.setState({
          hasAlert: true
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  getAllPatients() {
    console.log(this.state);

    console.log(this.state);
    //Make api request for search
    const url = 'http://localhost:8080/patients/';

    fetch(url, { method: 'get' })
      .then(response => response.json())
      .then(data => this.checkRequestResponse(data))
      .catch(function (err) {
        console.log(err);
      });


  };

  checkRequestResponse(data) {
    console.log(data);
    this.setState({
      patientdata: data,
    })
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            {this.state.hasAlert ? <Alert color="success">Patient is Added!</Alert> : null}
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Add Patients</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Contact Number</th>
                        <th className="text-right">Address</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.patientdata.map((patient, index) => {
                          return (<tr key={index}>
                            <td>{patient._id}</td>
                            <td>{patient.firstname + " " + patient.lastname}</td>
                            <td>{patient.age}</td>
                            <td>{patient.contactno}</td>
                            <td className="text-right">{patient.address}</td>
                            <td>
                              <Button onClick={this.onClickAddButton}
                                className="btn-round"
                                color="primary"
                                type="submit"
                                name="Add"
                                value={patient._id}
                              >
                                Add
                        </Button > </td>
                          </tr>);
                        })
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default AddUser;
