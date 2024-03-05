import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
  lang: 'ja-JP',
  title: 'w477',
  head:[
    ['link',{rel:'icon',type:'image/png',href:'/favicon.png'}]
  ]
})

