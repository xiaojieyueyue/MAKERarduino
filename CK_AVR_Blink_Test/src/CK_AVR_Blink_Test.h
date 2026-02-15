#pragma once
#include <Arduino.h>

inline void ck_avr_pin_init(uint8_t pin) {
  pinMode(pin, OUTPUT);
}

inline void ck_avr_blink_once(uint8_t pin, unsigned long ms) {
  digitalWrite(pin, HIGH);
  delay(ms);
  digitalWrite(pin, LOW);
  delay(ms);
}
