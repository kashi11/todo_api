export default class AppResult<T> {
  constructor(public statusCode: string, public result: T) { }

  static success<U>(result: U): AppResult<U> {
    return new AppResult<U>("OK", result);
  }
}
