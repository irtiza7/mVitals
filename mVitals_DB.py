from influxdb import InfluxDBClient
import paho.mqtt.client as mqtt
import json
from datetime import datetime

clientDB = None


def on_connect(client, userdata, flag, rc):
    print("connected to broker")


def on_message(client, userdata, msg):
    print()
    print(msg.payload.decode('utf-8'))
    print()
    dict_lwrBP = [
        {
            "measurement": "lwrBP",
            "tags": {"device_id": "d1"},
            "time": "N/A",
            "fields": {
                "id": "d1",
                "lwrbp": "N/A"
            },
        }
    ]
    dict_uprBP = [
        {
            "measurement": "uprBP",
            "tags": {"device_id": "d1"},
            "time": "N/A",
            "fields": {
                "id": "d1",
                "uprbp": "N/A"
            },
        }
    ]
    dict_pulse = [
        {
            "measurement": "pulse",
            "tags": {"device_id": "d1"},
            "time": "N/A",
            "fields": {
                "id": "d1",
                "pulse": "N/A"
            },
        }
    ]
    dict_oxylvl = [
        {
            "measurement": "oxylvl",
            "tags": {"device_id": "d1"},
            "time": "N/A",
            "fields": {
                "id": "d1",
                "oxylvl": "N/A"
            },
        }
    ]
    dict_temp = [
        {
            "measurement": "temp",
            "tags": {"device_id": "d1"},
            "time": "N/A",
            "fields": {
                "id": "d1",
                "temp": "N/A"
            },
        }
    ]
    dict_ecg = [
        {
            "measurement": "ecg",
            "tags": {"device_id": "d1"},
            "time": "N/A",
            "fields": {
                "id": "d1",
                "ecg": "N/A"
            },
        }
    ]
    dict_pos = [
        {
            "measurement": "pos",
            "tags": {"device_id": "d1"},
            "time": "N/A",
            "fields": {
                "id": "d1",
                "pos": "N/A"
            },
        }
    ]

    if msg.topic == 'd1/lwrBP':
        data = json.loads(msg.payload.decode("utf-8"))
        #dict_lwrBP[0]["tags"]["device_id"] = data["id"]
        dict_lwrBP[0]["time"] = datetime.now().isoformat()
        dict_temp[0]["fields"]["lwrBP"] = data
        print()
        print(dict_lwrBP)
        clientDB.write_points(dict_lwrBP)

    if msg.topic == 'd1/uprBP':
        data = json.loads(msg.payload.decode("utf-8"))
        #dict_lwrBP[0]["tags"]["device_id"] = data["id"]
        dict_uprBP[0]["time"] = datetime.now().isoformat()
        dict_uprBP[0]["fields"]["uprBP"] = data
        print()
        print(dict_uprBP)
        clientDB.write_points(dict_uprBP)

    if msg.topic == 'd1/pulse':
        data = json.loads(msg.payload.decode("utf-8"))
        #dict_lwrBP[0]["tags"]["device_id"] = data["id"]
        dict_pulse[0]["time"] = datetime.now().isoformat()
        dict_pulse[0]["fields"]["pulse"] = data
        print()
        print(dict_pulse)
        clientDB.write_points(dict_pulse)

    if msg.topic == 'd1/oxylvl':
        data = json.loads(msg.payload.decode("utf-8"))
        #dict_lwrBP[0]["tags"]["device_id"] = data["id"]
        dict_oxylvl[0]["time"] = datetime.now().isoformat()
        dict_oxylvl[0]["fields"]["oxylvl"] = data
        print()
        print(dict_oxylvl)
        clientDB.write_points(dict_oxylvl)

    if msg.topic == 'd1/temp':
        data = json.loads(msg.payload.decode("utf-8"))
        #dict_lwrBP[0]["tags"]["device_id"] = data["id"]
        dict_temp[0]["time"] = datetime.now().isoformat()
        dict_temp[0]["fields"]["temp"] = data
        print()
        print(dict_temp)
        clientDB.write_points(dict_temp)
    
    if msg.topic == 'd1/ecg':
        data = json.loads(msg.payload.decode("utf-8"))
        #dict_lwrBP[0]["tags"]["device_id"] = data["id"]
        dict_ecg[0]["time"] = datetime.now().isoformat()
        dict_ecg[0]["fields"]["ecg"] = data
        print()
        print(dict_ecg)
        clientDB.write_points(dict_ecg)

    if msg.topic == 'd1/pos':
        data = json.loads(msg.payload.decode("utf-8"))
        #dict_lwrBP[0]["tags"]["device_id"] = data["id"]
        dict_pos[0]["time"] = datetime.now().isoformat()
        dict_pos[0]["fields"]["pos"] = data
        print()
        print(dict_pos)
        clientDB.write_points(dict_pos)


    # data = json.loads(msg.payload.decode("utf-8"))
    # dict_temp[0]["tags"]["device_id"] = data["id"]
    # dict_temp[0]["time"] = datetime.now().isoformat()
    # dict_temp[0]["fields"] = data
    # print()
    # print(dict_temp)
    # clientDB.write_points(dict_temp)


# clientDB = InfluxDBClient(host = '127.0.0.1', port = 8086)
# clientDB.create_database('mVitals')
# names = clientDB.get_list_database()
# print(names)

# connecting to the created database named mVitals
clientDB = InfluxDBClient("127.0.0.1", 8086, "root", "root", "mVitals")

# creating and mqtt client and connecting it with the broker
clientMQTT = mqtt.Client("pc_sub")
clientMQTT.connect("127.0.0.1", 1883, 60)

# subscribing to the topic of mVitals device with id: abc123xyz
clientMQTT.subscribe("d1/uprBP")
clientMQTT.subscribe("d1/lwrBP")
clientMQTT.subscribe("d1/pulse")
clientMQTT.subscribe("d1/oxylvl")
clientMQTT.subscribe("d1/temp")
clientMQTT.subscribe("d1/ecg")
clientMQTT.subscribe("d1/pos")

clientMQTT.on_connect = on_connect
clientMQTT.on_message = on_message

clientMQTT.loop_forever()