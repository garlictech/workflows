// 'use strict';
module.exports = {
    plugins: [
        // require('postcss-import'),
        // require('postcss-preset-env')({
        //     browsers: 'last 2 versions'
        // }),
        require('postcss-normalize'),
        require('postcss-apply')({
            sourceMap: true
        }),
        require('postcss-responsive-type')({
            sourceMap: true
        }),
        require('cssnano')({
            preset: 'default',
        }),
        require('autoprefixer')
    ]
}