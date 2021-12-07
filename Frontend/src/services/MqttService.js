/* globals mqtt */
class MqttService {
    constructor() {
        var options = {
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            host: "192.168.43.66",
            port: 9001
        };

        this._subscribers = {};

        var client = mqtt.connect(options);

        client.on('connect', () => {
            console.log("MQTT Connected");
        });
        client.on('disconnect', () => console.log("MQTT Disonnected"));
        client.on('offline', () => console.log("MQTT Offline"));
        client.on('end', () => console.log("MQTT Ended"));
        client.on('error', (error) => {
            console.log("MQTT Error: " + error);
        });

        client.on('message', (topic, message) => {
            if (topic in this._subscribers) {
                var func = this._subscribers[topic];
                func(topic, message);
            }
        });

        this._client = client;
    }

    registerSubscriber(topic, func) {
        this._subscribers[topic] = func;
        this._client.subscribe(topic);
    }

    unregisterSubscriber(topic) {
        if (topic in this._subscribers) {
            delete this._subscribers[topic];
            this._client.unsubscribe(topic);
        }
    }
};

export default MqttService;