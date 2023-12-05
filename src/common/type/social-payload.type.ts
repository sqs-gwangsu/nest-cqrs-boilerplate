export type SocialPayload = {
  provider: string
  providerId: string
}

export type NaverPayload = SocialPayload & {
  name: string
  email: string
}
