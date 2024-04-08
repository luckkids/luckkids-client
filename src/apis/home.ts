import API from './API';

export const getHomeInfo = async () => {
  const res = await API.get('/home/main');
  console.log(5, res);
  return res;
};

export const homeApis = {
  getHomeInfo,
};
