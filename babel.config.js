module.exports = api => {
    api.cache.using(() => process.env.NODE_ENV)

    return {
        presets: [
            ['@babel/preset-env', {
                useBuiltIns: 'usage',
                bugfixes: true,
                corejs: {
                    version: 3,
                    proposals: true
                },
                targets: {
                    node: 'current',
                    ie: 11
                }
            }],
            ['@babel/preset-react', {
                runtime: 'automatic'
            }]
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import'
        ]
    }
}
