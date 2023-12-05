import { plainToInstance } from 'class-transformer'

export function mapDtoToEntity<T, U>(dto: T, entity: new () => U): U {
  // const entity = new entityClass();
  // Object.assign(entity, dto);
  // return entity;
  return plainToInstance(entity, dto)
}

export function mapEntityToDto<T, U>(entity: T, dto: new () => U): U {
  // const dto = new dtoClass();
  // Object.assign(dto, entity);
  // return dto;
  return plainToInstance(dto, entity)
}

export function parseObjectToRecord(obj: any): Record<string, string> {
  if (!obj) {
    return {}
  }

  const result: Record<string, string> = {}

  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'string') {
      result[key] = value
    }
  }

  return result
}
