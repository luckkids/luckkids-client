export const formatCreatedAt = (createdAt: string) => {
  // 현재와 비교해서
  // 1시간 미만이면 n분 전
  // 하루 미만이면 n시간 전
  // 하루 이상이면 n일전
  // 이틀 이상이면 날짜 그대로
  return createdAt;
};
