import { HandlerInputCreator } from '@ask-utils/test';
import { handler } from '../index'

describe('Skill handler', () => {
    it('should return false when given a not LaunchRequest', async () => {
      const handlerInput = new HandlerInputCreator().createLaunchRequest();
      await expect(handler(handlerInput.requestEnvelope)).resolves.toMatchSnapshot();
    });
    it('should return false when given a not SessionEndedRequest', async () => {
        const handlerInput = new HandlerInputCreator().createSessionEndedRequest()
      await expect(handler(handlerInput.requestEnvelope)).resolves.toMatchSnapshot();
    });
    it.each(["AMAZON.StopIntent", "AMAZON.CancelIntent", "AMAZON.NoIntent", "AMAZON.HelpIntent"])('should match the snapshot of the %p IntentRequest', async (type) => {
      const handlerInput = new HandlerInputCreator().createIntentRequest({
        name: type,
        confirmationStatus: 'NONE'
      });
      await expect(handler(handlerInput.requestEnvelope)).resolves.toMatchSnapshot();
    });
});
