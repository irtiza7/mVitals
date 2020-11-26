from influxdb import InfluxDBClient
import paho.mqtt.client as mqtt
import json
from datetime import datetime

clientDB = None


def on_connect(client, userdata, flag, rc):
    print("connected to broker")


def on_message(client, userdata, msg):
    # print()
    # print(msg.payload.decode('utf-8'))
    dict_temp = [
        {
            "measurement": "readings",
            "tags": {"device_id": "N/A"},
            "time": "N/A",
            "fields": {
                "id": "N/A",
                "lwrbp": "N/A",
                "uprbp": "N/A",
                "pul": "N/A",
                "olvl": "N/A",
                "temp": "N/A",
                "ecg": "N/A",
                "pos": "N/A",
            },
        }
    ]

    data = json.loads(msg.payload.decode("utf-8"))
    dict_temp[0]["tags"]["device_id"] = data["id"]
    dict_temp[0]["time"] = datetime.now().isoformat()
    dict_temp[0]["fields"] = data
    print()
    print(dict_temp)
    clientDB.write_points(dict_temp)


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
clientMQTT.subscribe("/abc123xyz")

clientMQTT.on_connect = on_connect
clientMQTT.on_message = on_message

clientMQTT.loop_forever()