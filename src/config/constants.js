module.exports = {
  HTTP_INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal server error',
  },
  HTTP_NOT_FOUND: {
    code: 404,
    message: 'not found',
  },
  HTTP_CREATED: {
    code: 201,
    message: 'successfully created',
  },
  HTTP_OK: {
    code: 200,
    message: 'successfully fetched',
  },
  HTTP_BAD_REQUEST: {
    code: 400,
    message: 'bad request',
  },
  FILE_DELETED: {
    code: 200,
    success: 'Files deleted successfully',
    failed: 'Files deletion failed',
  },
  RATE_LIMIT: {
    code: 429,
    message: 'Too many requests, please try again later.',
  },
};
