export const formatCreatedAt = (createdAt: string) => {
  const now = new Date();
  const createdAtDate = new Date(createdAt);
  const diffInMilliseconds = now.getTime() - createdAtDate.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays > 1) {
    return createdAtDate.toLocaleDateString();
  } else if (diffInHours > 0) {
    return `${diffInHours}시간 전`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}분 전`;
  } else {
    return '방금 전';
  }
};
export const getDayOfWeek = (date: string) => {
  const dayOfWeek = new Date(date).getDay();
  const dayOfWeekList = ['일', '월', '화', '수', '목', '금', '토'];
  return dayOfWeekList[dayOfWeek];
};

// 07:00:00 -> 오후 7시
// 23:00:00 -> 오후 11시
export const formatLuckTime = (time: string) => {
  const [hour, minute, second] = time.split(':');
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? '오후' : '오전';
  const formattedHour = hourInt % 12 || 12;
  return `${ampm} ${formattedHour}:${minute}`;
};

// 18:00:00 -> 오후 6시
export const formatMissionTime = (time: string) => {
  const [hour, minute, second] = time.split(':');
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? '오후' : '오전';
  const formattedHour = hourInt % 12 || 12;
  return `${ampm} ${formattedHour}:${minute}`;
};
