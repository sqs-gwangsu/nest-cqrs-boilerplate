import { Request, Express } from 'express'
import { SocialUser } from '@/shared/social-login/domain/social-login.type'

type _Request = Request
type _Express = Express

declare global {
  namespace Express {
    interface Request {
      jwtPayload?: Record<string, any>
      realIp: string
      isLocal: boolean
      siteId?: number
      nonMemberId: string
      socialUser?: SocialUser
    }

    namespace Multer {
      interface File {
        fieldname: string
        originalname: string
        encoding: string
        mimetype: string
        size: number
        bucket: string
        key: string
        acl: string
        contentType: string
        contentDisposition: null
        contentEncoding: null
        storageClass: string
        serverSideEncryption: null
        metadata: undefined
        location: string
        etag: string
        versionId: undefined
      }
    }
  }
}
