import { HandlerInputCreator } from '@ask-utils/test';
import { HandlerInput } from 'ask-sdk-core';
import { <%= classify(name) %>Script } from '../<%= classify(name) %>.speech'

describe('<%= classify(name) %>Script', () => {
  let script: <%= classify(name) %>Script;
  let handlerInput: HandlerInput
  beforeEach(() => {
    handlerInput = new HandlerInputCreator().createIntentRequest({
        name: <%= intentName %>,
        confirmationStatus: 'NONE'
      });
    script = new <%= classify(name) %>Script(handlerInput);
  });
  describe('handle', () => {
    it('should match snapshot', async () => {
      expect(script.createResponse()).toMatchSnapshot();
    });
  });
});
