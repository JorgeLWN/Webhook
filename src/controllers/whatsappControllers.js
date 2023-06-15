const fs = require("fs");
const myconsole = new console.Console(fs.createWriteStream("./logs.txt"));
const whatsappService = require("../services/whatsappService");


const VerifyToken = (req, res) =>{

  try{
     var accessToken = "HJLL903EHQ83EHU30DDH9E98E9983DD8F9EHWF9FEHDWW";
     var token = req.query["hub.verify_token"];
     var challenge = req.query["hub.challenge"];

     if(challenge != null && token != null && token == accessToken){
         res.send(challenge);
     }else{
        res.status(challenge);
     }

  }catch(e){
     res.status(400).send();
  }

}

const RecivedMessage = (req, res) =>{
   
    try{
        var entry = (req.body["entry"])[0];
        var changes =(entry["changes"])[0];
        var value = changes["value"];
        var messageObject = value["messages"];

        if(typeof messageObject != "undefined"){
            var messages = messageObject[0];
            var number = messages["from"];
            var text = GetTextUser(messages);
            myconsole.log(text);
            whatsappService.sendMessageWhatsApp("El usuario dijo" + text, number);

        }

  

         res.send("EVENT_RECEIVED");
    }catch(e){
        myconsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}

function GetTextUser(messages){
  var text ="";
  var typeMessge = messages["type"];
  if(typeMessge == "text"){
      text = (messages["text"])["body"];
  } 
  else if(typeMessge == "interactive"){
    
    var interactiveObject =  messages["interactive"];
    var typeInteractive  = interactiveObject["type"];
    


    if(typeInteractive == "button_reply"){
        text = (interactiveObject["button_reply"])["title"];
         
    }else if(typeInteractive == "list_reply"){
        text = (interactiveObject["list_reply"])["title"];
    } 
    else{
        myconsole.log("sin mensaje");
    }
  }else{
     myconsole.log("sin mensaje");
  }
  return text; 
}

module.exports = {
    VerifyToken,
    RecivedMessage
}