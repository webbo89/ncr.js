var printer = {};

printer.counter = 0;

printer.spool = [];

printer.settings = {
    paper: 'narrow',
    paper_narrow: 23,
    paper_wide: 43
};

printer.write = function() {
    this.counter++
    console.log('write');
    console.log(this.counter);
};

printer.addMessage = function(message){

    printer.addLine(this.prettyLine());

    while (message.length > 0) {
        printer.addLine(message.substr(0, this.page_width()-1));
        message = message.substr(this.page_width()-1);
    }

    printer.addLine(this.prettyLine());

};

printer.addLine = function(line) {
    printer.spool.push(line);
};

printer.start = function() {
    this.counter = 100;
};

printer.prettyLine = function(){
    var line = "";

    for( var i=0; i < printer.page_width(); i++ ) {
        line += "#";
    }
    return line;

};

printer.page_width = function() {
    if (this.settings.paper == 'narrow') {
        return this.settings.paper_narrow;
    } else {
        return this.settings.paper_wide;
    }
};

printer.run = function(){
    setInterval(function(){
        if (printer.spool.length > 0) {
            console.log(printer.spool.shift());
        }
    }, 100);
};

module.exports = printer;
