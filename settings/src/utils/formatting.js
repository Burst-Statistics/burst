import {intervalToDuration, format} from 'date-fns';

const getRelativeTime = (relativeDate, date = new Date()) => {
  // if relativeDate is a number, we assume it is an UTC timestamp
  if (typeof relativeDate === 'number') {
    // convert to date object
    relativeDate = new Date(relativeDate * 1000);
  }
  if (!(relativeDate instanceof Date)) {
    // invalid date, probably still loading
    return '-';
  }
  let units = {
    year  : 24 * 60 * 60 * 1000 * 365,
    month : 24 * 60 * 60 * 1000 * 365/12,
    day   : 24 * 60 * 60 * 1000,
    hour  : 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
  }
  let rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  let elapsed = relativeDate - date
  // "Math.abs" accounts for both "past" & "future" scenarios
  for (let u in units) {
    if (Math.abs(elapsed) > units[u] || u === 'second') {
      return rtf.format(Math.round(elapsed/units[u]), u)
    }
  }
}

const getPercentage = (val, total, format = true) => {
  val = Number(val);
  total = Number(total);
  let percentage = val / total;
  if (isNaN(percentage)){
    percentage = 0;
  }
  return format ? new Intl.NumberFormat(
      undefined,
      {
        style: 'percent',
        maximumFractionDigits: 1,
      }).format(percentage) : percentage;
}

function getChangePercentage(currValue, prevValue){
  currValue = Number(currValue);
  prevValue = Number(prevValue);

  let change = {}
  let percentage = (currValue - prevValue) / prevValue;
  if (isNaN(percentage)){
    percentage = 0;
  }
  change.val = new Intl.NumberFormat(
      undefined,
      {
        style: 'percent',
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }).format(percentage);
  change.status = (percentage > 0) ? 'positive' : 'negative';

  return change;
}

function getBouncePercentage(bounced_sessions, sessions, format = true){
  bounced_sessions = Number(bounced_sessions);
  sessions = Number(sessions);
  return getPercentage(bounced_sessions, sessions + bounced_sessions, format);
}

const formatUnixToDate = (unixTimestamp, formatStr = 'yyyy-MM-dd') => {
  return format(new Date(unixTimestamp * 1000), formatStr);
}

function formatTime(timeInMilliSeconds = 0) {
  let timeInSeconds = Number(timeInMilliSeconds);
  if (isNaN(timeInSeconds)){
    timeInSeconds = 0;
  }

  let duration = intervalToDuration({ start: 0, end: timeInSeconds });
  const zeroPad = (num) => String(num).padStart(2, '0')

  const formatted = [
    duration.hours,
    duration.minutes,
    duration.seconds,
  ].map(zeroPad);

  return formatted.join(':');
}

function formatNumber(value, decimals = 1){
  value = Number(value);
  if (isNaN(value)){
    value = 0;
  }
  return new Intl.NumberFormat(undefined, {
    style: "decimal",
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: decimals,
  }).format(value);
}

function formatPercentage(value, decimals = 1){
  value = Number(value) / 100;

  if (isNaN(value)){
    value = 0;
  }
  return new Intl.NumberFormat(undefined, {
    style: "percent",
    maximumFractionDigits: decimals,
  }).format(value);
}

export {
  getRelativeTime,
  getPercentage,
  getChangePercentage,
  getBouncePercentage,
  formatUnixToDate,
  formatTime,
  formatNumber,
  formatPercentage
};