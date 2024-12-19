import type { OutgoingHttpHeaders } from 'node:http';
import type { H3Event } from 'h3';
import { getStatusText } from './statusCode';

export interface ResponseData<T> {
  data: T;
  status: number;
  statusText: string;
  headers: OutgoingHttpHeaders;
}

export interface ResponseConfig {
  statusCode: number;
  statusText?: string;
  headers?: OutgoingHttpHeaders;
}

export function createResponseApi<T>(event: H3Event, data: T, config: ResponseConfig): ResponseData<T> {
  setResponseStatus(event, config.statusCode, config.statusText || getStatusText(config.statusCode));
  defaultContentType(event, 'application/json');

  const defaultHeaders = event.node.res.getHeaders();
  const mergedHeaders = config.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

  return {
    data,
    status: event.node.res.statusCode,
    statusText: event.node.res.statusMessage,
    headers: mergedHeaders,
  };
}
