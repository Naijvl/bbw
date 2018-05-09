let mix = require('laravel-mix');


/**
 * 用传统文件名方式强制更新浏览器缓存。启用时注意：
 * 1. browserSync 会失效。
 * 2. 部署维护麻烦。需要先删除服务器上的旧版文件，而不能简单替换。
 */
// if (mix.inProduction()) {
//     mix.webpackConfig({
//         output: {
//             filename: '[name]-[hash:6].js'
//         }
//     });
// }
   
   // .less('resources/assets/libs/Swiper/less/swiper.less','public/css')
   // .js('resources/assets/libs/Swiper/js/core.js','public/js')
mix.js('resources/assets/js/app.js', 'public/js')
   .js('resources/assets/js/migration.js', 'public/js')

   .sass('resources/assets/sass/app.scss', 'public/css')
   .options({
      processCssUrls: false
   })
   .browserSync({
       proxy: 'http://localhost:2345'
   })
   ;


if (mix.inProduction()) {
    mix.version();
}


