Blockly.Arduino['ck_esp8266_gpio_mode'] = function (block) {
  var pin = block.getFieldValue('PIN') || 'LED_BUILTIN';
  var mode = block.getFieldValue('MODE') || 'OUTPUT';
  return 'pinMode(' + pin + ', ' + mode + ');\n';
};

Blockly.Arduino['ck_esp8266_gpio_write'] = function (block) {
  var pin = block.getFieldValue('PIN') || 'LED_BUILTIN';
  var level = block.getFieldValue('LEVEL') || 'HIGH';
  return 'digitalWrite(' + pin + ', ' + level + ');\n';
};
