import React from 'react';
import { SpeechScriptJSX } from '@talkyjs/ssml'

export class <%= name %>Script extends SpeechScriptJSX {
    speech() {
        return (
            <speak>
                <p>Sorry, I had trouble doing what you asked. Please try again.</p>
            </speak>
        )
    }
    reprompt() {
        return (
            <speak>
                <p>Sorry, I had trouble doing what you asked. Please try again.</p>
            </speak>
        )
    }
}