import serial
import RPi.GPIO as GPIO
import time 
import random 

def make_list(string):
    readingList = list(string.split(","))
    return readingList

ser = serial.Serial("/dev/ttyACM0", 19200)


while True:
    uprBP = "NULL"
    lwrBP = "NULL"
    pulse = "NULL" 
    oxylvl = "NULL" 
    temp = "NULL" 
    ecg = "NULL"
    pos = "NULL"

    readings = ser.readline()
    listt = make_list(readings)

    print(listt)
    time.sleep(1)