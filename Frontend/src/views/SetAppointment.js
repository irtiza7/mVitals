
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
  Input,
  Alert
} from "reactstrap";

class SetAppointment extends React.Component {

  constructor(props) {
    super(props);

    this.getAllPatients = this.getAllPatients.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.checkRequestResponse = this.checkRequestResponse.bind(this);
    this.onClickSetButton = this.onClickSetButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAllAppointment = this.getAllAppointment.bind(this);
    this.state = {
      patientdata: []
    };

  };

  onClickSetButton(e) {
    console.log(this.state);

    const url = 'http://localhost:8080/setappointment/patient?docID=' + this.props.userData._id + '&patientid=' + e.target.value + '&datetime=' + this.state[e.target.value];
    //console.log(url);
    fetch(url, { method: 'post' })
      .then(() => {
        console.log("test");
        this.setState({
          hasAlert: true
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  getAllAppointment() {
    //Make api request for search
    const url = 'http://localhost:8080/appointments/';

    fetch(url, { method: 'get' })
      .then(response => response.json())
      .then(data => this.checkRequestResponseForAppointments(data))
      .catch(function (err) {
        console.log(err);
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    this.getAllPatients();
    this.getAllAppointment();
  };

  getAllPatients() {
    console.log(this.state);

    const url = 'http://localhost:8080/patients/';

    fetch(url, { method: 'get' })
      .then(response => response.json())
      .then(data => this.checkRequestResponse(data))
      .catch(function (err) {
        console.log(err);
      });


  };

  checkRequestResponseForAppointments(data) {
    console.log(data);

    data.forEach(d => {
      if (d.docID === this.props.userData._id) {
        this.setState({
          [d.patientid]: d.datetime
        });
      }
    });

    console.log(this.state);
  }

  checkRequestResponse(data) {
    // console.log(data);

    var dataForDoc = [];

    data.forEach(d => {
      if (d.docID === this.props.userData._id) {
        dataForDoc.push(d);
      }
    });

    this.setState({
      patientdata: dataForDoc,
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            {this.state.hasAlert ? <Alert color="success">Appointment is set!</Alert> : null}
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Set Appointment</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Patient ID</th>
                        <th>Patient Name</th>
                        <th>Time And Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.patientdata.map((patient, index) => {
                          return (<tr key={index}>
                            <td>{patient._id}</td>
                            <td>{patient.firstname + " " + patient.lastname}</td>
                            <td>
                              {
                                this.state[patient._id] ?
                                  <Input value={this.state[patient._id]} name={patient._id} placeholder="" type="datetime-local" onChange={this.handleChange} />
                                  :
                                  <Input name={patient._id} placeholder="" type="datetime-local" onChange={this.handleChange} />
                              }
                            </td>
                            <td>

                              {this.state[patient._id] ?
                                <Button onClick={this.onClickSetButton}
                                  className="btn-round"
                                  color="primary"
                                  type="submit"
                                  name="Set"
                                  value={patient._id}
                                >
                                  Set
                                </Button >
                                :
                                <Button onClick={this.onClickSetButton}
                                  className="btn-round"
                                  color="primary"
                                  type="submit"
                                  name="Set"
                                  value={patient._id}
                                  disabled
                                >
                                  Set
                                </Button >
                              }
                            </td>
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

export default SetAppointment;
