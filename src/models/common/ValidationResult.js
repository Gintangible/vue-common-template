class ValidationResult {
  constructor(success = true, description = '') {
    this.success = success;
    this.description = description;
  }

  static merge(results) {
    if (results) {
      for (let i = 0; i < results.length; ++i) {
        const result = results[i];
        if (result && !result.success) {
          return result;  // 返回第一个失败结果
        }
      }
      return new ValidationResult(true);
    } else {
      return new ValidationResult(true);
    }
  }
}

export default ValidationResult;
