#include <MySignals.h>

#include "Wire.h"
#include "SPI.h"

int valuePulse;
int valueSPO2;
uint8_t pulsioximeter_state = 0;

struct MybloodPressureDataVector
    {
      uint16_t systolic;
      uint16_t diastolic;
      uint16_t pulse;
    };
    MybloodPressureDataVector MybloodPressureData;

void showTemperature();
void showPosition();
void showGSR();
void showEMG();
void showAirFlow();
void showECG();
void showSnore();
void showSPO2();
void showBloodPressure();
bool MygetBloodPressure();


void setup() {
  // put your setup code here, to run once:
  //Serial.begin(115200); 
  Serial.begin(19200); 
  MySignals.begin();
  MySignals.initBodyPosition();
  MySignals.initSnore(30);
  
  MySignals.initSensorUART();
  MySignals.enableSensorUART(PULSIOXIMETER);
  delay(1000);
  
  MySignals.initSensorUART();
  MySignals.enableSensorUART(BLOODPRESSURE);
  delay(1000);
}

void loop() {
  // put your main code here, to run repeatedly:
 showBloodPressure();
  showTemperature();
  //Serial.print(",");  
  //showGSR();   
  //Serial.print(",");
  //showEMG();
  //Serial.print(",");
  //showAirFlow();
  //Serial.print(",");
  showECG();
  Serial.print(",,");
  //showSnore();
  //Serial.print(",");
  //showSPO2();
  //Serial.print(",");
  showPosition();
 // Serial.println();
 

 delay(1000);

}


void showTemperature() {
     float temperature = MySignals.getTemperature();
    // temperature = (temperature *1.8) + 32;
     //Serial.print(F("Temperature: "));
     Serial.print(temperature, 2);
     Serial.print(",,");
}

void showPosition() {
  uint8_t position = MySignals.getBodyPosition(); 
  //Serial.print("Current position : ");
  //print body position
  MySignals.printPosition(position); 
  //delay(100);
   
  //print acc values
  //MySignals.getAcceleration();
  
  // convert float to strintg
  /*char bufferAcc[50];
  char x_acc_string[10];  
  char y_acc_string[10];
  char z_acc_string[10];
  dtostrf (MySignals.x_data, 2, 2, x_acc_string); 
  dtostrf (MySignals.y_data, 2, 2, y_acc_string);
  dtostrf (MySignals.z_data, 2, 2, z_acc_string);
      
  // print the X Y Z acceleration
  sprintf (bufferAcc, "Acceleration: X= %s  Y= %s  Z= %s  ", x_acc_string, y_acc_string, z_acc_string);
  Serial.println(bufferAcc);*/
}

void showGSR() {
  float conductance = MySignals.getGSR(CONDUCTANCE);
  float resistance = MySignals.getGSR(RESISTANCE);
  float conductanceVol = MySignals.getGSR(VOLTAGE);

  //Serial.print("Conductance : ");       
  Serial.print(conductance, 2);  
 // Serial.println("");         
  Serial.print(",");
  Serial.print(conductanceVol, 4);
  Serial.print(",");
  //Serial.print("Resistance : ");       
  Serial.print(resistance, 2);  
  //Serial.println("");    

  /*Serial.print("Conductance Voltage : ");       
  Serial.print(conductanceVol, 4);  
  Serial.println("");

  Serial.print("\n");*/
  Serial.print(",");
}

void showEMG() {
  float EMG = MySignals.getEMG(VOLTAGE);

  //Serial.print("EMG value :  ");
  Serial.print(EMG, 2);
  //Serial.println(" V"); 
  Serial.print(","); 
}

void showAirFlow() {
  float air = MySignals.getAirflow(VOLTAGE);   
  //Serial.print("Airflow value :  ");
  Serial.print(air, 2);
  //Serial.println(" V");  
  Serial.print(",");
}


void showECG() {
  float ECG = MySignals.getECG(VOLTAGE);

  //Serial.print("ECG value :  ");
  Serial.print(ECG, 2);
  //Serial.println(" V");
}

void showSnore() {
  float snore = MySignals.getSnore(VOLTAGE);

  //Serial.println();
  //Serial.print("Snore value :  ");
  Serial.print(snore, 2);
  //Serial.println(" V");  
}

void showSPO2() {
  // First way of getting sensor data
  MySignals.enableSensorUART(PULSIOXIMETER);
  //Serial.println();
  pulsioximeter_state = MySignals.getPulsioximeter();
  if (pulsioximeter_state == 1)
  {
    //Serial.print(F("Pulse:"));
    Serial.print(F(",,"));
    Serial.print(MySignals.pulsioximeterData.BPM);
    //Serial.print(F("bpm / SPO2:"));
    Serial.print(F(","));
    Serial.print(MySignals.pulsioximeterData.O2);
    Serial.print(F("%,,"));
  }
  else if (pulsioximeter_state == 2)
  {
    //Serial.println(F("Not valid data"));
    Serial.print(",,@,,");
  }
  else
  {
    //Serial.println(F("No available data"));
    Serial.print("No available data,,");
  }
  MySignals.disableSensorUART();

 // delay(2000);


  
}

void showBloodPressure() {
  MySignals.enableSensorUART(BLOODPRESSURE);
  if (MySignals.getStatusBP())
  {
    delay(1000);
  
    if (MygetBloodPressure() == 1)
    {
     MySignals.disableMuxUART();
      //Serial.println();
      Serial.print(",Diastolic: ");
      Serial.print(MybloodPressureData.diastolic);
      Serial.print(",Systolic: ");
      Serial.print(MybloodPressureData.systolic);
      Serial.print(",Pulse/min: ");
      Serial.print(MybloodPressureData.pulse);
      MySignals.enableMuxUART();

    }
  }
  MySignals.disableSensorUART();
  showSPO2();
  delay(1000); 
}

bool MygetBloodPressure(void)
{
  uint8_t finish_bp = 0;

  Serial.write("e");
  //delay(10000);

  unsigned long previous = millis();
   uint8_t ount = 0;
  do
  {


    
    while (Serial.available() > 0 )
    {
      if (ount == 100){
      //showSPO2();  
      showTemperature();      
      //showGSR();   
      //showEMG();
      //showAirFlow();
      showPosition();
      ount=0;
      }
      ount = ount+1;
      uint8_t data = 0x00;

      data = Serial.read();
      //delayMicroseconds(150);
      //Serial.println(data,HEX);

      if (data == 0x67)
      {
        //Serial.println("Dat1");
        delay(10);

        if (Serial.read() == 0x2f)
        {
          //Serial.println("Dat2");
          //delay(10);
          uint8_t buffer[13];
          memset(buffer, 0x00, sizeof(buffer));

          for (uint8_t i = 0; i < 11; i++)
          {
            buffer[i] = Serial.read();
            //delay(10);
          }


          uint8_t sh = buffer[0] - 48;
          uint8_t sm = buffer[1] - 48;
          uint8_t sl = buffer[2] - 48;
          MybloodPressureData.systolic = (sh * 100) + (sm * 10) + sl;

          uint8_t dh = buffer[4] - 48;
          uint8_t dm = buffer[5] - 48;
          uint8_t dl = buffer[6] - 48;
          MybloodPressureData.diastolic = (dh * 100) + (dm * 10) + dl;

          uint8_t ph = buffer[8] - 48;
          uint8_t pm = buffer[9] - 48;
          uint8_t pl = buffer[10] - 48;
          MybloodPressureData.pulse = (ph * 100) + (pm * 10) + pl;


          finish_bp = 1;
        }
      }

    }

  }
  while ((finish_bp == 0) && ((millis() - previous) < 60000));

  //Apago el blood pressure
  Serial.write("i");
  
  return finish_bp;

}
