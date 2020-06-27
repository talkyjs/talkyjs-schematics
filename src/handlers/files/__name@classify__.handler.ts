import { RequestHandler } from 'ask-sdk-core';
<% if (ssml === 'tsx' && requestType !== "SessionEndedRequest") { %>
import { <%= classify(name) %>Script } from './<%= classify(name) %>.speech'
<% } %>

export const <%= classify(name) %>Handler:  RequestHandler = {
    async canHandle(handlerInput) {
        <% if (requestType === "IntentRequest") {%>
        if (handlerInput.requestEnvelope.request.type !== 'IntentRequest') return false
        <% if (/^\[/.test(intentName)) { %>
        return <%= intentName %>.includes(handlerInput.requestEnvelope.request.intent.name)
        <% } else { %>
        return handlerInput.requestEnvelope.request.intent.name === <%= intentName %>
        <% } %>
        <% } else { %>
        return handlerInput.requestEnvelope.request.type === "<%= requestType %>"
        <% } %>
    },
    async handle(handlerInput) {
        <% if (requestType === "SessionEndedRequest") {%>
            return handlerInput.responseBuilder.getResponse()
        <% } else { %>
        <% if (ssml === 'tsx') { %>
        const script = new <%= classify(name) %>Script(handlerInput)
        return script
            .createResponseBuilder()
            .getResponse();
        <% } else { %>
        return handlerInput.responseBuilder
            .speech("<%= speech %>")<% if (reprompt) { %>.reprompt("<%= reprompt %>")<% } %>
            .getResponse()
        <% } %>
        <% } %>
    }
}

export default <%= classify(name) %>Handler