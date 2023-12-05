import { PasswordUtil } from '@/common/utils/password.util'

describe('PasswordUtil', function () {
  it('should ', function () {
    const hashPassword = PasswordUtil.hashPassword('123')
    const mysqlPassword = PasswordUtil.mysqlPassword('123')

    const hashVerify = PasswordUtil.verifyPassword('123', hashPassword)
    const mysqlVerify = mysqlPassword === PasswordUtil.mysqlPassword('123')

    expect(hashVerify).toEqual(mysqlVerify)
  })
})
