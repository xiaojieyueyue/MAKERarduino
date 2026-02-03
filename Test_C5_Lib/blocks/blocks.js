Blockly.Blocks['test_c5_hello'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("C5 Hello World");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Prints Hello from C5 Library");
        this.setHelpUrl("");
    }
};
