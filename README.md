This is my Final Year Project for my Computer Science degree.

Created an edge based health monitoring system for displaying vitals signs of patients on a web based user application. mVitals is buitl using MySignals sensors, Arduino Uno,
Raspberry Pie 3B, a computer and a cell phone. 
The sensors readings are read with an Arduino board. This microcontroller is connected to an edge node i.e. RPi, via USB cable. Some data processing is applied on the edge node
and then the data is published onto the network wirelessly. MQTT is used as a network protocol. A web based mobile applicatin displays sensors readings to the patient/doctor.
Real time readings are stored in InfluxDB for historical data, and user credentials are stored in MongoDB. 
