export namespace QvValidator {
  export const isDomain = (value: string): boolean => {
    return /^[a-z0-9][a-z0-9-]{1,60}[a-z0-9]$/.test(value)
  }

  export const isAccount = (value: string): boolean => {
    return /^((?=.*[A-Za-z])|((?=.*[A-Za-z])(?=.*\d)))(?!.*\W).{6,16}$/.test(value)
  }

  export const isPassword = (value: string): boolean => {
    return /^(?=.*[a-z])(?=.*[A-Z])((?=.*\d)(?=.*\W)).{6,20}$/.test(value)
  }

  export const isBirthFormat = (value: string): boolean => {
    return /^(\d{4})-(\d{2})-(\d{2})$/.test(value)
  }

  export const isContainKorean = (value: string): boolean => {
    return /[ㄱ-힣]/.test(value)
  }

  export const isContainEnglish = (value: string): boolean => {
    return /[a-zA-Z]/.test(value)
  }

  export const isContainNumber = (value: string): boolean => {
    return /[0-9]/.test(value)
  }

  export const isContainUpperCase = (value: string): boolean => {
    return /[A-Z]/.test(value)
  }

  export const isContainLowerCase = (value: string): boolean => {
    return /[a-z]/.test(value)
  }

  export const isContainSpecialCharacter = (value: string): boolean => {
    return /[~!@#$%^&*()\-_=+]/.test(value)
  }

  export const isEmail = (value: string): boolean => {
    return /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,40})+$/.test(value)
  }

  export const isPhone = (value: string): boolean => {
    return /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,6}$/.test(value)
  }

  export const isNumber = (value: string): boolean => {
    return /^[0-9]*$/.test(value)
  }

  export const isKorean = (value: string): boolean => {
    return /^[가-힣0-9]*$/.test(value)
  }

  export const isEnglish = (value: string): boolean => {
    return /^[A-Za-z0-9]*$/.test(value)
  }
}
