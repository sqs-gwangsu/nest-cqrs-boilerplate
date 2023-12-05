import { mapDtoToEntity, mapEntityToDto } from '@/common/utils/converter.util'

class TestEntity {
  id: number
  name: string

  setter(id: number, name: string) {
    this.id = id
    this.name = name
  }
}

class TestDto {
  name: string

  setter(name: string) {
    this.name = name
  }
}

describe('ConverterUtil', function () {
  describe('mapDtoToEntity', function () {
    it('should map to entity without id', function () {
      const dto = new TestDto()
      dto.setter('name')

      const entity = mapDtoToEntity(dto, TestEntity)

      expect(!entity.id).toEqual(true)
      expect(entity instanceof TestEntity).toEqual(true)
    })
  })

  describe('mapEntityToDto', function () {
    it('should map dto to entity without id', function () {
      const entity = new TestEntity()
      entity.setter(1, 'name')

      const dto = mapEntityToDto(entity, TestDto)

      expect({ ...dto }).toEqual({ ...entity })
      expect(dto instanceof TestDto).toEqual(true)
    })
  })
})
