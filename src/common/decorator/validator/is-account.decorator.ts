import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { MemberPolicy } from '@/common/policy/member.policy'

export function IsAccount(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsAccount',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return MemberPolicy.isValidAccount(value)
        },
        defaultMessage(args: ValidationArguments): string {
          return 'check input format'
        },
      },
    })
  }
}
