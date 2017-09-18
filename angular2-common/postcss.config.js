// 'use strict';

module.exports = {
    plugins: [
        require('postcss-smart-import')({ sourceMap: true }),
        require('postcss-cssnext')({ sourceMap: true }),
        require('postcss-apply')({ sourceMap: true }),
        require('postcss-responsive-type')({ sourceMap: true })
    ]
};