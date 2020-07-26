import { Router } from "@talkyjs/core";
<% if (ssml === 'tsx' && requestType !== "SessionEndedRequest") { %>
import { <%= classify(name) %>Script } from './<%= classify(name) %>.speech'
<% } %>

export const <%= classify(name) %>Router: Router = {
    requestType: "<%= requestType %>",
    <% if (requestType === "IntentRequest") {%>intentName: <%= intentName %>,<% } %>
    handler: async (handlerInput) => {
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
            .speak("<%= speech %>")<% if (reprompt) { %>.reprompt("<%= reprompt %>")<% } %>
            .getResponse()
        <% } %>
        <% } %>
    }
}

export default <%= classify(name) %>Router