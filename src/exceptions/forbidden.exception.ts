import HttpException from "./http.exception";

export default class ForbiddenException extends HttpException {
  constructor(error: string, error_description: string) {
    super(403, error, error_description);
  }
}
