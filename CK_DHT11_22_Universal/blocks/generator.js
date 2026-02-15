function ck_dht_channel(block) {
  var ch = parseInt(block.getFieldValue('CHANNEL') || '1', 10);
  if (!(ch >= 1 && ch <= 4)) ch = 1;
  return String(ch);
}

function ck_dht_ensure_runtime(channel) {
  var ptr = 'ck_dht_sensor_' + channel;
  Blockly.Arduino.definitions_['include_ck_dht_universal'] = '#include <CK_DHT11_22_Universal.h>';
  Blockly.Arduino.definitions_['decl_' + ptr] = 'DHT* ' + ptr + ' = nullptr;';
  return ptr;
}

Blockly.Arduino['ck_dht_init'] = function(block) {
  var ch = ck_dht_channel(block);
  var ptr = ck_dht_ensure_runtime(ch);
  var pin = block.getFieldValue('PIN') || '2';
  var type = block.getFieldValue('TYPE') || 'DHT11';

  var code = '';
  code += 'if (' + ptr + ' != nullptr) { delete ' + ptr + '; ' + ptr + ' = nullptr; }\n';
  code += ptr + ' = new DHT((uint8_t)(' + pin + '), ' + type + ');\n';
  code += ptr + '->begin();\n';
  return code;
};

Blockly.Arduino['ck_dht_temperature'] = function(block) {
  var ch = ck_dht_channel(block);
  var ptr = ck_dht_ensure_runtime(ch);
  var useF = block.getFieldValue('UNIT') === 'F' ? 'true' : 'false';
  var code = '(' + ptr + ' ? ' + ptr + '->readTemperature(' + useF + ') : NAN)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['ck_dht_humidity'] = function(block) {
  var ch = ck_dht_channel(block);
  var ptr = ck_dht_ensure_runtime(ch);
  var code = '(' + ptr + ' ? ' + ptr + '->readHumidity() : NAN)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['ck_dht_heat_index'] = function(block) {
  var ch = ck_dht_channel(block);
  var ptr = ck_dht_ensure_runtime(ch);
  var useF = block.getFieldValue('UNIT') === 'F' ? 'true' : 'false';
  var code = '(' + ptr + ' ? ' + ptr + '->computeHeatIndex(' + ptr + '->readTemperature(' + useF + '), ' + ptr + '->readHumidity(), ' + useF + ') : NAN)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['ck_dht_data_ok'] = function(block) {
  var ch = ck_dht_channel(block);
  var ptr = ck_dht_ensure_runtime(ch);
  var code = '(' + ptr + ' ? (!isnan(' + ptr + '->readHumidity()) && !isnan(' + ptr + '->readTemperature(false))) : false)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
