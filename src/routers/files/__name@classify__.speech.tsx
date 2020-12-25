import React from 'react';
import { SpeechScriptJSX } from '@talkyjs/ssml'

export class <%= classify(name) %>Script extends SpeechScriptJSX {
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