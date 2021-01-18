import paho.mqtt.client as mqtt
import time
import random
import json
import serial
import RPi.GPIO as GPIO
import time
import datetime

def on_connect(client, userdata, flags, rc):
    print("Connected to Broker")

def on_publish(client, flags, rc):
    pass
    #print("Published")

def make_list(string):
    readingList = list(string.split(","))
    return readingList

def split_pos(string):
    post = string.strip('\r\n')
    #post = string.split('\\')
    return post

def bp_object(lwr,upr):
    bp = {"lwrBP":lwr, "uprBP":upr}
    return bp

def ecg_object(ecg):
    n = datetime.datetime.now()
    n = n.isoformat()
    e = {"ecg":ecg, "time":n}
    return e

def temperature(t):
    t = float(t)
    t = (t*1.8)+32
    t = format(round(t, 2))
    return t

# creating an mqtt client and connecting it to local broker
client = mqtt.Client(transport='websockets')
client.connect("192.168.43.66", 9001)
client.on_connect = on_connect
client.on_publish = on_publish

ser = serial.Serial("/dev/ttyACM0", 19200)

while True:
    
    bp = "N/A"
    ecg = "N/A"
    pulse = "N/A"
    oxylvl = "N/A"
    temp = "N/A"
    pos = "N/A"
    
    readings = ser.readline()
    print(readings)
    listt = make_list(readings)
    
    # check for "a, @, 24.15, 1.76, Prone" (5)
    if len(listt) == 5:
        
        bp = json.dumps(bp_object(listt[0], listt[0]))
        ecg = json.dumps(ecg_object(listt[3]))                
        pulse = json.dumps(listt[1])
        oxylvl = json.dumps(listt[1])
        temp = json.dumps(temperature(listt[2]))
        pos = json.dumps(split_pos(listt[4]))
        
        print(bp)
        print(pulse)
        print(oxylvl)
        print(temp)
        print(ecg)
        print(pos)
        
        ret = client.publish("d1/bp", bp)
        ret = client.publish("d1/pulse", pulse)
        ret = client.publish("d1/oxylvl", oxylvl)
        ret = client.publish("d1/temp", temp)
        ret = client.publish("d1/ecg", ecg)
        ret = client.publish("d1/pos", pos)

    # check for "a, 81, 91%, 26.27, 1.95, standing/sitting" (6)
    elif len(listt) == 6:
        
        bp = json.dumps(bp_object(listt[0], listt[0]))
        ecg = json.dumps(ecg_object(listt[4]))                
        pulse = json.dumps(listt[1])
        oxylvl = json.dumps(listt[2])
        temp = json.dumps(temperature(listt[3]))
        pos = json.dumps(split_pos(listt[5]))
        
        print(bp)
        print(pulse)
        print(oxylvl)
        print(temp)
        print(ecg)
        print(pos)
        
        ret = client.publish("d1/bp", bp)
        ret = client.publish("d1/pulse", pulse)
        ret = client.publish("d1/oxylvl", oxylvl)
        ret = client.publish("d1/temp", temp)
        ret = client.publish("d1/ecg", ecg)
        ret = client.publish("d1/pos", pos)
        
    # check for "aei,78,96,bp_pulse,85,99%,23.18,1.77,Prone" (9)
    elif len(listt) == 9:
        
        bp = json.dumps(bp_object(listt[1], listt[2]))
        ecg = json.dumps(ecg_object(listt[7]))                
        pulse = json.dumps(listt[4])
        oxylvl = json.dumps(listt[5])
        temp = json.dumps(temperature(listt[6]))
        pos = json.dumps(split_pos(listt[8]))
        
        print(bp)
        print(pulse)
        print(oxylvl)
        print(temp)
        print(ecg)
        print(pos)
        
        ret = client.publish("d1/bp", bp)
        ret = client.publish("d1/pulse", pulse)
        ret = client.publish("d1/oxylvl", oxylvl)
        ret = client.publish("d1/temp", temp)
        ret = client.publish("d1/ecg", ecg)
        ret = client.publish("d1/pos", pos)

    # check for "aei,78,96,bp_pulse,no data available,23.18,1.77,Prone" (8)
    elif len(listt) == 8:
        
        bp = json.dumps(bp_object(listt[1], listt[2]))
        ecg = json.dumps(ecg_object(listt[6]))                
        pulse = json.dumps(listt[4])
        oxylvl = json.dumps(listt[4])
        temp = json.dumps(temperature(listt[5]))
        pos = json.dumps(split_pos(listt[7]))
        
        print(bp)
        print(pulse)
        print(oxylvl)
        print(temp)
        print(ecg)
        print(pos)
        
        ret = client.publish("d1/bp", bp)
        ret = client.publish("d1/pulse", pulse)
        ret = client.publish("d1/oxylvl", oxylvl)
        ret = client.publish("d1/temp", temp)
        ret = client.publish("d1/ecg", ecg)
        ret = client.publish("d1/pos", pos)
        

    print("________________________________________")
    time.sleep(1)

client.loop()
