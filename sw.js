// Service Worker 文件 (sw.js)

const CACHE_NAME = 'habit-tracker-cache-v1';
const urlsToCache = [
    '/', // 缓存主页
    '/index.html', // 缓存主页 HTML
    '/manifest.json', // 缓存 Manifest 文件
    '/sw.js', // 缓存 Service Worker 自己
    'https://cdn.tailwindcss.com' // 缓存 Tailwind CSS
    // TODO: 如果有其他资源（如图片、字体），也需要在这里列出进行缓存
];

// 安装 Service Worker 并缓存资源
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 拦截网络请求，优先从缓存中获取资源
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // 如果缓存中有匹配的资源，则返回缓存中的资源
                if (response) {
                    return response;
                }
                // 否则，正常发起网络请求获取资源
                return fetch(event.request);
            })
    );
});

// TODO: 添加 activate 事件，用于清理旧版本的缓存
