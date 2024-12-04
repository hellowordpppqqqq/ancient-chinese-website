import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar.mts'

const base = process.env.NODE_ENV === 'development' ? '/' : '/ancient-chinese-website/'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  outDir: './dist',
  title: "古汉语词典在线网站",
  description: "一个古汉语在线网站",
  head: [
    // 引入自定义的 CSS 文件
    ['link', { rel: 'stylesheet', href: `${base}style.css` }],
    [
      'script', { type: 'text/javascript', src: 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js' }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '在线字典', link: '/docs/A/a' },
      { text: '文言文示例', link: '/example/进学解' },
      { text: '大学课程', link: 'https://eveningwater.github.io/undergraduate-course/' },
      { text: '个人小说', link: 'https://www.eveningwater.com/novel-website/index.html' },
      { text: '个人诗词', link: 'https://eveningwater.github.io/my-poem-website' },
      { text: '诗意出生', link: 'https://www.eveningwater.com/birth-poem/index.html' },
    ],
    search: {
      provider: 'local',
    },
    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/eveningwater/ancient-chinese-website/' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present eveningwater(夕水)'
    }
  }
})