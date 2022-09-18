export class ErrorHandlingUtil {

  public static getErrorKey(err: any): any {
    if (err && err.error) {
      const error = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
      return error.errors[0].errorCode;
    }
    return undefined;
  }
}
