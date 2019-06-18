import { Injectable } from '@nestjs/common';
import * as request from 'request';
import { OK } from 'http-status';
import { config } from '../../config';

@Injectable()
export class HttpService {
  get(baseUrl: string, action: string) {
    const header = { Authorization: `Bearer ${config.app.CnpjApi.key}` };
    return new Promise<any>((resolve, reject) => {
      request.get(baseUrl + action, {
        auth: {
          bearer: config.app.CnpjApi.key,
        },
      }, (error, response, body) => {
        if (response && response.statusCode === OK) {
          resolve(JSON.parse(body));
        } else {
          reject(response);
        }
       } );
  });
  }
}
