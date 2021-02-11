import { format, isThisWeek, isToday, isYesterday,toDate } from "date-fns";

/*export const formatDateRange = orderDate => {

  if (!orderDate) {
    return null
  }
   if (isToday(getUTCDate(orderDate))) {
     return 'Today'
   }

   if (isYesterday(getUTCDate(orderDate))) {
     
    return 'Yesterday'
  }

  if (isThisWeek(getUTCDate(orderDate))) {
    return format(getUTCDate(orderDate), "do MMMM")
  }
  
  return format(getUTCDate(orderDate), "do MMMM")
} */

export const sortByDate = (list) => {
  list.sort((a, b) => {
    const dateLeft = toDate(new Date(a.date));
    const dateRight = toDate(new Date(b.date));
    const diff = dateLeft.getTime() - dateRight.getTime();
    if (diff > 0) {
      return -1;
    } else if (diff < 0) {
      return 1;
    } else {
      return diff;
    }
  });
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function getJoiningCharacter(options: Intl.DateTimeFormatOptions): string {
  return options.month === 'short' ? ' ' : '/';
}

function isMonthFirst(options: Intl.DateTimeFormatOptions) {
  return options.month === 'short';
}

function getFormattedMonth(
  options: Intl.DateTimeFormatOptions,
  isUTC: boolean,
  date: Date,
): string | number {
  if (options.month === 'short') {
    return SHORT_MONTHS[isUTC ? date.getUTCMonth() : date.getMonth()];
  }
  return (isUTC ? date.getUTCMonth() : date.getMonth()) + 1;
}

// Sample outputs: 'Sat, 1/12/2018', '1/12/2018', '12/2018', Sat, 1'
export function getFallbackFormat(date: Date, options: Intl.DateTimeFormatOptions = {}): string {
  const isUTC = options.timeZone === 'UTC';

  const dateParts = [];
  if (options.day) dateParts.push(isUTC ? date.getUTCDate() : date.getDate());
  if (options.month) {
    const monthFormat = getFormattedMonth(options, isUTC, date);
    if (isMonthFirst(options)) {
      dateParts.unshift(monthFormat);
    } else {
      dateParts.push(monthFormat);
    }
  }
  if (options.year) dateParts.push(isUTC ? date.getUTCFullYear() : date.getUTCFullYear());

  const joiningCharacter = getJoiningCharacter(options);
  let fallbackDate = dateParts.join(joiningCharacter);

  if (options.weekday) {
    const dayName = WEEKDAYS[isUTC ? date.getUTCDay() : date.getDay()];
    fallbackDate = fallbackDate ? `${dayName}, ${fallbackDate}` : dayName;
  }
  return (
    fallbackDate ||
    getFallbackFormat(date, {
      timeZone: options.timeZone,
      day: 'true',
      month: 'true',
      year: 'true',
    })
  );
}


// https://transferwise.com/transfer/success/197035949?token=w0uuDbTfGcN7uVJa5vbS8Z8AwDldXXNZ#/instantPayIn

export function formatDate(date: string) {
  
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
  
    return [year, month, day].join('/');
  }
  
  export const getUTCDate = dateString => {
    const date = new Date(dateString);
  
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
  };