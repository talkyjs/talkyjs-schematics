import { SkillFactory, TalkyJSSkillConfig } from '@talkyjs/core'
import { LaunchRequestRouter } from './LaunchRequest/LaunchRequest.router'
import { HelpIntentRouter } from './HelpIntent/HelpIntent.router'
import { StopAndCancelIntentRouter } from './StopAndCancelIntent/StopAndCancelIntent.router'

const config: TalkyJSSkillConfig = {
    stage: 'development',                   // [Optional] Skill Stage
    logLevel: 'info',                       // [Optional] Log level
    database: {                             // [Optional] Database configuration
        type: "<%= database %>",             // [Optional] Database type (none / s3 / dynamodb)
        tableName: "<%= dbName %>",         // [Optional] Database table name
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

export const handler = SkillFactory.launch(config)
.addRequestRouters([
    LaunchRequestRouter,
    HelpIntentRouter,
    StopAndCancelIntentRouter,
])
.createLambdaHandler()