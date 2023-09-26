const CHINESE_NAME_REGEXP = /^[\u{4E00}-\u{9FEF}\u{3400}-\u{4DBF}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{F900}-\u{FAD9}\u{2F800}-\u{2FA1F}][\u{4E00}-\u{9FEF}\u{3400}-\u{4DBF}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{F900}-\u{FAD9}\u{2F800}-\u{2FA1F}·.]{0,28}[\u{4E00}-\u{9FEF}\u{3400}-\u{4DBF}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{F900}-\u{FAD9}\u{2F800}-\u{2FA1F}]$/u;

const ENGLISH_NAME_REGEXP = /^[a-zA-Z][a-zA-Z .]{0,58}[a-zA-Z]$/;

export default {
  isValid(name) {
    return name && (CHINESE_NAME_REGEXP.test(name) || ENGLISH_NAME_REGEXP.test(name));
  },
};
