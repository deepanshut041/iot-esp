#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

// Replace it with your username and password
const char* ssid = "Ess3";
const char* password = "123456789@";
 
void setup () {
 
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print("Connecting..");
  }
 
}
 
void loop() {
 
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
 
    HTTPClient http;  //Declare an object of class HTTPClient

    // Replace it with your current ip(--> cmd type ipconfig and use ipv4 address instaed of 192.168.1.114
    http.begin("http://192.168.1.114:3000/api/board");  //Specify request destination
    int httpCode = http.GET();                                                                  //Send the request
 
    if (httpCode > 0) { //Check the returning code
 
      String payload = http.getString();   //Get the request response payload
      sensor_code(payload);
    }
 
    http.end();   //Close connection
 
  }
  delay(3000);    //Send a request every 3 seconds
}

void sensor_code(String payload){
  StaticJsonBuffer<200> jsonBuffer;
  char Json[200];
  payload.toCharArray(Json, 200);
  JsonObject& root = jsonBuffer.parseObject(Json);
  if (!root.success()) {
    Serial.println("parseObject() failed");
    return;
  }
  // Fan switch and slider variable are here
  boolean fan_switch = root["fan_switch"];
  int fan_slider = root["fan_slider"];
  
  // Ac switch and slider variable are here
  boolean ac_switch = root["ac_switch"];
  int ac_slider = root["ac_slider"];
  
  // Light switch and slider variable are here
  boolean light_switch = root["light_switch"];
  int light_slider = root["light_slider"];


  // Printing their value to serialer monitor
  Serial.println("");
  Serial.println("Fan values are ");
  Serial.println(fan_switch);
  Serial.println(fan_slider);
  Serial.println("");
  Serial.println("Ac values are ");
  Serial.println(ac_switch);
  Serial.println(ac_slider);
  Serial.println("");
  Serial.println("Light values are ");
  Serial.println(light_switch);
  Serial.println(light_slider);
  Serial.println("");
  Serial.println("");
}
