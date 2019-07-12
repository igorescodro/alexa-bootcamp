const Alexa = require('ask-sdk-core');
const skillBuilder = Alexa.SkillBuilders.custom();

const LaunchRequestHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the Alexa Bootcamp! What can I help you with?';
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard("Alexa Bootcamp", speechText)
            .getResponse();
    }
};

const HelloWorldHandler = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'HelloIntent';
    },
    handle(handlerInput) {
        const speechText = 'Hello, Igor!';
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("Alexa Bootcamp", speechText)
            .getResponse();
    }
};

const BuyCandyHandler = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'BuyCandyIntent';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const candy = slots.candy.value; //slots['candy'].value;
        const speechText = `Sure! Ordering a ${candy} to you right now`;
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("Alexa Bootcamp", speechText)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
         const speechText = 'Sorry, I can\'t understand the command. Please, try again.';
         
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard("Alexa Bootcamp", speechText)
            .getResponse();
    }
};

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldHandler,
        BuyCandyHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();