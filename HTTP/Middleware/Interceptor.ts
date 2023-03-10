import { Request, Response } from "express";
import AppError from "../../App/Application/Utils/AppError";
import { AppErrorStatus } from "../../App/Application/Utils/ResponseStatus";

export class ResponseInterceptor {

    static transformErrorStatusToHttp = (status: string): number => {
        if (status === AppErrorStatus.AlreadyExists) return 409
        else if (status === AppErrorStatus.InvalidOperation) return 400
        else if (status === AppErrorStatus.NotFound) return 404
        else if (status === AppErrorStatus.UnAuthorized) return 403
        else return 500

    }

    static intercept = (req: Request, res: Response): void => {
        try {
            res.status(req.body.status).json({ message: req.body.message })
        } catch (error) {
            const err = AppError.fromError(error as Error);
            res.status(ResponseInterceptor.transformErrorStatusToHttp(err.status)).json({ message: err.message })
        }
    }
}