import { SkillFactory, TalkyJSSkillConfig, SkillHandler } from '@talkyjs/core'
import { CustomSkillBuilder } from 'ask-sdk-core'
import { LaunchRequest<%= classify(controllerFilesuffix) %> } from './LaunchRequest/LaunchRequest.<%= controllerFilesuffix %>'
import { HelpIntent<%= classify(controllerFilesuffix) %> } from './HelpIntent/HelpIntent.<%= controllerFilesuffix %>'
import { StopAndCancelAndNoIntent<%= classify(controllerFilesuffix) %> } from './StopAndCancelAndNoIntent/StopAndCancelAndNoIntent.<%= controllerFilesuffix %>'

const config: TalkyJSSkillConfig = {
    stage: 'development',                   // [Optional] Skill Stage
    logLevel: 'info',                       // [Optional] Log level
    database: {                             // [Optional] Database configuration
        type: "s3",             // [Optional] Database type (none / s3 / dynamodb)
        tableName: "PUT_YOUR_DB_NAME",         // [Optional] Database table name
    //    s3PathPrefix: ''                  // [Optional] [Only S3] S3 path prefix
    },
    // skillId: '',                         // [Optional] Skill ID
    errorHandler: {                         // [Optional] error handler configurations
        usePreset: true,                    // [Optional] Use preset error handler
    //    sentry: {                         // [Optional] Error tracker configuration (sentry)
    //        dsn: process.env.SENTRY.DSN   // [Optional] Sentry dsn
    //    }
    }
}

/**
 * Skill Factory (Added preset handler)
 */
export const skillFactory = SkillFactory.launch(config)
<% if(controllerFilesuffix === 'router') { %>.addRequestRouters([<% } else { %>.addRequestHandlers(<% } %>
    LaunchRequest<%= classify(controllerFilesuffix) %>,
    HelpIntent<%= classify(controllerFilesuffix) %>,
    StopAndCancelAndNoIntent<%= classify(controllerFilesuffix) %>,
<% if(controllerFilesuffix === 'router') { %>])<% } else { %>)<% } %>

/**
 * ask sdk skillBuilder
 */
export const skillBuilder: CustomSkillBuilder = skillFactory.getSkill()

/**
 * Skill handler creator
 * @param skill 
 */
export const createSkillHandler = (skill: CustomSkillBuilder = skillBuilder): SkillHandler => {
    return async (event, context) => {
        return skill.create().invoke(event, context)
    }
}

/**
 * Lambda handler
 * @param event 
 * @param context 
 */
export const handler: SkillHandler = createSkillHandler()