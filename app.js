var express = require('express');
var builder = require('botbuilder');
var apiai = require('apiai');

// Setup Restify Server
var app = express();
const server = app.listen(process.env.PORT || 7008,
function () {
    console.log('%s listening to %s', server.address().port, app.settings.env);
});

// chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
// Listen for messages from users
var api = new apiai("YOUR_DIALOGFLOW_CLIENT_ACCESS_TOKEN");
app.post('/api/messages', connector.listen());
// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')


    var bot = new builder.UniversalBot(connector, function (session) {
        
        var request = api.textRequest(session.message.text, {
            sessionId: 'elizza_test'
        });
        // On Success
        request.on('response',function(response){ 
            session.send(response.result.fulfillment.speech);
        });
        // On Failure
        request.on('error', function(error) {
            var bot = new builder.UniversalBot(connector, function (session) {
                session.send(error);
                }); 
        });
         
        request.end();
        }); 


