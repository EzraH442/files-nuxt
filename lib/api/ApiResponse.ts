export class ApiResponse<T> {
  body: T | Error;

  constructor(body: T | Error) {
    this.body = body;
  }
}
