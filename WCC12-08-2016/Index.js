var server = require("./server.js");
var EncryptMsgRequestHandler = require("./EncryptionRequestHandler.js");
var DecryptMsgRequestHandler = require("./DecryptionRequestHandler.js");
var IndexPageRequestHandler = require("./IndexPageRequestHandler.js");
var Router = require("./Router.js");

var handlerList = {};
handlerList["/"] = IndexPageRequestHandler.displayIndexPage;
handlerList["/Index.html"] = IndexPageRequestHandler.displayIndexPage;
handlerList["/encryptMessage"] = EncryptMsgRequestHandler.encryptMessage;
handlerList["/decryptMessage"] = DecryptMsgRequestHandler.decryptMessage;

server.startServer(Router.route, handlerList);