// 'use strict';

module.exports = {
    plugins: [
        require('postcss-cssnext')({ sourceMap: true }),
        require('postcss-apply')({ sourceMap: true }),
        require('postcss-responsive-type')({ sourceMap: true })
    ]
};