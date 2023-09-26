/**
 * 待去除的空格字符的正则表达式。
 *
 * 目前只包含ASCII空格，以及全角中文空格。
 */
const SPACE_REGEXP = /[ 　]/g;

// 去除字符串中的空格，包括头尾的空格和中间的空格。
export default function removeMidSpace(str) {
  return str ? str.replace(SPACE_REGEXP, '') : '';
}
