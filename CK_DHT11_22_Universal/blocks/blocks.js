(function() {
  var CK_PIN_PRESETS = {
    AUTO: [
      ['GPIO2', '2'], ['GPIO4', '4'], ['GPIO5', '5'], ['GPIO12', '12'], ['GPIO13', '13'], ['GPIO14', '14'], ['GPIO15', '15']
    ],
    AVR: [
      ['D2', '2'], ['D3', '3'], ['D4', '4'], ['D5', '5'], ['D6', '6'], ['D7', '7'], ['D8', '8'], ['D9', '9'], ['D10', '10'], ['D11', '11'], ['D12', '12'], ['D13', '13']
    ],
    ESP8266: [
      ['D1(GPIO5)', '5'], ['D2(GPIO4)', '4'], ['D5(GPIO14)', '14'], ['D6(GPIO12)', '12'], ['D7(GPIO13)', '13'], ['D8(GPIO15)', '15']
    ],
    ESP32: [
      ['GPIO2', '2'], ['GPIO4', '4'], ['GPIO5', '5'], ['GPIO12', '12'], ['GPIO13', '13'], ['GPIO14', '14'], ['GPIO15', '15'], ['GPIO16', '16'], ['GPIO17', '17'], ['GPIO18', '18'], ['GPIO19', '19'], ['GPIO21', '21'], ['GPIO22', '22'], ['GPIO23', '23'], ['GPIO25', '25'], ['GPIO26', '26'], ['GPIO27', '27'], ['GPIO32', '32'], ['GPIO33', '33']
    ]
  };

  function ckGetPinPreset(profile) {
    return CK_PIN_PRESETS[profile] || CK_PIN_PRESETS.AUTO;
  }

  function ckSyncPinField(block) {
    var pinField = block.getField('PIN');
    if (!pinField) return;
    var profile = block.getFieldValue('PROFILE') || 'AUTO';
    var options = ckGetPinPreset(profile);
    pinField.menuGenerator_ = options;
    var current = pinField.getValue();
    var ok = false;
    for (var i = 0; i < options.length; i++) {
      if (options[i][1] === current) {
        ok = true;
        break;
      }
    }
    if (!ok && options.length > 0) {
      pinField.setValue(options[0][1]);
    }
  }

  function ckAttachProfileSync(block) {
    ckSyncPinField(block);
    block.setOnChange(function(event) {
      if (!event || event.blockId !== this.id) return;
      if (event.type === Blockly.Events.BLOCK_CHANGE && event.name === 'PROFILE') {
        ckSyncPinField(this);
      }
    });
  }

  Blockly.Blocks['ck_dht_init'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('DHT初始化')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL')
        .appendField('板型')
        .appendField(new Blockly.FieldDropdown([
          ['自动', 'AUTO'], ['AVR', 'AVR'], ['ESP8266', 'ESP8266'], ['ESP32', 'ESP32']
        ]), 'PROFILE')
        .appendField('引脚')
        .appendField(new Blockly.FieldDropdown(ckGetPinPreset('AUTO')), 'PIN')
        .appendField('类型')
        .appendField(new Blockly.FieldDropdown([
          ['DHT11', 'DHT11'], ['DHT22', 'DHT22']
        ]), 'TYPE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      ckAttachProfileSync(this);
    }
  };

  Blockly.Blocks['ck_dht_temperature'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('DHT温度')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL')
        .appendField('单位')
        .appendField(new Blockly.FieldDropdown([
          ['摄氏', 'C'], ['华氏', 'F']
        ]), 'UNIT');
      this.setOutput(true, 'Number');
      this.setColour(160);
    }
  };

  Blockly.Blocks['ck_dht_humidity'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('DHT湿度')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL');
      this.setOutput(true, 'Number');
      this.setColour(160);
    }
  };

  Blockly.Blocks['ck_dht_heat_index'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('DHT体感温度')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL')
        .appendField('单位')
        .appendField(new Blockly.FieldDropdown([
          ['摄氏', 'C'], ['华氏', 'F']
        ]), 'UNIT');
      this.setOutput(true, 'Number');
      this.setColour(160);
    }
  };

  Blockly.Blocks['ck_dht_data_ok'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('DHT数据有效?')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL');
      this.setOutput(true, 'Boolean');
      this.setColour(160);
    }
  };
})();
