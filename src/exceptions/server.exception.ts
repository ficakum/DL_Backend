import HttpException from "./http.exception";

export default class ServerException extends HttpException {
  constructor(error: string, error_description: string) {
    super(500, error, error_description);
  }
}
