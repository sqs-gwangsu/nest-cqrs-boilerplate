import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { MemberPolicy } from '@/common/policy/member.policy'

export function IsEmail(isEmpty: boolean = false, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return MemberPolicy.isValidEmail(isEmpty, value)
        },
        defaultMessage(args: ValidationArguments): string {
          return 'check input format'
        },
      },
    })
  }
}
