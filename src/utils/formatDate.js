export function formatAgo(createdDate, modifiedDate) {
  const nowDate = new Date();
  const date = new Date(modifiedDate ? modifiedDate : createdDate);
  const year = nowDate.getFullYear() - date.getFullYear();
  const month = nowDate.getMonth() - date.getMonth();
  const day = nowDate.getDate() - date.getDate();
  const h = nowDate.getHours() - date.getHours();
  const m = nowDate.getMinutes() - date.getMinutes();

  if (year) {
    return ` · ${year}년 전`;
  }
  if (month) {
    return `${month}달 전`;
  }
  if (day) {
    return `${day}일 전`;
  }
  if (h) {
    return `${h}시간 전`;
  }
  if (m) {
    return `${m}분 전`;
  }
  return `지금`;
}

export function FormatDateToDot(dateStr) {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const dayStr = day < 10 ? `0${day}` : `${day}`;
  return `${year}.${monthStr}.${dayStr}`;
}

export function FormatDateToKoShort(dateStr) {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const dayStr = day < 10 ? `0${day}` : `${day}`;
  return `${year}년 ${monthStr}월 ${dayStr}일`;
}

export function FormatKoreanTime(dateStr) {
  if (!dateStr) {
    return '';
  }
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString('ko-KR', options);

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekdayIndex = date.getDay();
  const weekday = weekdays[weekdayIndex];

  const hours = date.getHours();
  const ampm = hours >= 12 ? '오후' : '오전';
  const twelveHours = hours % 12 || 12;
  const minutes = date.getMinutes();
  const formattedTime = `${ampm} ${twelveHours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return `${formattedDate.replace(/\./g, '. ')} (${weekday}) ${formattedTime}`;
}
