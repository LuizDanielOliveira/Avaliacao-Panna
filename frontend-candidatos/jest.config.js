module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    moduleNameMapper: {
      '^@/components/(.*)$': '<rootDir>/components/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
  };
  