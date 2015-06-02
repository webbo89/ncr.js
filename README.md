NCR Receipt Printer 7167
=======================

Prerequisites
-------------

1. node.js

2. npm

Execution Instruction
---------------------

1.
`npm install`

1.
`npm start`

### Endpoint:

Send to `localhost:3000/print/message` some json in the format:

```
{ "message": "I would really like this message to be printed please." }
```


To-do's
-------

* Link in NCR printer! printer.js currently prints to console only, line 61. 

* Original repo in C++ https://github.com/webbo89/ncrdriver with the following commands available:

* Raw usage on the commandline:

```
>chmod 777 /dev/ttyUSB0                     // USB0 if first usb device, USB1 if second etc etc.

>echo 'hello paper world' > /dev/ttyUSB0     // Regular text print

>echo -e "\x1b\x69" > /dev/ttyUSB0          // Hex submission (cut)

>echo -e "\x1b\x07" > /dev/ttyUSB0          // Hex submission (beep)

```