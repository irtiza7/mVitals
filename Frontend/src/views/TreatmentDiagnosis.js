
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

class TreatmentDiagnosis extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row className="my-3 justify-content-center">
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Treatment Plan And Diagnosis</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row className="my-3 justify-content-center">
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Patient ID</label>
                          <Input
                            defaultValue="000"
                            placeholder="Patient ID"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Patient Name</label>
                          <Input
                            defaultValue=""
                            placeholder="Patient Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-1" md="12">
                        <FormGroup>
                          <label>
                            Diagnosis
                          </label>
                          <Input
                            defaultValue="Diagonsis of Patient"
                            placeholder="Patient Diagnosis"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-1" md="12">
                        <FormGroup>
                          <label>Treatment Plan</label>
                          <Input
                            defaultValue="Treatment Plan of Patient"
                            placeholder="Patient Treatment Plan"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Special Notes</label>
                          <Input
                            type="textarea"
                            defaultValue="Notes about Patient"
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
                        >
                          Update
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

export default TreatmentDiagnosis;
