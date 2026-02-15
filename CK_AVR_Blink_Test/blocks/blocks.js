Blockly.Blocks[''ck_avr_led_init''] = {
  init: function() {
    this.appendDummyInput()
      .appendField(''AVR LED init pin'')
      .appendField(new Blockly.FieldDropdown([
        [''13'', ''13''],
        [''12'', ''12''],
        [''11'', ''11''],
        [''10'', ''10'']
      ]), ''PIN'');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
  }
};

Blockly.Blocks[''ck_avr_led_blink_once''] = {
  init: function() {
    this.appendDummyInput()
      .appendField(''AVR blink pin'')
      .appendField(new Blockly.FieldDropdown([
        [''13'', ''13''],
        [''12'', ''12''],
        [''11'', ''11''],
        [''10'', ''10'']
      ]), ''PIN'');
    this.appendValueInput(''MS'').setCheck(''Number'').appendField(''delay ms'');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
  }
};
