export const formatCreatedAt = (createdAt: string) => {
  // 현재와 비교해서
  // 1시간 미만이면 n분 전
  // 하루 미만이면 n시간 전
  // 하루 이상이면 n일전
  // 이틀 이상이면 날짜 그대로
  return createdAt;
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
