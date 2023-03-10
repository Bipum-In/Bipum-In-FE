export default function formatAgo(createdDate, modifiedDate) {
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
    return ` · ${month}달 전`;
  }
  if (day) {
    return ` · ${day}일 전`;
  }
  if (h) {
    return ` · ${h}시간 전`;
  }
  if (m) {
    return ` · ${m}분 전`;
  }

  return ` · 1분 전`;
}
