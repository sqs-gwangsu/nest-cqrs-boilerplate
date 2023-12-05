import mysqlNativePassword from 'mysql-native-password'
import BCrypt from 'bcryptjs'

export class PasswordUtil {
  static hashPassword(inputPassword: string) {
    return hash(inputPassword, { cost: 1 })
  }

  static verifyPassword(inputPassword: string, hash: string) {
    try {
      return verify(inputPassword, hash)
    } catch (e) {
      return false
    }
  }

  static mysqlPassword(password: string) {
    if (!password) {
      return ''
    }

    return mysqlNativePassword.password(password)
  }

  static isMatch(password: string, inputPassword: string) {
    return (
      inputPassword === this.mysqlPassword(password) || this.verifyPassword(inputPassword, password)
    )
  }
}

const expression = /\$(2[a|x|y])\$(\d+)\$(.{53})/g
const defaultOptions = {
  cost: 10,
}

function verify(password: string, hash: string) {
  expression.lastIndex = 0
  var match = expression.exec(hash) as any
  hash = '$2a$' + match[2] + '$' + match[3]
  return BCrypt.compareSync(password, hash)
}

function hash(password: string, options?: { cost: number; salt?: string }) {
  expression.lastIndex = 0
  var salt
  if (typeof options == 'undefined') {
    options = defaultOptions
  }
  if (typeof options.cost == 'undefined') {
    options.cost = defaultOptions.cost
  }
  if (options.cost < defaultOptions.cost) {
    options.cost = defaultOptions.cost
  }
  if (typeof options.salt !== 'undefined') {
    if (options.salt.length < 16) {
      throw 'Provided salt is too short: ' + options.salt.length + ' expecting 16'
    }
    salt = '$2y$' + options.cost + '$' + options.salt
  } else {
    salt = BCrypt.genSaltSync(options.cost)
  }
  var hash = BCrypt.hashSync(password, salt)
  var output = expression.exec(hash) as any
  return '$2y$' + options.cost + '$' + output[3]
}
