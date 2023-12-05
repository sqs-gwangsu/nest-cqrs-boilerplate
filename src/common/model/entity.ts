import { Optional } from '@/common/utils/type.util'
import { BaseObject } from '@/common/model/base-object'

type Props = {
  [key: string]: any
}

export class Entity<T extends Props> extends BaseObject<T> {
  public setId(id: T['id']) {
    this.setProps({ id } as any)
  }

  public getId(required: true): Required<T>['id'] extends Optional<infer K> ? K : Required<T>['id']
  public getId(): T['id']
  public getId(required?: true): any {
    if (required && !this.props.id) {
      throw new Error(`empty ${this.constructor.name}.id`)
    }

    return this.props.id
  }
}
