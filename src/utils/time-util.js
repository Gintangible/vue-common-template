import dayjs from 'dayjs';

// 当前时间是否在某一时间区间内
export function isTimeBetween(time = '', separation = '-') {
  let t;
  if (Array.isArray(time)) {
    t = time;
  } else {
    t = time.trim().split(separation);
  }
  if (t.length !== 2) {
    return new Error('日期格式不正确，示例：[9:00, 11:00]/"9:00-11:00"');
  }
  let start = t[0].split(':');
  let end = t[1].split(':');
  const now = dayjs();
  start = now.set('hour', start[0]).set('minute', start[1]);
  end = now.set('hour', end[0]).set('minute', end[1]);
  return start.unix() <= now.unix() && now.unix() <= end.unix();
}

// 时间是否在某段日期区间内
export function isTimeInRange(timeRange = [], now = dayjs()) {
  if (timeRange.length !== 2) {
    return new Error('日期格式不正确，示例：[startTime, endTime]');
  }
  const start = now.diff(timeRange[0]);
  const end = now.diff(timeRange[1]);
  return start >= 0 && end <= 0;
}

// 在某一时间上增加天数
export function timeAddDay(paytime, day = 3) {
  const time = dayjs(paytime).add(day, 'day');
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}

export function timeFormat(time, format = 'YYYY年MM月DD日') {
  return dayjs(time).format(format);
}
