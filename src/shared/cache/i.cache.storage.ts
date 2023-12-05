import { Cacheable } from '@/shared/cache/cache.type'
import { Nullable } from '@/common/utils/type.util'

export const CacheServiceToken = Symbol('CacheService')

export interface ICacheStorage<T extends Cacheable> {
  set(key: string, item: T): Promise<void>

  get(key: string): Promise<Nullable<T>>
}
