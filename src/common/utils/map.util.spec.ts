import { MapUtil } from '@/common/utils/map.util'

describe('MapUtil', function () {
  describe('by', function () {
    it('should ', function () {
      const item1 = { key1: 1 }
      const item2 = { key1: 2 }
      const item3 = { key1: 3 }

      const list = [item1, item2, item3]

      const result = MapUtil.by(list, (t) => t.key1)
      const expected = new Map([
        [1, item1],
        [2, item2],
        [3, item3],
      ])

      expect(result).toStrictEqual(expected)
    })
  })

  describe('groupby', function () {
    it('should', function () {
      const item1 = { key1: 1, value: 1 }
      const item2 = { key1: 1, value: 2 }
      const item3 = { key1: 2, value: 3 }
      const item4 = { key1: 2, value: 4 }
      const item5 = { key1: 3, value: 5 }

      const list = [item1, item2, item3, item4, item5]

      const result = MapUtil.groupBy(list, (t) => t.key1)
      const expected = new Map([
        [1, [item1, item2]],
        [2, [item3, item4]],
        [3, [item5]],
      ])

      expect(result).toStrictEqual(expected)
    })
  })

  describe('nestedBy', function () {
    it('should', function () {
      const item1 = { key1: 1, key2: 'a', value: 1 }
      const item2 = { key1: 1, key2: 'b', value: 2 }
      const item3 = { key1: 1, key2: 'c', value: 3 }
      const item4 = { key1: 2, key2: 'a', value: 4 }
      const item5 = { key1: 2, key2: 'b', value: 5 }
      const item6 = { key1: 2, key2: 'h', value: 6 }

      const list = [item1, item2, item3, item4, item5, item6]

      const result = MapUtil.nestedBy(
        list,
        (t) => t.key1,
        (t) => t.key2,
      )
      const expected = new Map([
        [
          1,
          new Map([
            ['a', item1],
            ['b', item2],
            ['c', item3],
          ]),
        ],
        [
          2,
          new Map([
            ['a', item4],
            ['b', item5],
            ['h', item6],
          ]),
        ],
      ])

      expect(result).toStrictEqual(expected)
    })
  })
})
