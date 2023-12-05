import { Injectable } from '@nestjs/common'
import { ICacheStorage } from '@/shared/cache/i.cache.storage'
import { Cacheable } from '@/shared/cache/cache.type'
import { Nullable } from '@/common/utils/type.util'
import { ObjectUtil } from '@/common/utils/object.util'

@Injectable()
export class CacheStorage<T extends Cacheable> implements ICacheStorage<T> {
  private readonly storage: Map<string, string> = new Map()

  async get(key: string): Promise<Nullable<T>> {
    const hit = this.storage.get(key)
    if (!hit) {
      return null
    }

    return JSON.parse(hit)
  }

  async set(key: string, item: T): Promise<void> {
    const data = JSON.stringify(ObjectUtil.removeEmpty(item))

    await this.storage.set(key, data)
  }
}
