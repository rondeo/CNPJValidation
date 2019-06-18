import * as dotenv from 'dotenv';

import {
  getOsEnv,
  normalizePort,
  toNumber,
} from './infrastructure/environment';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config();

/**
 * Environment variables
 */

export const config = {
  node: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'testing',
  isDevelopment: process.env.NODE_ENV === 'development',
  isSandbox: process.env.NODE_ENV === 'sandbox',
  app: {
    name: 'premmiar-document-validation',
    version: '1.0.0',
    uri: getOsEnv('APP_URI'),
    routePrefix: '/api/v1',
    port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
    CnpjApi: {
      baseUrl: getOsEnv('APP_CNPJ_BASE_URL'),
      key: getOsEnv('APP_CNPJ_KEY'),
      redisKey: 'cnpj',
      getCnpj: 'CNPJ/',
      getCnpjDays: 'Days/',
      days: toNumber(getOsEnv('APP_CNPJ_DAYS')),
    },
    Sintegra : {
      baseUrl: getOsEnv('APP_SINTEGRA_BASE_URL'),
      key: getOsEnv('APP_SINTEGRA_KEY'),
      redisKey: 'sintegra',
      alias: getOsEnv('APP_SINTEGRA_ALIAS'),
    },
  },
  redis: {
    port: toNumber(getOsEnv('APP_REDIS_PORT')),
    url: getOsEnv('APP_REDIS_URL'),
    key: 'document',
    password: getOsEnv('APP_REDIS_PASSWORD'),
    minutesToExpire: toNumber(getOsEnv('APP_REDIS_EXPIRE')),
  },
  log: {
    level: getOsEnv('LOG_LEVEL'),
    output: getOsEnv('LOG_OUTPUT'),
  },
};
