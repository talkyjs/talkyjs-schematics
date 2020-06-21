import { CustomSkillBuilder, SkillBuilders, DefaultApiClient } from 'ask-sdk-core';
import { RequestEnvelope, Context, ResponseEnvelope } from 'ask-sdk-model';
import { RequestHandlerFactory, Router } from '@ask-utils/router'
<% if (database === "s3") { %>import { S3PersistenceAdapter } from "ask-sdk-s3-persistence-adapter"<% } %>
<% if (database === "dynamodb") { %>import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter'<% } %>
import { ErrorRequestHandler } from './ErrorHandler/Error.handler'
import { LaunchRequestHandler } from './LaunchRequest/LaunchRequest.handler'
import { HelpIntentHandler } from './HelpIntent/HelpIntent.handler'
import { SessionEndedRequestHandler } from './SessionEndedRequest/SessionEndedRequest.handler'

let skill: CustomSkillBuilder | undefined
const handlerFactory = new RequestHandlerFactory()
handlerFactory.addRoutes(
    LaunchRequestHandler,
    HelpIntentHandler,
    SessionEndedRequestHandler,
)

export const createSkill = (): CustomSkillBuilder => {
    return SkillBuilders.custom()<% if (skillId) { %>.withSkillId("<%= skillId %>")<% } %>
        .addErrorHandlers(ErrorRequestHandler)
        .addRequestHandlers(
            ...handlerFactory.createHandlers(),
        )
        .withApiClient(new DefaultApiClient())
        <% if (database === "s3") { %>.withPersistenceAdapter(
            new S3PersistenceAdapter({
                bucketName: "<%= dbName %>",
            })
        )<% } %><% if (database === "dynamodb") { %>.withPersistenceAdapter(
            new DynamoDbPersistenceAdapter({
                tableName: "<%= dbName %>",
                createTable: true
            })
        )<% } %>
}

export const handler = (event: RequestEnvelope, context?: Context): Promise<ResponseEnvelope> => {
    if (!skill) skill = createSkill()
    return skill.create().invoke(event, context)
}