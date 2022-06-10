
 interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [
    {name: 'jquery', src: './assets/assets/js/jquery-3.3.1.min.js'},
    {name: 'popper', src: './assets/assets/js/popper.min.js'},
    {name: 'bootstrap-5', src: './assets/assets/vendor/bootstrap-5/js/bootstrap.bundle.min.js'},
    {name: 'main', src: './assets/assets/js/main.js'},
    {name: 'color-scheme', src: './assets/assets/js/color-scheme.js'},
    {name: 'pwa-services', src: './assets/assets/js/pwa-services.js'},
    {name: 'chart-js', src: './assets/assets/vendor/chart-js-3.3.1/chart.min.js'},
    {name: 'progressbar', src: './assets/assets/vendor/progressbar-js/progressbar.min.js'},
    {name: 'swiper', src: './assets/assets/vendor/swiperjs-6.6.2/swiper-bundle.min.js'},
    {name: 'app', src: './assets/assets/js/app.js'}
];