function encryptMessage(postData, res) {

    var message = postData.message;
    var msgAfterRemovingSpaces = []
    var timer = new Date();
    var ecncryptedTextObject = {};

    ecncryptedTextObject.startTime = timer.getHours() + ":" + timer.getMinutes() + ":" + timer.getSeconds() + ":" + timer.getMilliseconds();
    //validating length of characters in text without spaces is done from client side
    var numsp = "numsp";
    for (i = 0; i < message.length; i++) {
        if (message.charCodeAt(i) != 32) {
            msgAfterRemovingSpaces.push(message[i]);
        }
        else {
            numsp += " " + (msgAfterRemovingSpaces.length + 1);
        }
    }
    
    var virtualArraySize = getVirtualMatrixSize(msgAfterRemovingSpaces.length);
      
    var ecncryptedText = "";

    for (i = 0; i < virtualArraySize.columnSize; i++) {
        for (j = 0; (j < virtualArraySize.rowSize && (i + (virtualArraySize.columnSize * j) < msgAfterRemovingSpaces.length)); j++) {
            ecncryptedText = ecncryptedText + msgAfterRemovingSpaces[i + (virtualArraySize.columnSize * j)];
        }
        ecncryptedText = ecncryptedText + " ";
    }
    

    ecncryptedTextObject.numsp = numsp;
    ecncryptedTextObject.virtualArraySize = virtualArraySize;
    ecncryptedTextObject.originalText = message;
    ecncryptedTextObject.encryptedText = ecncryptedText;
    ecncryptedTextObject.finalEncryptedText = ecncryptedText + numsp;
    timer = new Date();
    ecncryptedTextObject.endTime = timer.getHours() + ":" + timer.getMinutes() + ":" + timer.getSeconds() + ":" + timer.getMilliseconds();
    
    res.writeHead(200, "{Content-Text : application/json}");
    res.write(JSON.stringify(ecncryptedTextObject));
    res.end();
}

var getVirtualMatrixSize = function (noOfCharsInMessage)
{
    var rowSize = Math.floor(Math.sqrt(noOfCharsInMessage));
    var columnSize = Math.ceil(Math.sqrt(noOfCharsInMessage));
    return {rowSize: rowSize, columnSize : columnSize};
}



exports.encryptMessage = encryptMessage;