import { EventsHandler } from '@nestjs/cqrs'
import { applyDecorators, SetMetadata } from '@nestjs/common'
import { IEvent } from '@nestjs/cqrs/dist'

export const SAFE_EVENT_HANDLER = Symbol('SAFE_EVENT_HANDLER')

export const SafeEventsHandler = (...eventType: IEvent[]) =>
  applyDecorators(SetMetadata(SAFE_EVENT_HANDLER, true), EventsHandler(...eventType))
