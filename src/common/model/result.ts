class ResultImpl<T, E> {
  constructor(
    public readonly isOk: boolean,
    public readonly data: T,
    public readonly error: E,
  ) {}

  get isErr() {
    return !this.isOk
  }

  static ok(): ResultOk
  static ok<T>(data: T): ResultOk<T>
  static ok<T>(data?: T): ResultOk<T> {
    return new ResultImpl(true, data, undefined) as ResultOk<T>
  }

  static err(): ResultErr
  static err<T>(error: T): ResultErr<T>
  static err<T>(error?: T): ResultErr<T> {
    return new ResultImpl(false, undefined, error) as ResultErr<T>
  }
}

export type ResultOk<TData = void> = {
  isOk: true
  isErr: false
  data: TData
}
export type ResultErr<TError = void> = {
  isOk: false
  isErr: true
  error: TError
}

export type Result<TData = void, TError = void> = ResultOk<TData> | ResultErr<TError>
export type ResultAsync<TData, TError> = Promise<Result<TData, TError>>

export const Result = ResultImpl
