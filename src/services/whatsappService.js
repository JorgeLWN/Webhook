const https = require("https");

function sendMessageWhatsApp(textResponse, number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "text":{
            "body": textResponse
        },
        "type":"text"
        });

        const options = {
            host:"graph.facebook.com",
            path:"/v17.0/117643227984175/messages",
            method:"POST",
            body: data,
            headers:{
                "Content-Type": "application/json",
                Authorization:"Bearer EAAVaujrA8PUBAO3BG2NyWZCT30F5jBDkVewzagah4PQRGX0cmpKjP4ZA29XlmDvcAGYhRkZAxW8aZB5A7ZCOeX8QrU7ZCCpyw1OzZCsiUhNVaxKTORqQNGZCIDU0KeiUHFIiJkqiZCUmZAOnMAyr6RgNYZAMnmtZC0d8f8fx5Mt7B8XECkKpZBceWPh4ENNY5oLCZAmv5fhbEv75xK0gZDZD"
            }
        };
        const req = https.request(options, res =>{
            res.on("data", d =>{
                process.stdout.write(d);
            });
        });

        req.on("error", error =>{
            console.error(error);
        });

        req.write(data);
        req.end();
}

module.exports = {
    sendMessageWhatsApp
}