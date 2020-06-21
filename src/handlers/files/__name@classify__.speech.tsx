/** @jsx ssml */
import {
    ssml,
    SpeechScriptJSX,
} from '@ask-utils/speech-script'

export class <%= name%>Script extends SpeechScriptJSX {
    speech() {
        return (
            <speak>
                <p><%= speech %></p>
            </speak>
        )
    }
    <% if (reprompt) { %>
    reprompt() {
        return (
            <speak>
                <p><%= reprompt %></p>
            </speak>
        )
    }
    <% } %>
}