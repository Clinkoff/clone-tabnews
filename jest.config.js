const nextJest = require('next/jest');
{

    const createJestConfig = nextJest({
        dir: './'
    });


    const jestConfig = createJestConfig({
        moduleDirectories: ['node_modules', '<rootDir>'],
        setupFilesAfterEnv: ['<rootDir>/jest.config.js']
    });


    module.exports = jestConfig;
}