// fix query string 会把base64 中的+ 变成空格
export default function strSpace2Plus(str) {
  if (typeof str === 'string') {
    return str.replace(/\s/g, '+');
  }
  return str;
}
