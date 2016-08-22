function decryptMessage(postData, res) {
    var message = postData.message;   
    var msgAfterRemovingSpaces = "";
    var spacePositions = [];
    var number = -1;
    var foundNmsp = false;
    var numsp = "";
    var decryptedTextObject = {};
    var timer = new Date();
    var decryptMessageArray = [];
    var decryptMessageRow = [];
    
    decryptedTextObject.startTime = timer.getHours() + ":" + timer.getMinutes() + ":" + timer.getSeconds() + ":" + timer.getMilliseconds();
    //validate if text enterd for decryption is valid.
    //  Check if text contains atleast one "numsp" 
    //  Last numsp always should follow by numbers or spaces.

    for (i = message.length - 1; i >= 0 ; i--) {

        if (message[i] != " ") {
            
            if (foundNmsp) {
                decryptMessageRow.push(message[i]);
            }
            else if (!foundNmsp) {
                if ((message[i] >= 0 && message[i] <= 9)) {
                    if (number < 0) {
                        number = message[i];
                    }
                    else {
                        number = message[i] + number * getMultiplier(number);     //For dealing with more than one digit number after numsp
                    }
                }
                else if (numsp.length < "psmun".length) {
                    numsp = numsp + message[i];
                    if (numsp == "psmun") {
                        foundNmsp = true;
                    }
                }
                else {                                                        //Returning error message if given message for decryption is invalid
                    timer = Date.now();
                    decryptedTextObject.endTime = timer.getHours() + ":" + timer.getMinutes() + ":" + timer.getSeconds() + ":" + timer.getMilliseconds();
                    res.writeHead(200, "{Content-Text : plain/Text}");
                    decryptedTextObject.errorMessage = "Given Input for Decryption is not valid";
                    res.write(JSON.stringify(decryptedTextObject));
                    res.end();
                    return;
                }
            }
        }
        else {
            if (number > -1) {
                spacePositions.push(number);
                number = -1;
            }
            if (foundNmsp && decryptMessageRow.length > 0) {
                decryptMessageArray.push(decryptMessageRow);
                decryptMessageRow = [];
            }
        }
    }
    if (decryptMessageRow.length > 0) {
        decryptMessageArray.push(decryptMessageRow);
        decryptMessageRow = [];
    }
    
    if (decryptMessageArray.length * decryptMessageArray[decryptMessageArray.length - 1].length > 81) {
        timer = new Date();
        decryptedTextObject.endTime = timer.getHours() + ":" + timer.getMinutes() + ":" + timer.getSeconds() + ":" + timer.getMilliseconds();
        res.writeHead(200, "{Content-Text : plain/Text}");
        decryptedTextObject.errorMessage = "Given Input Length for Decryption is not valid";
        res.write(JSON.stringify(decryptedTextObject));
        res.end();
        return;
    }
    
    
    var decryptedText = "";
    var parsedMessageLength = 0;
    var spacePosition = spacePositions.pop();
    
    for (j = decryptMessageArray[decryptMessageArray.length - 1].length - 1; j >= 0; j--) {
        for (i = decryptMessageArray.length - 1; i >= 0; i--) {
            var k = decryptMessageArray[decryptMessageArray.length - 1].length - decryptMessageArray[i].length;
            if (k >= 0 && j-k >= 0) {
                decryptedText = decryptedText + decryptMessageArray[i][j - k];
                parsedMessageLength++;
            }
            else if(i-k-1 > 0){
                decryptedText = decryptedText + decryptMessageArray[i][j];
                parsedMessageLength++;
            }
            if (spacePosition != null && parsedMessageLength === spacePosition - 1) {
                do {
                    decryptedText = decryptedText + " ";
                    spacePosition = spacePositions.pop();
                } while (parsedMessageLength === spacePosition - 1);
            }
        }
    }

    decryptedTextObject.originalText = message;
    decryptedTextObject.decryptedText = decryptedText;
    timer = new Date();
    decryptedTextObject.endTime = timer.getHours() + ":" + timer.getMinutes() + ":" + timer.getSeconds() + ":" + timer.getMilliseconds();
    res.writeHead(200, "{Content-Text : application/json}");
    res.write(JSON.stringify(decryptedTextObject));
    res.end();
}

var getMultiplier = function (number) {
    var multiplier = 1;
    if (number == 0)
        return 10;
    number = Math.floor(number / 10);
    while (number != 0) {
        multiplier = multiplier * 10;
        number = Math.floor(number/10);
    }
    return multiplier;
}

exports.decryptMessage = decryptMessage;