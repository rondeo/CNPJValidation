import { BadRequestException } from '@nestjs/common';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CnpjValidationPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = isCnpj(value);
    if (!val) {
      throw new BadRequestException('Invalid CNPJ');
    }
    return value;
  }
}

const isCnpj = (value: string) =>  {
  const invalidValues = [
    '',
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999',
  ];

  value = value.replace(/[^\d]+/g, '');
  if (value.length !== 14 || invalidValues.indexOf(value) !== -1) {
    return false;
  }

  // Valida DVs
  let size = value.length - 2;
  let numbers = value.substring(0, size);
  const digit = value.substring(size);
  let soma = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    soma += +numbers.charAt(size - i) * pos--;
    if (pos < 2) { pos = 9; }
  }
  let result: number = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (result !== +digit.charAt(0)) {
    return false;
  }

  size = size + 1;
  numbers = value.substring(0, size);
  soma = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    soma += +numbers.charAt(size - i) * pos--;
    if (pos < 2) { pos = 9; }
  }
  result = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (result !== +digit.charAt(1)) {
    return false;
  }
  return true;
};
