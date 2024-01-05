import { defaultClient, setup } from 'applicationinsights'

setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start()
defaultClient.context.tags[defaultClient.context.keys.cloudRole] = 'flush-app'

export const appInsightsClient = defaultClient
