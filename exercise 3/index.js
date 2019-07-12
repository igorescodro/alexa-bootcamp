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

const CarColorHandler = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'CarColorIntent';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const color = slots.color.value; //slots['color'].value;
        
        let carUrl = '';
        switch(color) {
            case 'red':
                carUrl = `https://robbreportedit.files.wordpress.com/2016/09/alfaromeo_4c_011.jpg`;
                break;
            case 'yellow':
                carUrl = `http://2.bp.blogspot.com/_bGkuDO5Mmnw/TARbceoS8KI/AAAAAAAAAGI/bqIYqQ3fIl4/s1600/Cullen-Alice's-YellowPorshe.jpg`;
                break;
            case 'green':
                carUrl = `https://santanderconsumerusa.com/wp-content/uploads/2015/03/031515-sc-go-for-a-green-car-for-st-patricks-day-whether-youre-irish-or-not_5-1.jpg`;
                break;
            case 'blue':
                carUrl = `https://www.autoguide.com/blog/wp-content/uploads/2016/01/Tokyo-Auto-Salon-Dream-04-679x453.png`;
                break;
        }
        
        if(carUrl != ''){
            const speechText = `Showing your ${color} car.`;
            
            return handlerInput.responseBuilder
                .speak(speechText)
                .withStandardCard("Alexa Bootcamp", speechText, carUrl, carUrl)
                .getResponse();
        } else {
            const speechText = `Sorry, we don't have car in ${color}.`;
            
            return handlerInput.responseBuilder
            .speak(speechText)
            .withStandardCard("Alexa Bootcamp", speechText)
            .getResponse();
        }
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
        BuyCandyHandler,
        CarColorHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();