import dotenv from 'dotenv'

dotenv.config()
dotenv.config({
  path: '.env.main',
})

let processEnv: Record<string, string> = process.env as any

if (process.env.NODE_ENV !== 'prod') {
  processEnv = new Proxy(
    {},
    {
      get: (target, key: string) => {
        if (!(key in process.env)) {
          console.warn(`"${key}" not found in process.env`)
        }
        return process.env[key as any]
      },
    },
  )
}

export const env = {
  port: processEnv.PORT,
  queryLogging: processEnv.QUERY_LOGGING == '1',
  apiPath: {
    user: 'api',
    admin: 'admin/api',
    main: 'main/api',
    sp: 'sp/api',
    webhook: 'webhook',
  },
  isProd: processEnv.NODE_ENV === 'production',
  isLocal: processEnv.NODE_ENV === 'local',
  mainDb: {
    connectionLimit: 10,
    name: processEnv.MAIN_DB_NAME,
    host: processEnv.MAIN_DB_HOST,
    user: processEnv.MAIN_DB_USER,
    pass: processEnv.MAIN_DB_PASS,
    read: {
      host: processEnv.MAIN_DB_READ_HOST,
      connectionLimit: 10,
    },
  },

  userDb1: {
    connectionLimit: 10,
    name: processEnv.USER_DB_1_NAME,
    host: processEnv.USER_DB_1_HOST,
    user: processEnv.USER_DB_1_USER,
    pass: processEnv.USER_DB_1_PASS,
    port: processEnv.USER_DB_1_PORT,
    read: {
      host: processEnv.USER_DB_1_READ_HOST,
      connectionLimit: 10,
    },
  },
  aws: {
    accessKey: processEnv.AWS_ACCESS_KEY_ID,
    secretKey: processEnv.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
    s3: {
      bucket: processEnv.AWS_S3_BUCKET,
    },
    dynamo: {
      tableName: processEnv.AWS_DYNAMO_TABLE_NAME,
    },
    sqs: {
      mail: {
        main: {
          name: processEnv.AWS_SQS_MAIN_MAIL_NAME,
          queueUrl: processEnv.AWS_SQS_MAIN_MAIL_URL,
        },
        user: {
          name: processEnv.AWS_SQS_USER_MAIL_NAME,
          queueUrl: processEnv.AWS_SQS_USER_MAIL_URL,
        },
      },
      sms: {
        main: {
          name: processEnv.AWS_SQS_MAIN_SMS_NAME,
          queueUrl: processEnv.AWS_SQS_MAIN_SMS_URL,
        },
        user: {
          name: processEnv.AWS_SQS_USER_SMS_NAME,
          queueUrl: processEnv.AWS_SQS_USER_SMS_URL,
        },
      },
      order: {
        user: {
          cancel: {
            name: processEnv.AWS_SQS_USER_ORDER_CANCEL_NAME,
            queueUrl: processEnv.AWS_SQS_USER_ORDER_CANCEL_URL,
          },
          confirm: {
            name: processEnv.AWS_SQS_USER_ORDER_CONFIRM_NAME,
            queueUrl: processEnv.AWS_SQS_USER_ORDER_CONFIRM_URL,
          },
          delete: {
            name: processEnv.AWS_SQS_USER_ORDER_DELETE_NAME,
            queueUrl: processEnv.AWS_SQS_USER_ORDER_DELETE_URL,
          },
        },
      },
    },
    redis: {
      data: {
        url: processEnv.AWS_REDIS_DATA_URL,
      },
      cache: {
        url: processEnv.AWS_REDIS_CACHE_URL,
      },
    },
  },
  localIpList: ['127.0.0.1', '14.56.55.57'],
  token: {
    name: {
      main: {
        access: 'QSHOP_MAIN_AT',
        refresh: 'QSHOP_MAIN_RFT',
      },
      site: {
        access: 'QSHOP_SITE_AT',
        refresh: 'QSHOP_SITE_RFT',
      },
      sp: {
        access: 'QSHOP_SP_AT',
        refresh: 'QSHOP_SP_RFT',
      },
    },
    secret: processEnv.JWT_SECRET_KEY,
    issuer: processEnv.AUTHORIZATION_SERVER_DOMAIN,
    audience: processEnv.API_SERVER_DOMAINS,
    expiredIn: {
      access: processEnv.JWT_ACCESS_EXPIRED_IN,
      refresh: processEnv.JWT_REFRESH_EXPIRED_IN,
    },
  },
  social: {
    naver: {
      clientId: processEnv.NAVER_CLIENT_ID,
      clientSecret: processEnv.NAVER_CLIENT_SECRET,
      callbackUrl: processEnv.NAVER_CALLBACK_URL,
    },
    kakao: {
      clientId: processEnv.KAKAO_CLIENT_ID,
      clientSecret: processEnv.KAKAO_CLIENT_SECRET,
      callbackUrl: processEnv.KAKAO_CALLBACK_URL,
    },
  },
  sms: {
    sender: processEnv.SMS_SYSTEM_SENDER,
  },
  aligo: {
    apiUrl: processEnv.ALIGO_API_URL,
    apiKey: processEnv.ALIGO_API_KEY,
    userId: processEnv.ALIGO_USER_ID,
    sender: processEnv.ALIGO_SENDER,
  },
  mailgun: {
    domain: processEnv.MAILGUN_DOMAIN,
    apiKey: processEnv.MAILGUN_API_KEY,
  },
  unsplash: {
    clientId: processEnv.UNSPLASH_CLIENT_ID,
    getUrl: processEnv.UNSPLASH_GET_URL,
    searchUrl: processEnv.UNSPLASH_SEARCH_URL,
  },
  toss: {
    onboarding: {
      host: processEnv.TOSS_ONBOARDING_URL,
      authToken: processEnv.TOSS_ONBOARDING_AUTH_TOKEN,
      secretKey: processEnv.TOSS_ONBOARDING_SECRET_KEY,
    },
    clientKey: processEnv.TOSS_CLIENT_KEY,
    secretKey: processEnv.TOSS_SECRET_KEY,
    testClientKey: processEnv.TOSS_TEST_CLIENT_KEY,
    testSecretKey: processEnv.TOSS_TEST_SECRET_KEY,
  },
  goodsflow: {
    host: processEnv.GOODSFLOW_API_URL,
    apiKey: processEnv.GOODSFLOW_API_KEY,
  },
  kg: {
    identity: {
      verification: {
        reception: {
          host: processEnv.KG_IDENTITY_VERIFICATION_RECEPTION_URL,
          code: processEnv.KG_IDENTITY_VERIFICATION_RECEPTION_CODE,
        },
      },
    },
  },
  webhookUrl: processEnv.WEBHOOK_URL,
  imageHost: processEnv.IMAGE_HOST,
  appDomain: processEnv.APP_DOMAIN,
  swaggerUser: {
    name: processEnv.SWAGGER_USER_NAME,
    pass: processEnv.SWAGGER_USER_PASS,
  },
  slack: {
    url: processEnv.LOGGER_SLACK_URL,
    channel: processEnv.LOGGER_SLACK_CHANNEL,
  },
}
