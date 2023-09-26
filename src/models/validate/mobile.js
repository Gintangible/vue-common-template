const MOBILE_REGEXP = /^(0|86|17951)?(1[3-9])[0-9]{9}$/;

export default {
  isValid(mobile) {
    return mobile && MOBILE_REGEXP.test(mobile);
  },
};
