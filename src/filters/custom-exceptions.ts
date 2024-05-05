import { HttpCode, HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
        super('You do not have permission to perform this action.',
            HttpStatus.FORBIDDEN);
    }
}

export class NotFoundException extends HttpException {
    constructor() {
        super('The resource you are looking for does not exist.',
            HttpStatus.NOT_FOUND);
    }
}

export class BadRequestException extends HttpException {
    constructor() {
        super('Your request is malformed or contains invalid data.',
            HttpStatus.BAD_REQUEST);
    }
}

export class UnauthorizedException extends HttpException {
    constructor() {
        super('Authentication credentials were missing or incorrect.',
            HttpStatus.UNAUTHORIZED);
    }
}

export class ConflictException extends HttpException {
    constructor() {
        super('The request could not be completed due to a conflict with the current state of the target resource.',
            HttpStatus.CONFLICT);
    }
}

export class InternalServerErrorException extends HttpException {
    constructor() {
        super('An unexpected error occurred on the server. Please try again later.',
            HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class TooManyRequestsException extends HttpException {
    constructor() {
        super('Too many requests, please try again later.',
            HttpStatus.TOO_MANY_REQUESTS);
    }
}

export class PaymentRequiredException extends HttpException {
    constructor() {
        super('Payment is required to access this resource.',
            HttpStatus.PAYMENT_REQUIRED);
    }
}

export class GoneException extends HttpException {
    constructor() {
        super('The requested resource is no longer available.',
            HttpStatus.GONE);
    }
}

export class UnprocessableEntityException extends HttpException {
    constructor() {
        super('Unprocessable Entity.',
            HttpStatus.UNPROCESSABLE_ENTITY);
    }
}

export class PayloadTooLargeException extends HttpException {
    constructor() {
        super('Payload too large', HttpStatus.PAYLOAD_TOO_LARGE);
    }
}

export class ExpiredTokenException extends HttpException {
    constructor() {
        super('Token expired or invalid', HttpStatus.NOT_ACCEPTABLE);
    }
}
