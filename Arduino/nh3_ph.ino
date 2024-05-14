#include <ESP8266WiFi.h>
#include <MQUnifiedsensor.h>
#include <ArduinoJson.h> // Library untuk memformat data ke format JSON
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "Sat";
const char* password = "12345679";
const char* serverAddress = "192.168.149.99";
const int serverPort = 80;

#define placa "ESP8266WiFi"
#define Voltage_Resolution 5
#define pin_NH3 A0
#define type_NH3 "MQ-135"
// #define pin_pH A1
#define pin_pH 17
#define type_pH "PH"
#define ADC_Bit_Resolution 10
#define RatioMQ135CleanAir 3.6

MQUnifiedsensor MQ135(placa, Voltage_Resolution, ADC_Bit_Resolution, pin_NH3, type_NH3);
MQUnifiedsensor pH(placa, Voltage_Resolution, ADC_Bit_Resolution, pin_pH, type_pH);

void setup() {
  Serial.begin(9600);
  delay(100);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("Conneted yo ....");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  MQ135.setRegressionMethod(1);
  MQ135.init();

  pH.setRegressionMethod(1);
  pH.init();

  // Kalibrasi otomatis pH
  autoCalibratepH();

  // Kalibrasi NH3
  calibrateNH3();
}

void loop() {
  MQ135.update();
  MQ135.setA(102.2);
  MQ135.setB(-2.473);
  pH.update();
  
  float NH3_value = MQ135.readSensor();
  float pH_value = pH.readSensor();

  // Menampilkan data hasil deteksi di Serial Monitor
  Serial.print("NH3: ");
  Serial.println(NH3_value);
  Serial.print("pH: ");
  Serial.println(pH_value);

  // Membuat objek JSON untuk data sensor NH3
  if (!isnan(NH3_value)) {
    String NH3_jsonString = createSensorData("NH3", NH3_value);
    kirimDataKeServer(NH3_jsonString);
  }

  // Membuat objek JSON untuk data sensor pH
  if (!isnan(pH_value)) {
    String pH_jsonString = createSensorData("PH", pH_value);
    kirimDataKeServer(pH_jsonString);
  }

  delay(5000); // Kirim data setiap 5 detik
}

String createSensorData(String sensorType, float value) {
  DynamicJsonDocument doc(200);
  doc["sensorType"] = sensorType;
  doc["value"] = value;
  doc["unit"] = (sensorType == "NH3") ? "PPM" : "pH";

  String jsonString;
  serializeJson(doc, jsonString);
  return jsonString;
}

void kirimDataKeServer(String data) {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;

    HTTPClient http;
    http.begin(client, "http://" + String(serverAddress) + ":" + String(serverPort) + "/v1/api/postData");
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(data);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);
      Serial.println("Data sent to server: " + data);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
}

void autoCalibratepH() {
  Serial.println("Starting Auto pH Calibration...");
  
  Serial.println("Please put the pH sensor in pH 7 buffer solution...");
  delay(5000);

  float pH_7_buffer_voltage = 0;
  for (int i = 0; i < 10; i++) {
    pH.update();
    pH_7_buffer_voltage += pH.getVoltage(); // Fixed
    delay(1000);
  }
  pH_7_buffer_voltage /= 10;

  Serial.print("pH 7 buffer voltage: ");
  Serial.println(pH_7_buffer_voltage);

  Serial.println("Please put the pH sensor in pH 4 buffer solution...");
  delay(5000);

  float pH_4_buffer_voltage = 0;
  for (int i = 0; i < 10; i++) {
    pH.update();
    pH_4_buffer_voltage += pH.getVoltage(); // Fixed
    delay(1000);
  }
  pH_4_buffer_voltage /= 10;

  Serial.print("pH 4 buffer voltage: ");
  Serial.println(pH_4_buffer_voltage);

  Serial.println("Please put the pH sensor in pH 10 buffer solution...");
  delay(5000);

  float pH_10_buffer_voltage = 0;
  for (int i = 0; i < 10; i++) {
    pH.update();
    pH_10_buffer_voltage += pH.getVoltage(); // Fixed
    delay(1000);
  }
  pH_10_buffer_voltage /= 10;

  Serial.print("pH 10 buffer voltage: ");
  Serial.println(pH_10_buffer_voltage);

  float m_4 = ((4.0 - 7.0) / (pH_4_buffer_voltage - pH_7_buffer_voltage));
  float b_4 = 4.0 - (m_4 * pH_4_buffer_voltage);
  float m_10 = ((10.0 - 7.0) / (pH_10_buffer_voltage - pH_7_buffer_voltage));
  float b_10 = 10.0 - (m_10 * pH_10_buffer_voltage);

  pH.setRegressionMethod(1); // Fixed
  pH.setA(m_4); // Fixed
  pH.setB(b_4); // Fixed
  pH.setA(m_10); // Set nilai miring untuk kalibrasi pH 10
  pH.setB(b_10); // Set nilai offset untuk kalibrasi pH 10

  Serial.println("Auto pH Calibration Completed!");
}


void calibrateNH3() {
  Serial.println("Starting NH3 Calibration...");

  float calcR0 = 0;
  for (int i = 1; i <= 10; i++) {
    MQ135.update();
    calcR0 += MQ135.calibrate(RatioMQ135CleanAir);
  }
  MQ135.setR0(calcR0 / 10);

  if (isinf(calcR0)) {
    Serial.println("Warning: Connection issue, R0 is infinite (Open circuit detected) please check your wiring and supply");
    while (1);
  }
  if (calcR0 == 0) {
    Serial.println("Warning: Connection issue found, R0 is zero (Analog pin shorts to ground) please check your wiring and supply");
    while (1);
  }
}
