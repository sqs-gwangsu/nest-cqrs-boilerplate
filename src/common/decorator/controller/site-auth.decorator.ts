import { SetMetadata } from '@nestjs/common'

export const SITE_AUTH_META_KEY = 'site_auth'
export const SiteAuth = () => SetMetadata(SITE_AUTH_META_KEY, true)
