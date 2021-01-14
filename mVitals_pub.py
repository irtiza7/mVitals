import paho.mqtt.client as mqtt
import time
import random
import json
import serial
import RPi.GPIO as GPIO


def on_connect(client, userdata, flags, rc):
    print("connected to broker")


def on_publish(client, flags, rc):
    print("data published")


def make_list(string):
    readingList = list(string.split(","))
    return readingList


def split_pos(string):
    post = string.strip('\r\n')
    #post = string.split('\\')
    return post

# creating an mqtt client and connecting it to local broker
client = mqtt.Client()
client.connect("192.168.43.66", 1883)
client.on_connect = on_connect
client.on_publish = on_publish

ser = serial.Serial("/dev/ttyACM0", 19200)

while True:
    
    lwrBP = "N/A"
    uprBP = "N/A"
    pulse = "N/A"
    oxylvl = "N/A"
    temp = "N/A"
    ecg = "N/A"
    pos = "N/A"
    
    readings = ser.readline()
    print(readings)
    listt = make_list(readings)
    
    # check for "a, @, 24.15, 1.76, Prone" (5)
    if len(listt) == 5:
        
        lwrBP = json.dumps(listt[0])
        uprBP = json.dumps(listt[0])
        pulse = json.dumps(listt[1])
        oxylvl = json.dumps(listt[1])
        temp = json.dumps(listt[2])
        ecg = json.dumps(listt[3])
        pos = json.dumps(split_pos(listt[4]))
        #pos = json.dumps(listt[4])
        
        #uprBP = listt[0]
        #lwrBP = listt[0]
        #pulse = listt[1]
        #oxylvl = listt[1]
        #temp = listt[2]
        #ecg = listt[3]
        #pos = listt[4]
        
        print(uprBP)
        print(lwrBP)
        print(pulse)
        print(oxylvl)
        print(temp)
        print(ecg)
        print(pos)
        
        ret = client.publish("d1/lwrBP", lwrBP)
        ret = client.publish("d1/uprBP", uprBP)
        ret = client.publish("d1/pulse", pulse)
        ret = client.publish("d1/oxylvl", oxylvl)
        ret = client.publish("d1/temp", temp)
        ret = client.publish("d1/ecg", ecg)
        ret = client.publish("d1/pos", pos)
        
        #json_data = json.dumps(dictt)
        #ret = client.publish("/abc123xyz", json_data)

    # check for "a, 81, 91%, 26.27, 1.95, standing/sitting" (6)
    elif len(listt) == 6:
        
        lwrBP = json.dumps(listt[0])
        uprBP = json.dumps(listt[0])
        pulse = json.dumps(listt[1])
        oxylvl = json.dumps(listt[2])
        temp = json.dumps(listt[3])
        ecg = json.dumps(listt[4])
        pos = json.dumps(split_pos(listt[5]))
        #pos = json.dumps(listt[5])
        
        print(uprBP)
        print(lwrBP)
        print(pulse)
        print(oxylvl)
        print(temp)
        print(ecg)
        print(pos)
        
        ret = client.publish("d1/lwrBP", lwrBP)
        ret = client.publish("d1/uprBP", uprBP)
        ret = client.publish("d1/pulse", pulse)
        ret = client.publish("d1/oxylvl", oxylvl)
        ret = client.publish("d1/temp", temp)
        ret = client.publish("d1/ecg", ecg)
        ret = client.publish("d1/pos", pos)
        
        #json_data = json.dumps(dictt)
        #ret = client.publish("/abc123xyz", json_data)
    
    # check for "aei,78,96,bp_pulse,85,99%,23.18,1.77,Prone" (9)
    elif len(listt) == 9:
        
        lwrBP = json.dumps(listt[1])
        uprBP = json.dumps(listt[2])
        pulse = json.dumps(listt[4])
        oxylvl = json.dumps(listt[5])
        temp = json.dumps(listt[6])
        ecg = json.dumps(listt[7])
        pos = json.dumps(split_pos(listt[8]))
        #pos = json.dumps(listt[8])
        
        #uprBP = listt[1]
        #lwrBP = listt[2]
        #pulse = listt[4]
        #oxylvl = listt[5]
        #temp = listt[6]
        #ecg = listt[7]
        #pos = listt[8]
        
        ret = client.publish("d1/lwrBP", lwrBP)
        ret = client.publish("d1/uprBP", uprBP)
        ret = client.publish("d1/pulse", pulse)
        ret = client.publish("d1/oxylvl", oxylvl)
        ret = client.publish("d1/temp", temp)
        ret = client.publish("d1/ecg", ecg)
        ret = client.publish("d1/pos", pos)

        print(uprBP)
        print(lwrBP)
        print(pulse)
        print(oxylvl)
        print(temp)
        print(ecg)
        print(pos)
        
        #json_data = json.dumps(dictt)
        #ret = client.publish("/abc123xyz", json_data)
    
    # check for "aei,78,96,bp_pulse,no data available,23.18,1.77,Prone" (8)
    elif len(listt) == 8:
        
        lwrBP = json.dumps(listt[1])
        uprBP = json.dumps(listt[2])
        pulse = json.dumps(listt[4])
        oxylvl = json.dumps(listt[4])
        temp = json.dumps(listt[5])
        ecg = json.dumps(listt[6])
        pos = json.dumps(split_pos(listt[7]))
        #pos = json.dumps(listt[7])
        
        #uprBP = listt[1]
        #lwrBP = listt[2]
        #pulse = listt[4]
        #oxylvl = listt[4]
        #temp = listt[5]
        #ecg = listt[6]
        #pos = listt[7]
        
        ret = client.publish("d1/lwrBP", lwrBP)
        ret = client.publish("d1/uprBP", uprBP)
        ret = client.publish("d1/pulse", pulse)
        ret = client.publish("d1/oxylvl", oxylvl)
        ret = client.publish("d1/temp", temp)
        ret = client.publish("d1/ecg", ecg)
        ret = client.publish("d1/pos", pos)

        print(uprBP)
        print(lwrBP)
        print(pulse)
        print(oxylvl)
        print(temp)
        print(ecg)
        print(pos)
        
        #json_data = json.dumps(dictt)
        #ret = client.publish("/abc123xyz", json_data)
        
        

    print("________________________________________")
    time.sleep(2)

client.loop()
