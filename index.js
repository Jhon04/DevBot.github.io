'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
    console.log('POST: webhook');
    
    const body = req.body;

    if(body.object === 'page'){
        
        body.entry.forEach(entry => {
            //se resiven y procesan los mensajes los mensajes
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
        });

        res.status(200).send('EVENTO RECIBIDO');

    }else{
        res.sendStatus(404);
    }
    
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
    console.log('GET: webhook');

    const VERIFY_TOKEN = 'stringUnicoParaTuAplicacion';
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge']

    if(mode && token){
        if(mode === 'subscribe' && token == VERIFY_TOKEN) {
            console.log('WEBHOOK VERIFICADO');
            res.status(200).send(challenge);
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(404);
    }

});

app.get('/', (req, res) => {
    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bot</title>
    </head>
    <body>
            <h1>Bot de vida MMR </h1>
    </body>
    </html>
    `)
});

// Sets server port and logs message on success
//app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
app.listen(8080, () =>{
    console.log('Servidor iniciado...')
});






