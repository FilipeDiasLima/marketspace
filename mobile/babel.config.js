module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      'module:react-native-dotenv',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@assets': './src/assets',
            '@screens': './src/screens',
            '@routes': './src/routes',
            '@theme': './src/theme',
            '@context': './src/context',
            '@dtos': './src/dtos',
            '@service': './src/service',
            '@storage': './src/storage',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
          }
        }
      ]
    ]
  };
};
