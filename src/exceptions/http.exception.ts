export default class HttpException extends Error {
  public status: number;
  public error: string;
  public error_description: string;

  constructor(
    status: number = 500,
    error: string = "Server failed",
    error_description: string = "Server is currently not working"
  ) {
    super();
    this.status = status;
    this.error = error;
    this.error_description = error_description;
  }
}
