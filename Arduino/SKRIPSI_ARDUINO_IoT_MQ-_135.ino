#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <MQUnifiedsensor.h>
// example token 
// WiFi credentials
const char* ssid = "Sat";
const char* password = "12345679";
const char* serverAddress = "serveraddres";
const char* token ="token";
// MQ-135 sensor setup
#define placa "ESP32"
#define Voltage_Resolution 3.3
#define pin 34 // Analog input pin for MQ-135
#define type "MQ-135"
#define ADC_Bit_Resolution 12
#define RatioMQ135CleanAir 3.6

MQUnifiedsensor MQ135(placa, Voltage_Resolution, ADC_Bit_Resolution, pin, type);

const int phPin = 33;
float Po = 0;
float PH_Step;
int nilai_analog_PH;
double teganganPh;


float PH4 = 3.033;
float PH7 = 2.525;
float PH10 = 2.161;

// Buzzer and LED pin definitions
const int buzzerPin = 23;
const int ledInternetPin = 13;
const int ledPostDataPin = 22;

const int ledMerah = 15;
const int letKuning = 4;
const int leHijau = 5;
const int letBiru = 18;
const int letCustom = 19;

const int ledMerahNH3 = 12;
const int letKuningNH3 = 27;
const int leHijauNH3 = 25;
const int letBiruNH3 = 32;

// Thresholds
const float PH_THRESHOLD_LOW = 6.5;
const float PH_THRESHOLD_HIGH = 8.5;
const float NH3_THRESHOLD = 100.0;

// Timing variables
unsigned long lastReadTimeMQ135 = 0;
unsigned long lastReadTimePh = 0;
unsigned long lastSendTime = 0;
const unsigned long readIntervalMQ135 = 5000;
const unsigned long readIntervalPh = 6000;
const unsigned long sendInterval = 30000;
const unsigned long ledOnDuration = 3500;
const unsigned long buzzerOnDuration = 1000;

unsigned long ledPostDataEndTime = 0;
unsigned long buzzerEndTime = 0;

void setup() {
  Serial.begin(9600);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");

  pinMode(phPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledInternetPin, OUTPUT);  // Initialize pin LED status connection to the internet
  pinMode(ledPostDataPin, OUTPUT);  // Initialize pin LED status successful post data

  // Initialize LED pins
  pinMode(ledMerah, OUTPUT);
  pinMode(letKuning, OUTPUT);
  pinMode(leHijau, OUTPUT);
  pinMode(letBiru, OUTPUT);
  pinMode(letCustom, OUTPUT);

  // NH3
  pinMode(ledMerahNH3, OUTPUT);
  pinMode(letKuningNH3, OUTPUT);
  pinMode(leHijauNH3, OUTPUT);
  pinMode(letBiruNH3, OUTPUT);

  MQ135.setRegressionMethod(1);
  MQ135.setA(102.2);
  MQ135.setB(-2.473);
  MQ135.init();

  Serial.print("Calibrating MQ-135...");
  float calcR0 = 0;
  for (int i = 1; i <= 10; i++) {
    MQ135.update();
    calcR0 += MQ135.calibrate(RatioMQ135CleanAir);
    Serial.print(".");
  }
  MQ135.setR0(calcR0 / 10);
  Serial.println(" done.");

  if (isinf(calcR0)) {
    Serial.println("Connection issue: R0 is infinite (Open circuit detected)");
    while (1);
  }
  if (calcR0 == 0) {
    Serial.println("Connection issue: R0 is zero (Analog pin shorts to ground)");
    while (1);
  }
   /*****************************  MQ CAlibration ********************************************/
  MQ135.serialDebug(true);
}

void loop() {
  unsigned long currentTime = millis();

  if (currentTime - lastReadTimeMQ135 >= readIntervalMQ135) {
    updateSensorMQ135();
    lastReadTimeMQ135 = currentTime;
  }

  if (currentTime - lastReadTimePh >= readIntervalPh) {
    sensorPhUpdate();
    lastReadTimePh = currentTime;
  }

  // Send data to server every 5 seconds
  if (currentTime - lastSendTime >= sendInterval) {
    bool success = sendDataToServer("PH", Po, "PH");
    success &= sendDataToServer("NH3", MQ135.readSensor(), "PPM");
    lastSendTime = currentTime;

    // Control the LED based on success
    if (success) {
      digitalWrite(ledPostDataPin, HIGH); // Turn on LED to indicate successful POST
      ledPostDataEndTime = currentTime + ledOnDuration; // Set the time when the LED should turn off
    } else {
      digitalWrite(ledPostDataPin, LOW);  // Turn off LED if POST fails
    }
  }

  // Turn off the LED if the duration has passed
  if (currentTime > ledPostDataEndTime) {
    digitalWrite(ledPostDataPin, LOW);
  }
 // Manage buzzer status
  if (currentTime < buzzerEndTime) {
    digitalWrite(buzzerPin, HIGH); // Keep buzzer ON if within active time
  } else {
    digitalWrite(buzzerPin, LOW);  // Turn buzzer OFF if the active time has passed
  }
}

void sensorPhUpdate() {
  nilai_analog_PH = analogRead(phPin);
  Serial.print("Nilai ADC Ph: ");
  Serial.println(nilai_analog_PH);
  
  teganganPh = 3.3 / 4095.0 * nilai_analog_PH;
  Serial.print("TeganganPh: ");
  Serial.println(teganganPh, 3);
  
    PH_Step = (PH4 - PH7) / 3.0;
  // PH_Step7to10 = (PH7 - PH10) / 3.0;
  

  if (PH_Step != 0) {
    Po = 7.00 + ((PH7 - teganganPh) / PH_Step);
    Serial.print("Nilai PH Cairan: ");
    Serial.println(Po, 2);
    
 // Reset all LEDs
  digitalWrite(ledMerah, LOW);
  digitalWrite(letKuning, LOW);
  digitalWrite(leHijau, LOW);
  digitalWrite(letBiru, LOW);
  digitalWrite(letCustom, LOW);

  // Check pH range and control LEDs
  if (Po < 3.0) {
    digitalWrite(ledMerah, HIGH);  // Turn on red LED for strong acid
  } else if (Po >= 3.0 && Po <= 6.5) {
    digitalWrite(letKuning, HIGH);  // Turn on yellow LED for weak acid
  } else if (Po > 6.5 && Po <= 7.5) {
    digitalWrite(leHijau, HIGH);    // Turn on green LED for neutral
  } else if (Po > 7.5 && Po <= 10.0) {
    digitalWrite(letBiru, HIGH);    // Turn on blue LED for weak base
  } else if (Po > 10.0) {
    digitalWrite(letCustom, HIGH);  // Turn on custom LED for strong base
  }


 // Check pH thresholds and control buzzer
  if (Po < PH_THRESHOLD_LOW || Po > PH_THRESHOLD_HIGH) {
    digitalWrite(buzzerPin, HIGH);  // Turn buzzer ON
    delay(1000);                    // Keep buzzer ON for 1 second
    digitalWrite(buzzerPin, LOW);   // Turn buzzer OFF
  }
  } else {
    Serial.println("PH Step is zero, check calibration values!");
  }
  

}

void updateSensorMQ135() {
  MQ135.update();
  float ppm = MQ135.readSensor();
  MQ135.serialDebug(); 
  Serial.print("NH4 = ");
  Serial.print(ppm);
  Serial.println(" ppm");

 // Reset all NH3 LEDs
  digitalWrite(ledMerahNH3, LOW);
  digitalWrite(letKuningNH3, LOW);
  digitalWrite(leHijauNH3, LOW);
  digitalWrite(letBiruNH3, LOW);

    // Control NH3 LEDs based on concentration ranges
  if (ppm > 100.0) {
    digitalWrite(ledMerahNH3, HIGH);  // Turn on red LED for very high concentration
  } else if (ppm > 50.0) {
    digitalWrite(letKuningNH3, HIGH);   // Turn on blue LED for high concentration
  } else if (ppm > 25.0) {
    digitalWrite(leHijauNH3, HIGH);   // Turn on green LED for medium concentration
  } else if (ppm >= 0.0) {
    digitalWrite(letBiruNH3, HIGH); // Turn on yellow LED for low concentration
  }

  // Check NH3 threshold and control buzzer
  if (ppm > NH3_THRESHOLD) {
    digitalWrite(buzzerPin, HIGH);  // Turn buzzer ON
    delay(1000);                    // Keep buzzer ON for 1 second
    digitalWrite(buzzerPin, LOW);   // Turn buzzer OFF
  }
}

bool sendDataToServer(String sensorType, float value, String unit) {
  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(ledInternetPin, HIGH);
    WiFiClientSecure client;
    HTTPClient http;

    // Set certificate CA if needed, or setInsecure() if the certificate is invalid
    // client.setCACert(root_ca); // Uncomment if you have CA certificate
    client.setInsecure(); // To ignore certificate validation (not recommended for production)

    http.begin(client, serverAddress);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", token);

    // Convert value to string with appropriate precision before serializing
    String nilaiString = String(value, 2);

    StaticJsonDocument<200> jsonDoc;
    jsonDoc["sensorType"] = sensorType;
    jsonDoc["value"] = nilaiString;
    jsonDoc["unit"] = unit;

    String jsonString;
    serializeJson(jsonDoc, jsonString);

    Serial.print("Mengirim JSON: ");
    Serial.println(jsonString);

    int httpResponseCode = http.POST(jsonString);

    bool success = (httpResponseCode > 0);
    if (success) {
      String response = http.getString();
      Serial.println("Response: " + response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
      Serial.println(http.errorToString(httpResponseCode)); // Add error description
    }

    http.end();
    return success;
  } else {
    Serial.println("WiFi Disconnected");
     digitalWrite(ledInternetPin, LOW);
  }
}

