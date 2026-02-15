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
      ['GPIO0', '0'], ['GPIO1', '1'], ['GPIO2', '2'], ['GPIO3', '3'], ['GPIO4', '4'], ['GPIO5', '5'],
      ['GPIO6', '6'], ['GPIO7', '7'], ['GPIO8', '8'], ['GPIO9', '9'], ['GPIO10', '10'], ['GPIO11', '11'],
      ['GPIO12', '12'], ['GPIO13', '13'], ['GPIO14', '14'], ['GPIO15', '15'], ['GPIO16', '16'], ['GPIO17', '17'],
      ['GPIO18', '18'], ['GPIO19', '19'], ['GPIO20', '20'], ['GPIO21', '21'], ['GPIO22', '22'], ['GPIO23', '23'],
      ['GPIO24', '24'], ['GPIO25', '25'], ['GPIO26', '26'], ['GPIO27', '27'], ['GPIO28', '28'], ['GPIO32', '32'],
      ['GPIO33', '33'], ['GPIO34', '34'], ['GPIO35', '35'], ['GPIO36', '36'], ['GPIO37', '37'], ['GPIO38', '38'],
      ['GPIO39', '39'], ['GPIO40', '40'], ['GPIO41', '41'], ['GPIO42', '42'], ['GPIO43', '43'], ['GPIO44', '44'],
      ['GPIO45', '45'], ['GPIO46', '46'], ['GPIO47', '47'], ['GPIO48', '48']
    ]
  };

  function ckNormalizeOptions(options) {
    if (!Array.isArray(options)) return [];
    var out = [];
    for (var i = 0; i < options.length; i++) {
      var item = options[i];
      if (!Array.isArray(item) || item.length < 2) continue;
      out.push([String(item[0]), String(item[1])]);
    }
    return out;
  }

  function ckReadBoardPinsFromRuntime() {
    try {
      if (Blockly && Array.isArray(Blockly.CK_BOARD_PIN_OPTIONS) && Blockly.CK_BOARD_PIN_OPTIONS.length > 0) {
        return ckNormalizeOptions(Blockly.CK_BOARD_PIN_OPTIONS);
      }
    } catch (e) {}
    try {
      if (Blockly && Blockly.CK && Array.isArray(Blockly.CK.boardPins) && Blockly.CK.boardPins.length > 0) {
        return ckNormalizeOptions(Blockly.CK.boardPins);
      }
    } catch (e) {}
    try {
      if (typeof globalThis !== 'undefined' && Array.isArray(globalThis.CK_BOARD_PIN_OPTIONS) && globalThis.CK_BOARD_PIN_OPTIONS.length > 0) {
        return ckNormalizeOptions(globalThis.CK_BOARD_PIN_OPTIONS);
      }
    } catch (e) {}
    try {
      if (typeof window !== 'undefined' && Array.isArray(window.CK_BOARD_PIN_OPTIONS) && window.CK_BOARD_PIN_OPTIONS.length > 0) {
        return ckNormalizeOptions(window.CK_BOARD_PIN_OPTIONS);
      }
    } catch (e) {}
    return [];
  }

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

    if (
      raw.indexOf('esp8266') >= 0 ||
      raw.indexOf('nodemcu') >= 0 ||
      raw.indexOf('d1_mini') >= 0 ||
      raw.indexOf('d1mini') >= 0
    ) {
      return 'ESP8266';
    }

    if (raw.indexOf('esp32') >= 0) {
      return 'ESP32';
    }

    if (
      raw.indexOf('arduino:avr') >= 0 ||
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

  function ckResolvePinOptions() {
    var runtimePins = ckReadBoardPinsFromRuntime();
    if (runtimePins.length > 0) return runtimePins;
    return ckGetPinPreset(ckDetectProfile());
  }

  function ckSyncPinField(block) {
    var pinField = block.getField('PIN');
    if (!pinField) return;

    var options = ckResolvePinOptions();
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
        .appendField('引脚')
        .appendField(new Blockly.FieldDropdown(ckResolvePinOptions()), 'PIN')
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