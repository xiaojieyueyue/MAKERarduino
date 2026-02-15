#pragma once
#include <Arduino.h>
#include <WiFi.h>

inline void ck_esp32c5_wifi_begin(const String& ssid, const String& pass) {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), pass.c_str());
}

inline bool ck_esp32c5_wifi_connected() {
  return WiFi.status() == WL_CONNECTED;
}

inline String ck_esp32c5_wifi_local_ip() {
  return WiFi.localIP().toString();
}
