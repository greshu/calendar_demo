export class AppValidator {
  static stringToObject = (str: string) => {
    try {
      let val = eval(str);
      return val;
    } catch (e) {
      return false;
    }
  };

  static validateEvent(startTime: number, endTime: number) {
    var errorMsg;
    if (!startTime || !endTime) {
      errorMsg = 'Please enter the values.';
    }
    if (startTime < 0 || endTime > 540) {
      errorMsg = 'Please enter minutes between 0 to 540.';
    }
    if (startTime >= endTime) {
      errorMsg = 'End time should be greater that start time';
    }
    return errorMsg;
  }
}
