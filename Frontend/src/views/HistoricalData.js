
import React from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Input
} from "reactstrap";
// core components

import {
  getTempChart, getPulseChart, getoxyLvlChart, getBpChart, getECGChart
} from "variables/chartHelpers.js";

import InfluxDBService from "../services/InfluxDBService.js";

class HistoricalData extends React.Component {
  constructor() {
    super();

    this.state = {
      startTime: null,
      endTime: null,
      tempData: null,
      pulseData: null,
      oxyData: null,
      ecgData: null,
      bpData: null
    };

    this._influxDBService = new InfluxDBService();
    this.onStartEndTimesChanged = this.onStartEndTimesChanged.bind(this);
  }

  onStartEndTimesChanged(e) {
    var startTime = this.state.startTime;
    var endTime = this.state.endTime;

    if (e.target.name === "startTime") {
      const newVal = new Date(e.target.value).toISOString();
      this.setState({
        startTime: newVal
      });

      startTime = newVal;
    }

    if (e.target.name === "endTime") {
      const newVal = new Date(e.target.value).toISOString();
      this.setState({
        endTime: newVal
      });

      endTime = newVal;
    }

    if (startTime && endTime) {

      this._influxDBService.getData("ecg", startTime, endTime).then((data) => {
        if (data.length > 0) {
          this.setState({
            ecgData: getECGChart(data)
          });
        }
      });

      this._influxDBService.getData("bp", startTime, endTime).then((data) => {
        if (data.length > 0) {
          this.setState({
            bpData: getBpChart(data)
          });
        }
      });

      this._influxDBService.getData("oxylvl", startTime, endTime).then((data) => {
        if (data.length > 0) {
          this.setState({
            oxyData: getoxyLvlChart(data)
          });
        }

      });

      this._influxDBService.getData("pulse", startTime, endTime).then((data) => {
        if (data.length > 0) {
          this.setState({
            pulseData: getPulseChart(data)
          });
        }

      });

      this._influxDBService.getData("temp", startTime, endTime).then((data) => {
        if (data.length > 0) {
          this.setState({
            tempData: getTempChart(data)
          });
        }
      });
    }
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md='4'>
              <FormGroup>
                <label>Select Start Time</label>
                <Input placeholder="" type="datetime-local" name="startTime" onChange={this.onStartEndTimesChanged} />
              </FormGroup>
            </Col>
            <Col md='4'>
              <FormGroup>
                <label>Select End Time</label>
                <Input placeholder="" type="datetime-local" name="endTime" onChange={this.onStartEndTimesChanged} />
              </FormGroup>
            </Col>
          </Row>
          {this.state.bpData ?
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h5">Blood Pressure</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Bar
                      data={this.state.bpData.data}
                      options={this.state.bpData.options}
                      width={400}
                      height={100}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row> : null}
          {this.state.ecgData ?
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h5">ECG</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Line
                      data={this.state.ecgData.data}
                      options={this.state.ecgData.options}
                      width={400}
                      height={100}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row> : null}

          {this.state.tempData ?
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h5">Temperature</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Line
                      data={this.state.tempData.data}
                      options={this.state.tempData.options}
                      width={400}
                      height={100}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row> : null}

          {this.state.pulseData ?
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h5">Heart Rate</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Line
                      data={this.state.pulseData.data}
                      options={this.state.pulseData.options}
                      width={400}
                      height={100}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row> : null}
          {this.state.oxyData ?
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h5">Oxygen Level</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Line
                      data={this.state.oxyData.data}
                      options={this.state.oxyData.options}
                      width={400}
                      height={100}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row> : null}
        </div>
      </>
    );
  }
}

export default HistoricalData;
