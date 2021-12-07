
import React, { useState, useEffect, useContext } from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
import {
  dashboardECGChart
} from "variables/charts.js";

import { MqttContext } from "../App.js";


var echChartRef = null;


const getECGData = (labels, data) => {
  const ecgData = {
    labels: labels,
    datasets: [
      {
        data: data,
        fill: false,
        borderColor: "#000000",
        backgroundColor: "transparent",
        borderWidth: 0.5,
        lineTension: 0,
        pointRadius: 0
      },
    ],
  };
  console.log(ecgData);
  return ecgData;
}

function Dashboard() {
  const [pulse, setPulse] = useState(68);
  const [temp, setTemp] = useState(30);
  const [sys, setSys] = useState(120);
  const [dia, setDia] = useState(80);
  const [oxy, setOxy] = useState("99%");
  const [pos, setPos] = useState("standing/sitting postion");
  const [ecgLabels, setECGLabels] = useState([]);
  const [ecgData, setECGData] = useState([]);

  const mqttService = useContext(MqttContext);

  useEffect(() => {
    mqttService.registerSubscriber("d1/pulse", (topic, message) => {
      var json = message.toString();
      var mqttData = JSON.parse(json);
      //console.log(mqttData);
      if (mqttData !== '@') {
        setPulse(mqttData);
      }

    });

    mqttService.registerSubscriber("d1/temp", (topic, message) => {
      var json = message.toString();
      var mqttData = JSON.parse(json);
      //console.log(mqttData);
      setTemp(mqttData);
    });

    mqttService.registerSubscriber("d1/bp", (topic, message) => {
      var json = message.toString();
      var mqttData = JSON.parse(json);
      //console.log(mqttData);
      if ((mqttData.uprBP !== 'a') && (mqttData.lwrBP !== 'a')) {
        setSys(mqttData.uprBP);
        setDia(mqttData.lwrBP);
      }
    });

    mqttService.registerSubscriber("d1/oxylvl", (topic, message) => {
      var json = message.toString();
      var mqttData = JSON.parse(json);
      //console.log(mqttData);
      if (mqttData !== '@') {
        setOxy(mqttData);
      }
    });

    mqttService.registerSubscriber("d1/pos", (topic, message) => {
      var json = message.toString();
      var mqttData = JSON.parse(json);
      //console.log(mqttData);
      if (mqttData !== "undefined") {
        setPos(mqttData);
      }

    });

    mqttService.registerSubscriber("d1/ecg", (topic, message) => {
      var json = message.toString();
      var mqttData = JSON.parse(json);
      //console.log(mqttData);

      ecgLabels.push(new Date(mqttData.time).toLocaleTimeString());
      ecgData.push(mqttData.ecg);

      setECGLabels(ecgLabels);
      setECGData(ecgData);

      if (echChartRef) {
        echChartRef.chartInstance.update();
      }
    });


    return function cleanUp() {
      mqttService.unregisterSubscriber("d1/pulse");
      mqttService.unregisterSubscriber("d1/temp");
      mqttService.unregisterSubscriber("d1/bp");
      mqttService.unregisterSubscriber("d1/oxylvl");
      mqttService.unregisterSubscriber("d1/pos");
    }

  }, [mqttService]);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-heartbeat text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Heart Rate</p>
                      <CardTitle tag="p">{pulse} BPM</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-lungs text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Oxygen Saturation</p>
                      <CardTitle tag="p">{oxy}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-thermometer-half text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Body Temperature</p>
                      <CardTitle tag="p">{temp}F</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-stethoscope text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Blood Pressure</p>
                      <CardTitle tag="p">{sys}/{dia}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="12">
                  <div className="icon-big text-center icon-warning">
                    <i className="fas fa-walking text-primary" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Body Position</p>
                    <CardTitle tag="p">{pos}</CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">ECG</CardTitle>
                <p className="card-category">Real Time Monitoring</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={getECGData(ecgLabels, ecgData)}
                  options={dashboardECGChart.options}
                  width={400}
                  height={100}
                  ref={(reference) => { echChartRef = reference; }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}


export default Dashboard;
