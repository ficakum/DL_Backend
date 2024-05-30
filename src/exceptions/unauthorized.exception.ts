import HttpException from "./http.exception";

export default class UnauthorizedException extends HttpException {
  constructor(error: string, error_description: string) {
    super(403, error, error_description);
  }
}
