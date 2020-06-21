import { ErrorHandler } from "ask-sdk-core";
<% if (ssml === 'tsx') { %>
import { ErrorScript } from "./Error.speech"
<% } %>

export const <%= name %>RequestHandler: ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(error)
        <% if (ssml === 'tsx') { %>
        const script = new ErrorScript(handlerInput)
        return script
            .createResponseBuilder()
            .getResponse();
        <% } else { %>
        return handlerInput.responseBuilder
            .speak('Sorry, I had trouble doing what you asked. Please try again.')
            .reprompt('Sorry, I had trouble doing what you asked. Please try again.')
            .getResponse()
        <% } %>
    }
}