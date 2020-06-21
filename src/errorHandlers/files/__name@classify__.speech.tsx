/** @jsx ssml */
import {
    ssml,
    SpeechScriptJSX,
} from '@ask-utils/speech-script'

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