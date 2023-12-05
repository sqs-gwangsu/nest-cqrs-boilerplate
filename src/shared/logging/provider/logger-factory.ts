import { ConsoleLogger, Injectable } from '@nestjs/common'
import { env } from '@/common/config/env'
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston'
import winston from 'winston'
import CloudWatchTransport from 'winston-cloudwatch'
import SlackHook from 'winston-slack-webhook-transport'
import { DateUtil } from '@/common/utils/date.util'

@Injectable()
export class LoggerFactory {
  createLogger() {
    if (!env.isProd) {
      return new ConsoleLogger()
    }

    return WinstonModule.createLogger({
      transports: [
        this.getConsoleLogger('debug'),
        this.getCloudwatchLogger('info'),
        this.getSlackLogger('error'),
      ],
    })
  }

  private getConsoleLogger(level: string) {
    return new winston.transports.Console({
      level,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    })
  }

  private getSlackLogger(level: string) {
    return new SlackHook({
      level,
      webhookUrl: env.slack.url,
      channel: env.slack.channel,
      iconEmoji: ':desktop_computer:',
      username: 'QSHOP API',
    })
  }

  private getCloudwatchLogger(level: string) {
    return new CloudWatchTransport({
      level,
      name: 'Cloudwatch Logs',
      logGroupName: 'api-log-gruop', // process.env.CLOUDWATCH_GROUP_NAME,
      logStreamName: () => `api-log-${DateUtil.yymmdd()}`, // process.env.CLOUDWATCH_STREAM_NAME,
      awsAccessKeyId: env.aws.accessKey,
      awsSecretKey: env.aws.secretKey,
      awsRegion: env.aws.region,
    })
  }
}
