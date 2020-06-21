import { Router } from "@ask-utils/router";
<% if (ssml === 'tsx') { %>
import { <%= name %>Script } from './<%= name%>.speech'
<% } %>

export const <%= name %>Handler: Router = {
    requestType: "<%= requestType %>",
    <% if (requestType === "IntentRequest") {%>intentName: "<%= intentName %>",<% } %>
    handler: async (handlerInput) => {
        <% if (requestType === "SessionEndedRequest") {%>
            return handlerInput.responseBuilder.getResponse()
        <% } else { %>
        <% if (ssml === 'tsx') { %>
        const script = new <%= name %>Script(handlerInput)
        return script
            .createResponseBuilder()
            .getResponse();
        <% } else { %>
        return handlerInput.responseBuilder.getResponse()
        <% } %>
        <% } %>
    }
}

export default <%= name %>Handler