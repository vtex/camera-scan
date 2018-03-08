module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    testFiles: ['**/__mock__/**', '*.spec.js', '*.test.js', '*-test.js'],
    umd: {
      global: 'cameraScan',
      externals: {
        react: 'React',
      },
    },
  },
}
