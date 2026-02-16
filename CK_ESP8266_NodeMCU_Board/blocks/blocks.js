Blockly.Blocks['ck_esp8266_gpio_mode'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ESP8266 引脚模式')
      .appendField(new Blockly.FieldDropdown([
        ['LED_BUILTIN', 'LED_BUILTIN'],
        ['D0', 'D0'],
        ['D1', 'D1'],
        ['D2', 'D2'],
        ['D3', 'D3'],
        ['D4', 'D4'],
        ['D5', 'D5'],
        ['D6', 'D6'],
        ['D7', 'D7'],
        ['D8', 'D8']
      ]), 'PIN')
      .appendField('设置为')
      .appendField(new Blockly.FieldDropdown([
        ['输出', 'OUTPUT'],
        ['输入', 'INPUT'],
        ['上拉输入', 'INPUT_PULLUP']
      ]), 'MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
  }
};

Blockly.Blocks['ck_esp8266_gpio_write'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ESP8266 数字输出')
      .appendField(new Blockly.FieldDropdown([
        ['LED_BUILTIN', 'LED_BUILTIN'],
        ['D0', 'D0'],
        ['D1', 'D1'],
        ['D2', 'D2'],
        ['D3', 'D3'],
        ['D4', 'D4'],
        ['D5', 'D5'],
        ['D6', 'D6'],
        ['D7', 'D7'],
        ['D8', 'D8']
      ]), 'PIN')
      .appendField('电平')
      .appendField(new Blockly.FieldDropdown([
        ['高', 'HIGH'],
        ['低', 'LOW']
      ]), 'LEVEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
  }
};
