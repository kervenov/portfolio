/* eslint-disable prettier/prettier */
import { applyDecorators } from '@nestjs/common';
import {
    ApiResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiConflictResponse,
    ApiPayloadTooLargeResponse,
    ApiTooManyRequestsResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function ApiCustomResponse(
    statuses: (
        | 200
        | 201
        | 400
        | 401
        | 403
        | 404
        | 409
        | 413
        | 422
        | 429
        | 498
        | 500
    )[],
) {
    const decorators = [];

    if (statuses.includes(200)) {
        decorators.push(ApiOkResponse({
            schema: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Success' },
                    statusCode: { type: 'number', example: 200 },
                }
            }
        }));
    }
    if (statuses.includes(201)) {
        decorators.push(ApiCreatedResponse({
            schema: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Created' },
                    statusCode: { type: 'number', example: 201 },
                }
            }
        }));
    }

    if (statuses.includes(400)) {
        decorators.push(
            ApiBadRequestResponse({
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Bad Request' },
                        statusCode: { type: 'number', example: 400 },
                    },
                },
            }),
        );
    }
    if (statuses.includes(401)) {
        decorators.push(
            ApiUnauthorizedResponse({
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Authentication credentials were missing or incorrect.',
                        },
                        statusCode: { type: 'number', example: 401 },
                    },
                },
            }),
        );
    }
    if (statuses.includes(403)) {
        decorators.push(
            ApiForbiddenResponse({
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'You do not have permission to perform this action.',
                        },
                        statusCode: { type: 'number', example: 403 },
                    },
                },
            }),
        );
    }
    if (statuses.includes(404)) {
        decorators.push(ApiNotFoundResponse({ description: 'The resource you are looking for does not exist.' }));
    }
    if (statuses.includes(409)) {
        decorators.push(
            ApiConflictResponse({
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example:
                                'The request could not be completed due to a conflict with the current state of the target resource.',
                        },
                        statusCode: { type: 'number', example: 409 },
                    },
                },
            }),
        );
    }
    if (statuses.includes(413)) {
        decorators.push(
            ApiPayloadTooLargeResponse({
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Payload too large' },
                        statusCode: { type: 'number', example: 413 },
                    },
                },
            }),
        );
    }
    if (statuses.includes(422)) {
        decorators.push(
            ApiUnprocessableEntityResponse({
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Unprocessable Entity.' },
                        statusCode: { type: 'number', example: 422 },
                    },
                },
            }),
        );
    }
    if (statuses.includes(429)) {
        decorators.push(
            ApiTooManyRequestsResponse({
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Too many requests, please try again later.',
                        },
                        statusCode: { type: 'number', example: 429 },
                    },
                },
            }),
        );
    }

    if (statuses.includes(498)) {
        decorators.push(
            ApiResponse({
                status: 498,
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Token expired or invalid.' },
                        statusCode: { type: 'number', example: 498 },
                    },
                },
            }),
        );
    }

    if (statuses.includes(500)) {
        decorators.push(
            ApiResponse({
                status: 500,
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'An unexpected error occurred on the server.',
                        },
                        statusCode: { type: 'number', example: 500 },
                    },
                },
            }),
        );
    }

    return applyDecorators(...decorators);
}
