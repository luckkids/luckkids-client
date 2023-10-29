module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
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
          '@global-components': './src/global-components',
          '@hooks': './src/hooks',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
