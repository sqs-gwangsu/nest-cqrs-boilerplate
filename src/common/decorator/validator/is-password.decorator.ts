import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { MemberPolicy } from '@/common/policy/member.policy'

export function IsPassword(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return MemberPolicy.isValidPassword(value)
        },
        defaultMessage(args: ValidationArguments): string {
          return 'check password policy'
        },
      },
    })
  }
}
