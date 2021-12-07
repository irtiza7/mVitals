from influxdb import InfluxDBClient
import paho.mqtt.client as mqtt
import json
from datetime import datetime

clientDB = None

def on_connect(client, userdata, flag, rc):
    print("Connected to Broker")

def on_message(client, userdata, msg):
    print()
    print(msg.payload.decode('utf-8'))
    print()
    
    dict_bp = [
        {
            "measurement": "bp",
            "tags": {"device_id": "d1"},
            "time": "N/A",
            "fields": {
                "sys": "N/A",
                "dia": "N/A"
            },
        }
    ]
    if msg.topic == 'd1/bp':
        data = json.loads(msg.payload.decode("utf-8"))
        dict_bp[0]["time"] = datetime.now().isoformat()
        dict_bp[0]["fields"]["dia"] = data["lwrBP"]
        dict_bp[0]["fields"]["sys"] = data["uprBP"]        
        print()
        print(dict_bp)
        clientDB.write_points(dict_bp)

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
    if msg.topic == 'd1/pulse':
        data = json.loads(msg.payload.decode("utf-8"))
        #dict_lwrBP[0]["tags"]["device_id"] = data["id"]
        dict_pulse[0]["time"] = datetime.now().isoformat()
        dict_pulse[0]["fields"]["pulse"] = data
        print()
        print(dict_pulse)
        clientDB.write_points(dict_pulse)

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
    if msg.topic == 'd1/oxylvl':
        data = json.loads(msg.payload.decode("utf-8"))
        #dict_lwrBP[0]["tags"]["device_id"] = data["id"]
        dict_oxylvl[0]["time"] = datetime.now().isoformat()
        dict_oxylvl[0]["fields"]["oxylvl"] = data
        print()
        print(dict_oxylvl)
        clientDB.write_points(dict_oxylvl)
    
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
    if msg.topic == 'd1/temp':
        data = json.loads(msg.payload.decode("utf-8"))
        #dict_lwrBP[0]["tags"]["device_id"] = data["id"]
        dict_temp[0]["time"] = datetime.now().isoformat()
        dict_temp[0]["fields"]["temp"] = data
        print()
        print(dict_temp)
        clientDB.write_points(dict_temp)
    
    dict_ecg = [
        {
            "measurement": "ecg",
            "tags": {"device_id": "d1"},
            "time": "N/A",
            "fields": {
                "ecg": "N/A",
                "time": "N/A"
            },
        }
    ]
    if msg.topic == 'd1/ecg':
        data = json.loads(msg.payload.decode("utf-8"))
        #dict_lwrBP[0]["tags"]["device_id"] = data["id"]
        dict_ecg[0]["time"] = datetime.now().isoformat()
        dict_ecg[0]["fields"]["ecg"] = data["ecg"]
        dict_ecg[0]["fields"]["time"] = data["time"]
        print()
        print(dict_ecg)
        clientDB.write_points(dict_ecg)

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
clientMQTT = mqtt.Client(transport = 'websockets')
clientMQTT.connect("127.0.0.1", 9001, 60)

# subscribing to the topic of mVitals device with id: abc123xyz
clientMQTT.subscribe("d1/bp")
clientMQTT.subscribe("d1/pulse")
clientMQTT.subscribe("d1/oxylvl")
clientMQTT.subscribe("d1/temp")
clientMQTT.subscribe("d1/ecg")
clientMQTT.subscribe("d1/pos")

clientMQTT.on_connect = on_connect
clientMQTT.on_message = on_message

clientMQTT.loop_forever()