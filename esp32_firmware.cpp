#include <Arduino.h>

// ====== SENSOR PINS ======
const int sensor1Pin = 34;   // Piezo #1 (Analog)
const int sensor2Pin = 35;   // Piezo #2 (Analog)

// ====== SENSOR VALUES ======
int sensor1Value = 0;
int sensor2Value = 0;

// ====== THRESHOLDS ======
int warningLevel = 300;
int dangerLevel  = 550;

// ====== STRUCT FOR SCREEN DATA ======
struct SensorPacket {
  int s1;
  int s2;
  int level;
};

SensorPacket packet;

// ====== DETECTION FUNCTION ======
int detectLevel(int s1, int s2) {
  int maxValue = max(s1, s2);

  if (maxValue > dangerLevel) return 2;     // خطر قوي
  if (maxValue > warningLevel) return 1;    // تحذير متوسط
  return 0;                                 // طبيعي
}

// ====== SETUP ======
void setup() {
  Serial.begin(115200);

  delay(1000);
  Serial.println("ESP32 SeaFalcon STARTED");
}

// ====== LOOP ======
void loop() {

  // قراءة الحسّاسين
  sensor1Value = analogRead(sensor1Pin);
  sensor2Value = analogRead(sensor2Pin);

  // تحديد مستوى الخطر
  int level = detectLevel(sensor1Value, sensor2Value);

  // تجهيز الباكت لإرساله للشاشة
  packet.s1 = sensor1Value;
  packet.s2 = sensor2Value;
  packet.level = level;

  // إرسال البيانات كـ JSON
  Serial.print("{\"s1\":");
  Serial.print(packet.s1);
  Serial.print(",\"s2\":");
  Serial.print(packet.s2);
  Serial.print(",\"lvl\":");
  Serial.print(packet.level);
  Serial.println("}");

  delay(150);  // سرعة التحديث
}
