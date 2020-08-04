import { HandlerInputCreator, MockPersistenceAdapter } from '@ask-utils/test';
import { SkillHandler } from '@talkyjs/core';
import { skillBuilder, createSkillHandler } from '../index';

describe('Skill handler', () => {
  let handler: SkillHandler;
  beforeEach(() => {
    const skill = skillBuilder.withPersistenceAdapter(
      new MockPersistenceAdapter()
    );
    handler = createSkillHandler(skill);
  });
  it('should return false when given a not LaunchRequest', async () => {
    const handlerInput = new HandlerInputCreator().createLaunchRequest();
    const response = await handler(handlerInput.requestEnvelope)
    expect(response.response).toMatchSnapshot();
  });
  it('should return false when given a not SessionEndedRequest', async () => {
    const handlerInput = new HandlerInputCreator().createSessionEndedRequest();
    const response = await handler(handlerInput.requestEnvelope)
    expect(response.response).toMatchSnapshot();
  });
  it.each([
    'AMAZON.StopIntent',
    'AMAZON.CancelIntent',
    'AMAZON.NoIntent',
    'AMAZON.HelpIntent',
  ])('should match the snapshot of the %p IntentRequest', async (type) => {
    const handlerInput = new HandlerInputCreator().createIntentRequest({
      name: type,
      confirmationStatus: 'NONE',
    });
    const response = await handler(handlerInput.requestEnvelope)
    expect(response.response).toMatchSnapshot();
  });
});
