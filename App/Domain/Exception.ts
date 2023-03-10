

class DomainError extends Error {
    constructor(message: string) {
        super()
        this.name = this.constructor.name;
        this.message = message
    }
}

export class NotFoundError extends DomainError { }

export class AlreadyExistsError extends DomainError { }

export class UnAutherizedOperationError extends DomainError { }

export class InvalidOperationError extends DomainError { }

export class DatabaseConnectionError extends DomainError { }
