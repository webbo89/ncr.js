var printer = {};
var exec = require('child_process').exec;
var sys = require('sys')

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

printer.addMessage = function(message_with_lines){

    printer.addLine(this.lineOfChar("/"));
    printer.addLine(this.lineOfChar("\\"));

    var messages = message_with_lines.split("\n");
    for (var i = 0, len = messages.length; i < len; i++) {
        var message = messages[i];
        if (message != undefined) {
            while (message.length > 0) {
                printer.addLine(message.substr(0, this.page_width()-1));
                message = message.substr(this.page_width()-1);
            }
        }
    }

    printer.addLine(this.lineOfChar("/"));
    printer.addLine(this.lineOfChar("\\"));

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

printer.lineOfChar = function(char){
    var line = "";

    for( var i=0; i < printer.page_width(); i++ ) {
        line += char;
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

            child = exec("echo '" + printer.spool.shift() + "' > /dev/ttyUSB0", function (error, stdout, stderr) {
                //sys.print('stdout: ' + stdout);
                //sys.print('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        }
    }, 100);
};

printer.read_hubot = function(endpoint) {
    setInterval(function(){
    var request = require('request');
    request(endpoint + 'hubot/print/latest', function (error, response, body) {
        if (!error && response.statusCode == 200) {

            print_documents = JSON.parse(body);
            for (var i = 0, len = print_documents.length; i < len; i++) {
                printer.addMessage(print_documents.pop());
            }
        }
    })
    }, 1000);

}

module.exports = printer;
