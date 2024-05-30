import HttpException from "./http.exception";

export default class ValidationException extends HttpException {
  constructor(error: string, error_description: string) {
    super(400, error, error_description);
  }
}
