import { HandlerInputCreator } from '@ask-utils/test';
import { RequestHandler } from 'ask-sdk-core';
import { <%= classify(name) %>Handler } from '../<%= classify(name) %>.handler'

describe('<%= classify(name) %>Handler', () => {
  const handler: RequestHandler = <%= classify(name) %>Handler
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
