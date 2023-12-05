import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function IsBiggerThen(getter: (t: any) => any, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsBiggerThen',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, { object }: ValidationArguments) {
          const target = getter(object)
          return value >= target
        },
      },
    })
  }
}
