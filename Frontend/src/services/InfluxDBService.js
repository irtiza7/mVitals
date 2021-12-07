import { InfluxDB } from "influx";

class InfluxDBService {
  constructor() {
    this._influxDB = new InfluxDB("http://root:root@192.168.43.66:8086/mVitals");
    //console.log(this._influxDB.getDatabagseNames());
    this._influxDB.getMeasurements().then(results => console.log(results));

    // this._influxDB.query("select * from uprBP").then((results) => {
    //   console.log(results);
    // });
    // this._influxDB.query("select * from lwrBP").then((results) => {
    //   console.log(results);
    // });
  }

  getData(measurement, startTime, endTime) {
    const query = "select * from " + measurement + " where time >= '" + startTime + "' and time < '" + endTime + "'";
    // console.log(query);
    return this._influxDB.query(query);
  }
};

export default InfluxDBService;