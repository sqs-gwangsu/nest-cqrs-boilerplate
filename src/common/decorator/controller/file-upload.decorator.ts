import { UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { env } from '@/common/config/env'
import { Request } from 'express'
import multerS3 from 'multer-s3'
import { s3Client } from '@/shared/aws/s3/s3.module'
import { S3FilePathInterceptor } from '@/common/interceptor/s3-file-path.interceptor'
import { S3FileUploadInterceptor } from '@/common/interceptor/s3-file-upload.interceptor'

export const MulterS3Upload = (
  getter: (req: Request, file: Express.Multer.File) => string | Promise<string>,
) => {
  return UseInterceptors(
    FileInterceptor('file', {
      storage: multerS3({
        s3: s3Client,
        bucket: env.aws.s3.bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: async function (req: Request, file: Express.Multer.File, cb: any) {
          const filePath = await getter(req, file)
          cb(null, filePath)
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 20,
      },
    }),
  )
}

export const S3Upload = (
  getter: (req: Request, file: Express.Multer.File) => string | Promise<string>,
) => {
  return UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 20,
      },
    }),
    new S3FilePathInterceptor(async function (req: Request, file: Express.Multer.File) {
      return getter(req, file) // filePath
    }),
    S3FileUploadInterceptor,
  )
}
