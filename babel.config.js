module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
    ['@babel/plugin-proposal-export-namespace-from'],
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@design-system': './src/design-system',
          '@queries': './src/queries',
          '@utils': './src/utils',
          '@types': './src/types',
          '@recoil': './src/recoil/',
          '@types-common': './src/types/common',
          '@global-components': './src/global-components',
          '@hooks': './src/hooks',
          '@page': './src/page',
          '@frame': './src/frame',
          '@libs': './src/libs',
          '@apis': './src/apis',
          '@assets': './src/assets',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
