// 格式化货币
export function formatCurrency(value, locale = "en-US", currency = "USD") {
  if (typeof value !== "number") {
    console.error("formatCurrency: value must be a number");
    return "";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

// 格式化日期
export function formatDate(dateStr, locale = "en-US", options = {}) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    console.error("formatDate: Invalid date string");
    return "";
  }

  const defaultOptions = {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options,
  }).format(date);
}

// 计算剩余分钟数
export function calcMinutesLeft(dateStr) {
  const now = new Date().getTime();
  const target = new Date(dateStr).getTime();

  if (isNaN(target)) {
    console.error("calcMinutesLeft: Invalid date string");
    return 0;
  }

  const diffInMinutes = Math.round((target - now) / 60000);
  return diffInMinutes > 0 ? diffInMinutes : 0; // 返回正数或0
}
