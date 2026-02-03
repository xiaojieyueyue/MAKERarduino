// CK 测试积木库 - 积木定义
// 这些积木会显示在侧边栏的 "CK 测试积木库" 分类下

Blockly.Blocks['ck_test_hello'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("🎉 你好，CK!");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("这是一个测试积木");
    }
};

Blockly.Blocks['ck_test_led_blink'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("💡 闪烁LED")
            .appendField(new Blockly.FieldNumber(3, 1, 100), "TIMES")
            .appendField("次");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("让LED闪烁指定次数");
    }
};

Blockly.Blocks['ck_test_print_message'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("📢 打印消息")
            .appendField(new Blockly.FieldTextInput("Hello CK!"), "MSG");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("在串口打印自定义消息");
    }
};
