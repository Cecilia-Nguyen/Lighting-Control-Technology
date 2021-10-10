const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
var topic="/myLED";

var message= JSON.stringify({ "Name":"LED0001","Color": "Blue", "startTime": "15:00", "endTime":"20:30", "Power": "ON"})

client.on('connect', () => {
    console.log('mqtt connected');
    client.publish(topic, message);
    console.log('published to Topic: ' + topic + " with Message: " + message);
});