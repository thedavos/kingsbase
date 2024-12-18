import type { H3Error } from 'h3';
import type { ZodError } from 'zod';

export const Error400 = (error: H3Error) => {
  const zodData = error.data as ZodError;
  const zodName = zodData.name;

  throw createError({
    name: error.name,
    statusCode: 400,
    statusMessage: error.statusMessage || 'Bad Request',
    stack: error.stack,
    data: {
      name: zodName,
      errors: zodData.issues,
    },
  });
};

export const Error404 = (error: H3Error) => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    stack: error.stack,
    data: { message: error.message },
  });
};

export const Error500 = (error: H3Error) => {
  throw createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    stack: error.stack,
    data: { message: error.message || 'An unexpected error occurred' },
  });
};

export const ApiErrors = {
  Error400,
  Error404,
  Error500,
};

export const handleApiError = (error: H3Error) => {
  const conditions = {
    Error400: error.statusCode === 400,
    Error404: error.statusCode === 404,
    Error500: true,
  };

  const errorKey = Object.keys(conditions).find(key => conditions[key as keyof typeof conditions]) || 'Error500';
  const errorFunction = ApiErrors[errorKey as keyof typeof ApiErrors] || ApiErrors.Error500;

  return errorFunction(error);
};
