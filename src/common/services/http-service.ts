import { Injectable } from '@nestjs/common';
import * as request from 'request';
import { OK } from 'http-status';
import { config } from '../../config';

@Injectable()
export class HttpService {
  get(baseUrl: string, action: string) {
    const header = { Authorization: `Bearer ${config.app.CnpjApi.key}` };
    return new Promise<any>((resolve, reject) => {
      // console.log({ url: baseUrl + action, headers: header});

      request.get(baseUrl + action, {
        auth: {
          bearer: config.app.CnpjApi.key,
        },
      }, (error, response, body) => {
        // console.log(response, body, error);
        if (response && response.statusCode === OK) {
          resolve(JSON.parse(body));
        } else {
          reject(response);
        }
       } );
  });
  }
}
