module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@design-system': './src/design-system',
          '@queries': './src/queries',
          '@utils': './src/utils',
          '@types': './src/types',
          '@recoil': './src/recoil',
        },
      },
    ],
  ],
};
