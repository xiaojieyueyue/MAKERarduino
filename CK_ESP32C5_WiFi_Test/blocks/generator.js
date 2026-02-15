Blockly.Arduino[''ck_esp32c5_wifi_connect''] = function(block) {
  var ssid = Blockly.Arduino.valueToCode(block, ''SSID'', Blockly.Arduino.ORDER_NONE) || ''""'';
  var pass = Blockly.Arduino.valueToCode(block, ''PASS'', Blockly.Arduino.ORDER_NONE) || ''""'';
  Blockly.Arduino.definitions_[''include_ck_esp32c5_wifi_test''] = ''#include "CK_ESP32C5_WiFi_Test.h"'';
  return ''ck_esp32c5_wifi_begin(String('' + ssid + ''), String('' + pass + ''));\n'';
};

Blockly.Arduino[''ck_esp32c5_wifi_connected''] = function(block) {
  Blockly.Arduino.definitions_[''include_ck_esp32c5_wifi_test''] = ''#include "CK_ESP32C5_WiFi_Test.h"'';
  return [''ck_esp32c5_wifi_connected()'', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino[''ck_esp32c5_wifi_ip''] = function(block) {
  Blockly.Arduino.definitions_[''include_ck_esp32c5_wifi_test''] = ''#include "CK_ESP32C5_WiFi_Test.h"'';
  return [''ck_esp32c5_wifi_local_ip()'', Blockly.Arduino.ORDER_ATOMIC];
};
