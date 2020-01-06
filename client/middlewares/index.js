import { createAPIMiddleware, composeAdapters } from 'redux-api-call';
import { intercepter as graphql } from '../libs/graphql';

import fetchInterceptor from 'redux-api-call-adapter-fetch';
import jsonInterceptor from 'redux-api-call-adapter-json';

export default createAPIMiddleware(
  composeAdapters(graphql, jsonInterceptor, fetchInterceptor)
);
