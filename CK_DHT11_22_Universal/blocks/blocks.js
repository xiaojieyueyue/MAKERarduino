(function() {
  var CK_PIN_PRESETS = {
    AVR: [
      ['D2', '2'], ['D3', '3'], ['D4', '4'], ['D5', '5'], ['D6', '6'], ['D7', '7'],
      ['D8', '8'], ['D9', '9'], ['D10', '10'], ['D11', '11'], ['D12', '12'], ['D13', '13']
    ],
    ESP8266: [
      ['D1(GPIO5)', '5'], ['D2(GPIO4)', '4'], ['D5(GPIO14)', '14'],
      ['D6(GPIO12)', '12'], ['D7(GPIO13)', '13'], ['D8(GPIO15)', '15']
    ],
    ESP32: [
      ['GPIO2', '2'], ['GPIO4', '4'], ['GPIO5', '5'], ['GPIO12', '12'], ['GPIO13', '13'],
      ['GPIO14', '14'], ['GPIO15', '15'], ['GPIO16', '16'], ['GPIO17', '17'], ['GPIO18', '18'],
      ['GPIO19', '19'], ['GPIO21', '21'], ['GPIO22', '22'], ['GPIO23', '23'], ['GPIO25', '25'],
      ['GPIO26', '26'], ['GPIO27', '27'], ['GPIO32', '32'], ['GPIO33', '33']
    ]
  };

  function ckReadActiveBoard() {
    var candidates = [];
    try {
      if (Blockly && typeof Blockly.CK_ACTIVE_BOARD === 'string') candidates.push(Blockly.CK_ACTIVE_BOARD);
    } catch (e) {}
    try {
      if (Blockly && Blockly.CK && typeof Blockly.CK.activeBoard === 'string') candidates.push(Blockly.CK.activeBoard);
    } catch (e) {}
    try {
      if (typeof globalThis !== 'undefined' && typeof globalThis.CK_ACTIVE_BOARD === 'string') candidates.push(globalThis.CK_ACTIVE_BOARD);
    } catch (e) {}
    try {
      if (typeof window !== 'undefined' && typeof window.CK_ACTIVE_BOARD === 'string') candidates.push(window.CK_ACTIVE_BOARD);
    } catch (e) {}

    for (var i = 0; i < candidates.length; i++) {
      var token = String(candidates[i] || '').trim();
      if (token) return token;
    }
    return '';
  }

  function ckDetectProfile() {
    var raw = String(ckReadActiveBoard() || '').toLowerCase();
    if (!raw) return 'AVR';

    var fqbnParts = raw.split(':');
    var arch = fqbnParts.length >= 2 ? fqbnParts[1] : raw;
    var boardToken = fqbnParts.length >= 3 ? fqbnParts[2] : raw;

    if (
      raw.indexOf('esp8266') >= 0 ||
      arch.indexOf('esp8266') >= 0 ||
      boardToken.indexOf('esp8266') >= 0 ||
      raw.indexOf('nodemcu') >= 0 ||
      raw.indexOf('d1_mini') >= 0 ||
      raw.indexOf('d1mini') >= 0
    ) {
      return 'ESP8266';
    }

    if (
      raw.indexOf('esp32') >= 0 ||
      arch.indexOf('esp32') >= 0 ||
      boardToken.indexOf('esp32') >= 0
    ) {
      return 'ESP32';
    }

    if (
      raw.indexOf('arduino:avr') >= 0 ||
      arch === 'avr' ||
      raw.indexOf('avr') >= 0 ||
      raw.indexOf('atmega') >= 0 ||
      raw.indexOf('uno') >= 0 ||
      raw.indexOf('nano') >= 0 ||
      raw.indexOf('mega') >= 0
    ) {
      return 'AVR';
    }

    return 'AVR';
  }

  function ckGetPinPreset(profile) {
    return CK_PIN_PRESETS[profile] || CK_PIN_PRESETS.AVR;
  }

  function ckSyncPinField(block) {
    var pinField = block.getField('PIN');
    if (!pinField) return;

    var options = ckGetPinPreset(ckDetectProfile());
    pinField.menuGenerator_ = options;

    var current = pinField.getValue();
    var valid = false;
    for (var i = 0; i < options.length; i++) {
      if (options[i][1] === current) {
        valid = true;
        break;
      }
    }
    if (!valid && options.length > 0) pinField.setValue(options[0][1]);
  }

  function ckAttachAutoPinSync(block) {
    ckSyncPinField(block);
    block.setOnChange(function() {
      ckSyncPinField(this);
    });
  }

  Blockly.Blocks['ck_dht_init'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('DHT 初始化')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL')
        .appendField('板卡自动识别')
        .appendField('引脚')
        .appendField(new Blockly.FieldDropdown(ckGetPinPreset('AVR')), 'PIN')
        .appendField('型号')
        .appendField(new Blockly.FieldDropdown([
          ['DHT11', 'DHT11'], ['DHT22', 'DHT22']
        ]), 'TYPE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      ckAttachAutoPinSync(this);
    }
  };

  Blockly.Blocks['ck_dht_temperature'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('读取温度')
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
        .appendField('读取湿度')
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
        .appendField('体感温度')
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
        .appendField('数据有效?')
        .appendField('通道')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']
        ]), 'CHANNEL');
      this.setOutput(true, 'Boolean');
      this.setColour(160);
    }
  };
})();