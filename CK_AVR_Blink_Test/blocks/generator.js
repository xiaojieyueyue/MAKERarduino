Blockly.Arduino[''ck_avr_led_init''] = function(block) {
  var pin = block.getFieldValue(''PIN'') || ''13'';
  Blockly.Arduino.definitions_[''include_ck_avr_blink_test''] = ''#include "CK_AVR_Blink_Test.h"'';
  return ''ck_avr_pin_init((uint8_t)'' + pin + '');\n'';
};

Blockly.Arduino[''ck_avr_led_blink_once''] = function(block) {
  var pin = block.getFieldValue(''PIN'') || ''13'';
  var ms = Blockly.Arduino.valueToCode(block, ''MS'', Blockly.Arduino.ORDER_NONE) || ''200'';
  Blockly.Arduino.definitions_[''include_ck_avr_blink_test''] = ''#include "CK_AVR_Blink_Test.h"'';
  return ''ck_avr_blink_once((uint8_t)'' + pin + '', (unsigned long)('' + ms + ''));\n'';
};
