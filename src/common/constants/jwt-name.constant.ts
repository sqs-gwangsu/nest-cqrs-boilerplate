import { env } from '@/common/config/env'

export const COOKIE_SECURE = !!env.isProd
export const QSHOP_MAIN_AT = env.token.name.main.access
export const QSHOP_MAIN_RFT = env.token.name.main.refresh
export const QSHOP_SITE_AT = env.token.name.site.access
export const QSHOP_SITE_RFT = env.token.name.site.refresh

export const QSHOP_SP_AT = env.token.name.sp.access

export const QSHOP_SP_RFT = env.token.name.sp.refresh

export const TOKEN_ACCESS_TYPE = 'access'
export const TOKEN_REFRESH_TYPE = 'refresh'
