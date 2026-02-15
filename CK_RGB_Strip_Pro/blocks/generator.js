function ck_rgb_channel(block) {
  var ch = parseInt(block.getFieldValue('CHANNEL') || '1', 10);
  if (!(ch >= 1 && ch <= 4)) ch = 1;
  return String(ch);
}

function ck_rgb_value(block, name, fallback) {
  return Blockly.Arduino.valueToCode(block, name, Blockly.Arduino.ORDER_ATOMIC) || fallback;
}

function ck_rgb_ensure_runtime(channel) {
  var stripVar = 'ck_rgb_strip_' + channel;
  Blockly.Arduino.definitions_['include_ck_rgb_strip_pro'] = '#include <CK_RGB_Strip_Pro.h>';
  Blockly.Arduino.definitions_['decl_' + stripVar] = 'Adafruit_NeoPixel* ' + stripVar + ' = nullptr;';
  Blockly.Arduino.definitions_['decl_' + stripVar + '_count'] = 'uint16_t ' + stripVar + '_count = 0;';

  Blockly.Arduino.definitions_['helper_ck_rgb_u8'] = [
    'static uint8_t ck_rgb_u8(int v) {',
    '  if (v < 0) return 0;',
    '  if (v > 255) return 255;',
    '  return (uint8_t)v;',
    '}'
  ].join('\n');

  Blockly.Arduino.definitions_['helper_ck_rgb_pack'] = [
    'static uint32_t ck_rgb_pack_color(int r, int g, int b) {',
    '  return ((uint32_t)ck_rgb_u8(r) << 16) | ((uint32_t)ck_rgb_u8(g) << 8) | (uint32_t)ck_rgb_u8(b);',
    '}'
  ].join('\n');

  Blockly.Arduino.definitions_['helper_ck_rgb_wheel'] = [
    'static uint32_t ck_rgb_wheel(Adafruit_NeoPixel* strip, uint8_t pos) {',
    '  pos = 255 - pos;',
    '  if (pos < 85) {',
    '    return strip->Color(255 - pos * 3, 0, pos * 3);',
    '  }',
    '  if (pos < 170) {',
    '    pos -= 85;',
    '    return strip->Color(0, pos * 3, 255 - pos * 3);',
    '  }',
    '  pos -= 170;',
    '  return strip->Color(pos * 3, 255 - pos * 3, 0);',
    '}'
  ].join('\n');

  return stripVar;
}

Blockly.Arduino['ck_rgb_np_init'] = function(block) {
  var ch = ck_rgb_channel(block);
  var stripVar = ck_rgb_ensure_runtime(ch);
  var pin = block.getFieldValue('PIN') || '2';
  var count = ck_rgb_value(block, 'COUNT', '8');
  var bright = ck_rgb_value(block, 'BRIGHT', '80');
  var countExpr = '((int)(' + count + ') < 1 ? 1 : (int)(' + count + '))';

  var code = '';
  code += 'if (' + stripVar + ' != nullptr) { delete ' + stripVar + '; ' + stripVar + ' = nullptr; }\n';
  code += stripVar + ' = new Adafruit_NeoPixel((uint16_t)(' + countExpr + '), (uint8_t)(' + pin + '), NEO_GRB + NEO_KHZ800);\n';
  code += stripVar + '->begin();\n';
  code += stripVar + '->setBrightness(ck_rgb_u8((int)(' + bright + ')));\n';
  code += stripVar + '->clear();\n';
  code += stripVar + '->show();\n';
  code += stripVar + '_count = (uint16_t)(' + countExpr + ');\n';
  return code;
};

Blockly.Arduino['ck_rgb_np_set_pixel_rgb'] = function(block) {
  var ch = ck_rgb_channel(block);
  var stripVar = ck_rgb_ensure_runtime(ch);
  var index = ck_rgb_value(block, 'INDEX', '0');
  var r = ck_rgb_value(block, 'R', '0');
  var g = ck_rgb_value(block, 'G', '0');
  var b = ck_rgb_value(block, 'B', '0');
  var idxVar = 'ck_rgb_idx_' + ch;

  var code = '';
  code += 'if (' + stripVar + ' != nullptr) {\n';
  code += '  int ' + idxVar + ' = (int)(' + index + ');\n';
  code += '  if (' + idxVar + ' >= 0 && (uint16_t)(' + idxVar + ') < ' + stripVar + '_count) {\n';
  code += '    ' + stripVar + '->setPixelColor((uint16_t)(' + idxVar + '), ' + stripVar + '->Color(ck_rgb_u8((int)(' + r + ')), ck_rgb_u8((int)(' + g + ')), ck_rgb_u8((int)(' + b + '))));\n';
  code += '  }\n';
  code += '}\n';
  return code;
};

Blockly.Arduino['ck_rgb_np_set_pixel_color'] = function(block) {
  var ch = ck_rgb_channel(block);
  var stripVar = ck_rgb_ensure_runtime(ch);
  var index = ck_rgb_value(block, 'INDEX', '0');
  var color = ck_rgb_value(block, 'COLOR', '0');
  var idxVar = 'ck_rgb_idx_color_' + ch;

  var code = '';
  code += 'if (' + stripVar + ' != nullptr) {\n';
  code += '  int ' + idxVar + ' = (int)(' + index + ');\n';
  code += '  if (' + idxVar + ' >= 0 && (uint16_t)(' + idxVar + ') < ' + stripVar + '_count) {\n';
  code += '    ' + stripVar + '->setPixelColor((uint16_t)(' + idxVar + '), (uint32_t)(' + color + '));\n';
  code += '  }\n';
  code += '}\n';
  return code;
};

Blockly.Arduino['ck_rgb_np_fill_rgb'] = function(block) {
  var ch = ck_rgb_channel(block);
  var stripVar = ck_rgb_ensure_runtime(ch);
  var r = ck_rgb_value(block, 'R', '0');
  var g = ck_rgb_value(block, 'G', '0');
  var b = ck_rgb_value(block, 'B', '0');
  var iVar = 'ck_rgb_i_fill_' + ch;

  var code = '';
  code += 'if (' + stripVar + ' != nullptr) {\n';
  code += '  for (uint16_t ' + iVar + ' = 0; ' + iVar + ' < ' + stripVar + '_count; ++' + iVar + ') {\n';
  code += '    ' + stripVar + '->setPixelColor(' + iVar + ', ' + stripVar + '->Color(ck_rgb_u8((int)(' + r + ')), ck_rgb_u8((int)(' + g + ')), ck_rgb_u8((int)(' + b + '))));\n';
  code += '  }\n';
  code += '}\n';
  return code;
};

Blockly.Arduino['ck_rgb_np_set_brightness'] = function(block) {
  var ch = ck_rgb_channel(block);
  var stripVar = ck_rgb_ensure_runtime(ch);
  var bright = ck_rgb_value(block, 'BRIGHT', '80');
  return 'if (' + stripVar + ' != nullptr) { ' + stripVar + '->setBrightness(ck_rgb_u8((int)(' + bright + '))); }\n';
};

Blockly.Arduino['ck_rgb_np_clear'] = function(block) {
  var ch = ck_rgb_channel(block);
  var stripVar = ck_rgb_ensure_runtime(ch);
  return 'if (' + stripVar + ' != nullptr) { ' + stripVar + '->clear(); }\n';
};

Blockly.Arduino['ck_rgb_np_rainbow'] = function(block) {
  var ch = ck_rgb_channel(block);
  var stripVar = ck_rgb_ensure_runtime(ch);
  var offset = ck_rgb_value(block, 'OFFSET', '0');
  var iVar = 'ck_rgb_i_rainbow_' + ch;
  var offVar = 'ck_rgb_off_' + ch;

  var code = '';
  code += 'if (' + stripVar + ' != nullptr && ' + stripVar + '_count > 0) {\n';
  code += '  int ' + offVar + ' = (int)(' + offset + ');\n';
  code += '  for (uint16_t ' + iVar + ' = 0; ' + iVar + ' < ' + stripVar + '_count; ++' + iVar + ') {\n';
  code += '    uint8_t pos = (uint8_t)((((uint32_t)' + iVar + ' * 256UL / ' + stripVar + '_count) + (uint32_t)' + offVar + ') & 0xFF);\n';
  code += '    ' + stripVar + '->setPixelColor(' + iVar + ', ck_rgb_wheel(' + stripVar + ', pos));\n';
  code += '  }\n';
  code += '}\n';
  return code;
};

Blockly.Arduino['ck_rgb_np_show'] = function(block) {
  var ch = ck_rgb_channel(block);
  var stripVar = ck_rgb_ensure_runtime(ch);
  return 'if (' + stripVar + ' != nullptr) { ' + stripVar + '->show(); }\n';
};

Blockly.Arduino['ck_rgb_np_color'] = function(block) {
  ck_rgb_ensure_runtime('1');
  var r = ck_rgb_value(block, 'R', '0');
  var g = ck_rgb_value(block, 'G', '0');
  var b = ck_rgb_value(block, 'B', '0');
  var code = 'ck_rgb_pack_color((int)(' + r + '), (int)(' + g + '), (int)(' + b + '))';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
