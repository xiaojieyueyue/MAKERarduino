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

  Blockly.Blocks['ck_rgb_np_init'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('RGB灯带 初始化')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL')
        .appendField('板型')
        .appendField(new Blockly.FieldDropdown([
          ['自动', 'AUTO'], ['AVR', 'AVR'], ['ESP8266', 'ESP8266'], ['ESP32', 'ESP32']
        ]), 'PROFILE')
        .appendField('引脚')
        .appendField(new Blockly.FieldDropdown(ckGetPinPreset('AUTO')), 'PIN');
      this.appendValueInput('COUNT').setCheck('Number').appendField('灯珠数');
      this.appendValueInput('BRIGHT').setCheck('Number').appendField('亮度(0-255)');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(295);
      ckAttachProfileSync(this);
    }
  };

  Blockly.Blocks['ck_rgb_np_set_pixel_rgb'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('RGB设置像素')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL');
      this.appendValueInput('INDEX').setCheck('Number').appendField('下标');
      this.appendValueInput('R').setCheck('Number').appendField('R');
      this.appendValueInput('G').setCheck('Number').appendField('G');
      this.appendValueInput('B').setCheck('Number').appendField('B');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(295);
    }
  };

  Blockly.Blocks['ck_rgb_np_set_pixel_color'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('RGB设置像素颜色')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL');
      this.appendValueInput('INDEX').setCheck('Number').appendField('下标');
      this.appendValueInput('COLOR').setCheck('Number').appendField('颜色值');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(295);
    }
  };

  Blockly.Blocks['ck_rgb_np_fill_rgb'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('RGB整条填充')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL');
      this.appendValueInput('R').setCheck('Number').appendField('R');
      this.appendValueInput('G').setCheck('Number').appendField('G');
      this.appendValueInput('B').setCheck('Number').appendField('B');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(295);
    }
  };

  Blockly.Blocks['ck_rgb_np_set_brightness'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('RGB设置亮度')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL');
      this.appendValueInput('BRIGHT').setCheck('Number').appendField('亮度(0-255)');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(295);
    }
  };

  Blockly.Blocks['ck_rgb_np_clear'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('RGB清空')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(295);
    }
  };

  Blockly.Blocks['ck_rgb_np_rainbow'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('RGB彩虹帧')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL');
      this.appendValueInput('OFFSET').setCheck('Number').appendField('偏移');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(295);
    }
  };

  Blockly.Blocks['ck_rgb_np_show'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('RGB显示刷新')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(295);
    }
  };

  Blockly.Blocks['ck_rgb_np_color'] = {
    init: function() {
      this.appendValueInput('R').setCheck('Number').appendField('RGB颜色 R');
      this.appendValueInput('G').setCheck('Number').appendField('G');
      this.appendValueInput('B').setCheck('Number').appendField('B');
      this.setOutput(true, 'Number');
      this.setColour(295);
    }
  };
})();
