declare module '*.svg';
declare module '*.json';
declare module '*.png' {
  const value: import('react-native').ImageRequireSource;
  export default value;
}
declare module '*.jpg';
