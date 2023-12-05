import { ArrayUtil } from '@/common/utils/array.util'

describe('ArrayUtil', function () {
  describe('isSame', function () {
    it('should not check sort', function () {
      const result = ArrayUtil.isSame([1, 2, 3], [1, 2, 3], false)

      expect(result).toEqual(true)
    })

    it('should check sort - false', function () {
      const result = ArrayUtil.isSame([1, 2, 3], [1, 3, 2], true)

      expect(result).toEqual(false)
    })

    it('should check sort - true', function () {
      const result = ArrayUtil.isSame([1, 2, 3], [1, 2, 3], true)

      expect(result).toEqual(true)
    })
  })

  describe('isUnique', function () {
    it('should true', function () {
      expect(ArrayUtil.isUnique([1, 2, 3])).toBeTruthy()
      expect(ArrayUtil.isUnique([])).toBeTruthy()
    })
    it('should false', function () {
      expect(ArrayUtil.isUnique([1, 2, 3, 1])).toBeFalsy()
      expect(ArrayUtil.isUnique([0, 0])).toBeFalsy()
      expect(ArrayUtil.isUnique([null, null])).toBeFalsy()
    })
  })

  describe('overlaps', function () {
    it('should true', function () {
      expect(ArrayUtil.overlaps([1, 2, 3], [1, 2, 3])).toBeTruthy()
      expect(ArrayUtil.overlaps([1, 2, 3], [3])).toBeTruthy()
      expect(ArrayUtil.overlaps([3], [1, 2, 3])).toBeTruthy()
    })

    it('should false', function () {
      expect(ArrayUtil.overlaps([1, 2, 3], [4, 5, 6])).toBeFalsy()
      expect(ArrayUtil.overlaps([1, 2, 3], [])).toBeFalsy()
      expect(ArrayUtil.overlaps([], [1, 2, 3])).toBeFalsy()
      expect(ArrayUtil.overlaps([], [])).toBeFalsy()
    })
  })

  describe('sum', function () {
    it('should number', function () {
      expect(ArrayUtil.sum([1, 2, 3], (t) => t)).toEqual(6)
      expect(ArrayUtil.sum([{ a: 1 }, { a: 2 }, { a: 3 }], (t) => t.a)).toEqual(6)
    })
  })
})
