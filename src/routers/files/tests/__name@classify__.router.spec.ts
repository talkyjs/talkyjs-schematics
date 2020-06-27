import { HandlerInputCreator } from '@ask-utils/test';
import { RequestHandlerFactory } from '@ask-utils/router';
import { RequestHandler } from 'ask-sdk-core';
import { <%= classify(name) %>Router } from '../<%= classify(name) %>.router'

describe('<%= classify(name) %>Router', () => {
  let handler: RequestHandler;
  beforeEach(() => {
    handler = RequestHandlerFactory.create(<%= classify(name) %>Router);
  });
  describe('canHandle', () => {
    it('should return false when given a not LaunchRequest', async () => {
      const handlerInput = new HandlerInputCreator().createLaunchRequest();
      await expect(handler.canHandle(handlerInput)).resolves.toEqual(<%= canHandleTestResult %>);
    });
    <% if (/^\[/.test(intentName)) { %>
    it.each(<%= intentName %>)('should match the snapshot of the %p IntentRequest', async (type) => {
      const handlerInput = new HandlerInputCreator().createIntentRequest({
        name: type,
        confirmationStatus: 'NONE'
      });
      await expect(handler.canHandle(handlerInput)).resolves.toMatchSnapshot();
    });
    <% } else { %>
    it('should return false when given a not IntentRequest', async () => {
      const handlerInput = new HandlerInputCreator().createIntentRequest({
        name: <%= intentName %>,
        confirmationStatus: 'NONE'
      });
      await expect(handler.canHandle(handlerInput)).resolves.toMatchSnapshot();
    });
    <% } %>
  });
  describe('handle', () => {
    it('should match snapshot', async () => {
      const handlerInput = new HandlerInputCreator().createLaunchRequest();
      await expect(handler.handle(handlerInput)).resolves.toMatchSnapshot();
    });
  });
});
