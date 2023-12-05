type Props = {
  [key: string]: any
}

export class BaseObject<T extends Props> {
  public constructor(protected _props: T) {}

  public get props(): Readonly<T> {
    return this._props
  }

  get<TKey extends keyof T>(key: TKey): T[TKey] {
    return this.props[key]
  }

  set(props: Partial<T>): void
  set<TKey extends keyof T>(key: TKey, value: T[TKey]): void
  set<TKey extends keyof T>(param1: TKey | Partial<T>, param2?: T[TKey]): void {
    if (typeof param1 === 'string') {
      const key: TKey = param1
      const value: T[TKey] = param2 as T[TKey]
      this._props[key] = value
      return
    }

    const props: Partial<T> = param1 as Partial<T>
    Object.keys(props).forEach((prop: keyof T) => {
      this._props[prop] = props[prop] as T[typeof prop]
    })
  }

  protected setProps(props: Partial<T>) {
    Object.keys(props).forEach((prop: keyof T) => {
      this._props[prop] = props[prop] as any
    })
  }
}
