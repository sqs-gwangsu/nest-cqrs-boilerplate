import { env } from '@/common/config/env'
import { ClassType, NonFunctionProperties } from '@/common/utils/type.util'

type StrictBuilderType<TClass, TOmit extends keyof TClass> = {
  [TProp in keyof Omit<NonFunctionProperties<TClass>, TOmit>]: (
    value: TClass[TProp],
  ) => [keyof Omit<NonFunctionProperties<TClass>, TOmit | TProp>] extends [never]
    ? BuilderEndType<TClass>
    : StrictBuilderType<TClass, TOmit | TProp>
}

type BuilderType<TClass, TOmit extends keyof TClass> = {
  [TProp in keyof Omit<NonFunctionProperties<TClass>, TOmit>]: (
    value: TClass[TProp],
  ) => [keyof Omit<NonFunctionProperties<TClass>, TOmit | TProp>] extends [never]
    ? BuilderEndType<TClass>
    : BuilderType<TClass, TOmit | TProp>
} & BuilderEndType<TClass>

type BuilderEndType<TClass> = {
  build: () => TClass
}

export class Qv {
  static isLocalIp(ip: string) {
    return env.localIpList.includes(ip)
  }

  static Builder<T>(classType: ClassType<T>): BuilderType<T, any> {
    const values: any = {}

    const proxyObject: any = Proxy.revocable(
      {},
      {
        get: (target, name) => {
          if (name === 'build') {
            return () => {
              proxyObject.revoke()
              return Object.assign(new classType() as any, values)
            }
          }

          return (value: any) => {
            values[name] = value
            return proxyObject.proxy
          }
        },
      },
    )

    return proxyObject.proxy as any
  }
}
