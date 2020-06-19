import { Router } from "@ask-utils/router";
<% if (ssml === 'tsx') { %>
import { <%= classify(name)%>Script } from './<%= dasherize(name)%>.speech'
<% } %>

export const <%= classify(name)%>Handler: Router = {
    requestType: "<%= requestType %>",
    intentName: "<%= classify(name)%>",
    handler: async (handlerInput) => {
        <% if (ssml === 'tsx') { %>
        const script = new <%= classify(name)%>Script(handlerInput)
        return script
            .createResponseBuilder()
            .getResponse();
        <% } else { %>
        return handlerInput.responseBuilder.getResponse()
        <% } %>
    }
}

export default <%= classify(name)%>Handler