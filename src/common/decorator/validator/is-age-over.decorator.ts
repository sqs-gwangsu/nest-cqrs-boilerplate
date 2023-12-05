import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { MemberPolicy } from '@/common/policy/member.policy'

export function IsAgeOver(age: number, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsAgeOver',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return MemberPolicy.isValidBirth(age, value)
        },
        defaultMessage(args: ValidationArguments): string {
          return 'check if age is over 14 or input format'
        },
      },
    })
  }
}
