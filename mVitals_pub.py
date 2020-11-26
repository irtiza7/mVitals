import paho.mqtt.client as mqtt
import time
import random
import json


def on_connect(client, userdata, flags, rc):
    print("connected to broker")


def on_publish(client, flags, rc):
    print("data published")


def make_list(string):
    readingList = list(string.split(","))
    return readingList


# creating an mqtt client and connecting it to local broker
client = mqtt.Client()
client.connect("127.0.0.1", 1883)
client.on_connect = on_connect
client.on_publish = on_publish

inst = [
    "a, @, 99.15, 1.99, Prone",
    "ae, 23.17, prone",
    "a, 81, 91%, 26.27, 1.95, standing/sitting",
    "i, 78, 96, 81, 90%, 96.18, 1.77, Prone",
    "a, @, 98.15, 2.01, standing/sitting",
    "a, @, 97.1, 1.76, Prone",
    "a, @, 96.77, 1.50, standing/sitting",
    "ae, 96.17, prone",
    "ae, 95.17, staning/sitting",
    "a, 100, 98%, 97.97, 1.83, standing/sitting",
    "a, 95, 89%, 98.27, 0.95, prone",
    "a, 87, 97%, 96.27, 1.20, standing/sitting",
    "i, 81, 120, 78, 90%, 95.18, 1.77, Prone",
    "i, 90, 130, 78, 99%, 99.18, 1.99, Prone",
    "i, 75, 90, 78, 94%, 100.18, 1.99, Prone",
]

while True:
    dictt = {
        "id": "abc123xyz",
        "lwrbp": "N/A",
        "uprbp": "N/A",
        "pul": "N/A",
        "olvl": "N/A",
        "temp": "N/A",
        "ecg": "N/A",
        "pos": "N/A",
    }

    readings = str(random.choice(inst))
    listt = make_list(readings)

    # check for "ae, 23.17, prone" (3)
    if len(listt) == 3:
        dictt["lwrbp"] = listt[0]
        dictt["uprbp"] = listt[0]
        dictt["temp"] = listt[1]
        dictt["pos"] = listt[2]

        json_data = json.dumps(dictt)
        ret = client.publish("/abc123xyz/values", json_data)

    # check for "a, @, 24.15, 1.76, Prone" (5)
    elif len(listt) == 5:
        dictt["lwrbp"] = listt[0]
        dictt["uprbp"] = listt[0]
        dictt["pul"] = listt[1]
        dictt["olvl"] = listt[1]
        dictt["temp"] = listt[2]
        dictt["ecg"] = listt[3]
        dictt["pos"] = listt[4]

        json_data = json.dumps(dictt)
        ret = client.publish("/abc123xyz", json_data)

    # check for "a, 81, 91%, 26.27, 1.95, standing/sitting" (6)
    elif len(listt) == 6:
        dictt["lwrbp"] = listt[0]
        dictt["uprbp"] = listt[0]
        dictt["pul"] = listt[1]
        dictt["olvl"] = listt[2]
        dictt["temp"] = listt[3]
        dictt["ecg"] = listt[4]
        dictt["pos"] = listt[5]

        json_data = json.dumps(dictt)
        ret = client.publish("/abc123xyz", json_data)

    # check for "i, 78, 96, 81, 90%, 23.18, 1.77, Prone" (8)
    elif len(listt) == 8:
        dictt["lwrbp"] = listt[1]
        dictt["uprbp"] = listt[2]
        dictt["pul"] = listt[3]
        dictt["olvl"] = listt[4]
        dictt["temp"] = listt[5]
        dictt["ecg"] = listt[6]
        dictt["pos"] = listt[7]

        json_data = json.dumps(dictt)
        ret = client.publish("/abc123xyz", json_data)

    time.sleep(2)

client.loop()
