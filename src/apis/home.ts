import API from './API';

export const getHomeInfo = async () => {
  const res = await API.get('/home/main');
  return res;
};

export const homeApis = {
  getHomeInfo,
};
