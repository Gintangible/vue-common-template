import { DEFAULT_CREDENTIAL_TYPE } from '@/models/common/credential';
import ValidationResult from '@/models/common/ValidationResult';
import IdentityCard from './validate/identity-card';

class Credential {
  constructor(type = DEFAULT_CREDENTIAL_TYPE.value, number = '') {
    this.type = type;
    this.number = number;
  }

  isIdentityCard() {
    return (this.type === DEFAULT_CREDENTIAL_TYPE.value);
  }

  assign(obj = {}) {
    this.type = obj.type;
    this.number = obj.number;
  }

  static create(obj) {
    const result = new Credential();
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      result.assign(obj);
    }
    return result;
  }

  validate(field, name) {
    if (!field || field === '*') {
      const all = ['type', 'number'];
      return this.validate(all, name);
    } else if (Array.isArray(field)) {
      const results = [];
      for (let i = 0; i < field.length; ++i) {
        const r = this.validate(field[i], name);
        results.push(r);
      }
      return ValidationResult.merge(results);
    } else if (typeof field === 'string') {
      switch (field) {
        case 'type':
          return new ValidationResult(!!this.type, `请选择${name || ''}证件类型`);
        case 'number':
          if (this.isIdentityCard(this.type)) {
            return new ValidationResult(IdentityCard.isValid(this.number), `${name || ''}证件号码不正确`);
          }
          if (this.credentialTypeValidate) {
            return this.credentialTypeValidate(this.number, this.type);
          }
          throw new Error('Unsupported credential_type validate，need add credentialTypeValidate method');
        default:
          throw new Error(`Unsupported field name: ${field}`);
      }
    } else {
      throw new Error(`Unsupported field type: ${typeof field}`);
    }
  }
}

export default Credential;
