import { HandlerInputCreator } from '@ask-utils/test';
import { <%= classify(name) %>Script } from '../<%= classify(name) %>.speech'

describe('<%= classify(name) %>Script', () => {
  <% if (/^\[/.test(intentName)) { %>
  it.each(<%= intentName %>)('should match the snapshot of the %p IntentRequest', async (type) => {
    const handlerInput = new HandlerInputCreator().createIntentRequest({
      name: type,
      confirmationStatus: 'NONE'
    });
    const script = new <%= classify(name) %>Script(handlerInput);
    expect(script.createResponse()).toMatchSnapshot();
  });
  <% } else { %>
  it('should return false when given a not IntentRequest', async () => {
    const handlerInput = new HandlerInputCreator().createIntentRequest({
      name: <%= intentName %>,
      confirmationStatus: 'NONE'
    });
    const script = new <%= classify(name) %>Script(handlerInput);
    expect(script.createResponse()).toMatchSnapshot();
  });
  <% } %>
});
