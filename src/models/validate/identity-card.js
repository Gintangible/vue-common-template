import { GENDER_MAP } from '@/models/common/gender';
import { CREDENTIAL_TYPE_MAP } from '@/models/common/credential';

const DECIMAL_BASE = 10;
const ASCII_0_CHAR_CODE = 48;
const ASCII_9_CHAR_CODE = 57;
const RATIO = [
  7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,
];
const LAST_CHAR = [
  '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2',
];

function parseNumber(number, start, end) {
  if (!number || (start < 0) || (end <= start) || (end > number.length)) {
    return null;
  }
  let result = 0;
  for (let i = start; i < end; ++i) {
    const ch = number.charCodeAt(i);
    if (ch < ASCII_0_CHAR_CODE || ch > ASCII_9_CHAR_CODE) {
      return null;
    }
    result *= DECIMAL_BASE;
    result += (ch - ASCII_0_CHAR_CODE);
  }
  return result;
}

function isIdCardBirthdayValid(number) {
  const year = parseNumber(number, 6, 6 + 4);
  const month = parseNumber(number, 10, 10 + 2);
  const day = parseNumber(number, 12, 12 + 2);
  if (!year || !month || !day) {
    return false;
  }
  const birthday = new Date(year, month - 1, day);  // 注意月份从0开始计算
  // 判定解析出来的年、月、日是否是合法的年、月、日
  if (birthday.getFullYear() !== year
      || birthday.getMonth() !== month - 1
      || birthday.getDate() !== day) {
    return false;
  }
  // 判定解析出来的日期是否超过今天，合法的身份证的日期不应该超过今天
  const now = new Date();
  if (birthday.getTime() > now.getTime()) {
    return false;
  }
  return true;
}

export function isIdCardNumberValid(number) {
  if ((typeof number !== 'string') || (number.length !== 18)) {
    return false;
  }
  // 验证奇偶校验码是否合法
  let sum = 0;
  for (let i = 0; i < 17; ++i) {
    const ch = number.charCodeAt(i);
    if (ch < ASCII_0_CHAR_CODE || ch > ASCII_9_CHAR_CODE) {
      return false;
    }
    sum += (ch - ASCII_0_CHAR_CODE) * RATIO[i];
  }
  const lastChar = LAST_CHAR[sum % LAST_CHAR.length];
  if (number.charAt(17).toUpperCase() !== lastChar) {
    return false;
  }
  // 验证出生日期是否合法
  if (!isIdCardBirthdayValid(number)) {
    return false;
  }

  return true;
}

export default {
  type: CREDENTIAL_TYPE_MAP.IDENTITY_CARD.value,

  name: CREDENTIAL_TYPE_MAP.IDENTITY_CARD.name,

  isValid(number, oldIdentityCard = false) {
    // const identity18Reg = /^[1-9]\d{5}((19|20)\d{2})((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const identity15Reg = /^[1-9]\d{5}\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}$/;
    return number && (isIdCardNumberValid(number) || (oldIdentityCard && identity15Reg.test(number)));
  },

  getGender(number) {
    if (!this.isValid(number)) {
      return null;
    }
    const digit = number.charCodeAt(16) - 48;
    return (digit % 2 === 1 ? GENDER_MAP.MALE.value : GENDER_MAP.FEMALE.value);
  },

  getBirthday(number) {
    if (!this.isValid(number)) {
      return null;
    }
    const year = number.substring(6, 6 + 4);
    const month = number.substring(10, 10 + 2);
    const day = number.substring(12, 12 + 2);
    return `${year}-${month}-${day}`;
  },
};
