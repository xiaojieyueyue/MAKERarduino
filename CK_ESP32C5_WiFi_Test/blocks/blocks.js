Blockly.Blocks['ck_esp32c5_wifi_connect'] = {
  init: function() {
    this.appendValueInput('SSID').setCheck(null).appendField('ESP32 WiFi SSID');
    this.appendValueInput('PASS').setCheck(null).appendField('Password');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(215);
  }
};

Blockly.Blocks['ck_esp32c5_wifi_connected'] = {
  init: function() {
    this.appendDummyInput().appendField('ESP32 WiFi connected?');
    this.setOutput(true, 'Boolean');
    this.setColour(215);
  }
};

Blockly.Blocks['ck_esp32c5_wifi_ip'] = {
  init: function() {
    this.appendDummyInput().appendField('ESP32 local IP');
    this.setOutput(true, 'String');
    this.setColour(215);
  }
};
