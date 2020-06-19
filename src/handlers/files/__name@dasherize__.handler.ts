import { Router } from "@ask-utils/router";

export const <%= classify(name)%>Handler: Router = {
    requestType: 'IntentRequest',
    intentName: "<%= classify(name)%>",
    handler: async (handlerInput) => {
        return handlerInput.responseBuilder.getResponse()
    }
}

export default <%= classify(name)%>Handler