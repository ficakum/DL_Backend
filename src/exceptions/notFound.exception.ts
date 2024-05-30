import HttpException from "./http.exception";

export default class NotFoundException extends HttpException {
  constructor(error: string, error_description: string) {
    super(404, error, error_description);
  }
}
