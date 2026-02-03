// CK 测试积木库 - 代码生成器
// 定义每个积木转换成什么 Arduino 代码

Blockly.Arduino['ck_test_hello'] = function (block) {
    return 'Serial.println("你好，CK!");\n';
};

Blockly.Arduino['ck_test_led_blink'] = function (block) {
    var times = block.getFieldValue('TIMES');
    var code = '';
    code += 'for (int _i = 0; _i < ' + times + '; _i++) {\n';
    code += '  digitalWrite(LED_BUILTIN, HIGH);\n';
    code += '  delay(500);\n';
    code += '  digitalWrite(LED_BUILTIN, LOW);\n';
    code += '  delay(500);\n';
    code += '}\n';
    return code;
};

Blockly.Arduino['ck_test_print_message'] = function (block) {
    var msg = block.getFieldValue('MSG');
    return 'Serial.println("' + msg + '");\n';
};
