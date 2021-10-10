const mqtt = require('mqtt');
const mongoose = require('mongoose');
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
const LED = require('./model/LED');

var topic="/myLED";
const url = 'mongodb+srv://admin-Cecilia:Cr020199@cluster0.nazzt.mongodb.net/iService?retryWrites=true&w=majority';
var testLED=new LED({
    Name: "LED0001",
    Color: "",
    startTime: "",
    endTime: "",
    Power: "OFF"
})
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((p) => {
		console.log(p);
	});
client.on('connect', () => {
    client.subscribe(topic);
    console.log('mqtt connected'); 
});
client.on('message', (topic, message) => {
    console.log("Topic is: " + topic)
    var mqtt_message=JSON.parse(message)

    const myLed = new LED({
        Name: mqtt_message["Name"],
        Color: mqtt_message["Color"],
        startTime: mqtt_message["startTime"],
        endTime: mqtt_message["endTime"],
        Power: mqtt_message["Power"]
    })
    myLed 
    .save()
    .catch((err) => console.log(err));

    console.log(myLed) 
    console.log("Before") 
    console.log(testLED) 

    testLED=myLed
    console.log("After") 
    console.log(testLED) 

    
});