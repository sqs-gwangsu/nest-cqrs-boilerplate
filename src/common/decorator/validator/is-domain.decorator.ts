import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { SitePolicy } from '@/common/policy/site.policy'

export function IsDomain(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsDomain',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return SitePolicy.isValidDomain(value)
        },
        defaultMessage(args: ValidationArguments): string {
          return 'check domain format'
        },
      },
    })
  }
}
