import { AlreadyExistsError, DatabaseConnectionError, InvalidOperationError, NotFoundError, UnAutherizedOperationError } from "../../Domain/Exception";
import { AppErrorStatus } from "./ResponseStatus";

export default class AppError extends Error {
  public status: AppErrorStatus;

  constructor(message: string, status: AppErrorStatus) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
  }

  static notFound = (message: string): AppError => {
    return new AppError(message, AppErrorStatus.NotFound);
  }

  static alreadyExists = (message: string): AppError => {
    return new AppError(message, AppErrorStatus.AlreadyExists);
  }

  static unAuthorized = (message: string): AppError => {
    return new AppError(message, AppErrorStatus.UnAuthorized)
  }

  static invalidOperation = (message: string): AppError => {
    return new AppError(message, AppErrorStatus.InvalidOperation)
  }

  static generic = (): AppError => {
    return new AppError("Internal Server Error ", AppErrorStatus.Generic)
  }

  static fromError = (e: Error) => {
    if (e instanceof NotFoundError) {
      return AppError.notFound(e.message)
    } else if (e instanceof AlreadyExistsError) return AppError.alreadyExists(e.message)
    else if (e instanceof UnAutherizedOperationError) return AppError.unAuthorized(e.message);
    else if (e instanceof InvalidOperationError) return AppError.invalidOperation(e.message)
    else return AppError.generic()
  }
}
