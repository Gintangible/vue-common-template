import dayjs from 'dayjs';
import ValidationResult from '@/models/common/ValidationResult';
import Credential from './Credential';
import IdentityCard from './validate/identity-card.js';
import Name from './validate/name.js';
import Mobile from './validate/mobile.js';

// 默认的成年人最小年龄
let DEFAULT_ADULT_MIN_AGE = 18;

// 默认的年龄计算开始时间。
let DEFAULT_AGE_FROM = null;

// 解析日期时间时使用的格式。
const DATE_PARSE_FORMAT = 'YYYY-M-D';

class Person {
  constructor(obj = {}) {
    this.name = obj.name;
    this.birthday = obj.birthday;
    this.credential = Credential.create(obj.credential || {});
    this.gender = obj.gender;
    this.kinship = obj.kinship;
    this.mobile = obj.mobile;
  }

  assign(obj = {}) {
    this.name = obj.name;
    this.birthday = obj.birthday;
    this.credential = Credential.create(obj.credential || {});
    this.gender = obj.gender;
    this.kinship = obj.kinship;
    this.mobile = obj.mobile;
  }

  static create(obj) {
    const result = new Person();
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      result.assign(obj);
      if (result.hasCredential()) {
        result.refreshGenderBirthday();
      }
    }
    return result;
  }

  static createArray(insurants) {
    return insurants.map((insurant) => Person.create(insurant));
  }

  isIdentityCard() {
    return this.credential.type === IdentityCard.type && IdentityCard.isValid(this.credential.number);
  }

  // 若新证件为合法的身份证，则根据新身份证的号码，自动设置此客户的性别和出生日期。
  setCredential(credential, changes) {
    if (!credential) {
      this.credential = null;
      if (changes) {
        changes.credential = null;
      }
    } else {
      this.credential = Credential.create(credential);
      if (changes) {
        changes.credential = Credential.create(credential);
      }
      if (IdentityCard.isValid(this.credential.number)) {
        this.gender = IdentityCard.getGender(this.credential.number);
        this.birthday = IdentityCard.getBirthday(this.credential.number);
        if (changes) {
          changes.gender = this.gender;
          changes.birthday = this.birthday;
        }
      }
    }
  }

  // 根据可能存在的身份证号码，刷新当前客户的性别和生日。
  refreshGenderBirthday() {
    if (IdentityCard.isValid(this.credential.number)) {
      this.gender = IdentityCard.getGender(this.credential.number);
      this.birthday = IdentityCard.getBirthday(this.credential.number);
    }
  }

  validate(field) {
    if (!field || field === '*') {
      const all = ['name', 'credential', 'gender', 'birthday', 'mobile'];
      return this.validate(all);  // recursive call
    } else if (Array.isArray(field)) {
      const results = [];
      for (let i = 0; i < field.length; ++i) {
        const r = this.validate(field[i]);  // recursive call
        results.push(r);
      }
      return ValidationResult.merge(results);
    } else if (typeof field === 'string') {
      switch (field) {
        case 'name':
          return new ValidationResult(Name.isValid(this.name), `姓名${this.name || ''}验证不通过`);
        case 'credential':
          return this.credential.validate('*', this.name);
        case 'credential.type':
          return this.credential.validate('type', this.name);
        case 'credential.number':
          return this.credential.validate('number', this.name);
        case 'gender':
          return new ValidationResult(!!this.gender, '请选择性别');
        case 'birthday':
          return new ValidationResult(!!this.birthday, '请选择出生日期');
        case 'mobile':
          return new ValidationResult(Mobile.isValid(this.mobile), `${this.name || ''}手机号码格式不正确`);
        default:
          throw new Error(`Unsupported field name: ${field}`);
      }
    } else {
      throw new Error(`Unsupported field type: ${typeof field}`);
    }
  }

  // 获取默认的年龄计算起始日期。
  static get defaultAgeFrom() {
    return DEFAULT_AGE_FROM;
  }

  // 设置默认的年龄计算起始日期。
  static set defaultAgeFrom(from) {
    DEFAULT_AGE_FROM = from;
  }

  // 获取默认的成年人最小年龄。
  static get defaultAdultMinAge() {
    return DEFAULT_ADULT_MIN_AGE;
  }

  // 设置默认的成年人最小年龄。
  static set defaultAdultMinAge(minAge) {
    DEFAULT_ADULT_MIN_AGE = minAge;
  }

  // 根据生日计算年龄，以 way 为单位。
  getAge(ageFrom = DEFAULT_AGE_FROM, way = 'year', accuracy = false) {
    if (this.birthday) {
      const birthday = dayjs(this.birthday, DATE_PARSE_FORMAT);
      const today = (ageFrom ? dayjs(ageFrom, DATE_PARSE_FORMAT) : dayjs().startOf('day'));
      return today.diff(birthday, way, accuracy);
    }
    return '';
  }

  // 判定当前客户是否是成年人。
  isAdult(ageFrom = DEFAULT_AGE_FROM, adultMinAge = DEFAULT_ADULT_MIN_AGE) {
    if (this.birthday) {
      return this.getAge(ageFrom) >= adultMinAge;
    } else {
      // 默认认为是成年人
      return true;
    }
  }

  // 判定此用户是否有完善的证件信息。
  hasCredential() {
    return this.credential && this.credential.type && this.credential.number;
  }

  // 检测当前对象和另一个对象是否表示同一个人。
  equals(other) {
    if (!(other instanceof Person)) {
      return false;
    }
    if (!this.credential || !other.credential) {
      return false;
    }
    return (this.credential.type === other.credential.type)
        && (this.credential.number === other.credential.number);
  }
}

export default Person;
