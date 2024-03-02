import comp from "/Users/w477/dev/w477/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"w477\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"このブログについて\",\"slug\":\"このブログについて\",\"link\":\"#このブログについて\",\"children\":[]},{\"level\":2,\"title\":\"GitHub Pagesへ移行した理由\",\"slug\":\"github-pagesへ移行した理由\",\"link\":\"#github-pagesへ移行した理由\",\"children\":[]}],\"git\":{\"updatedTime\":1709122721000,\"contributors\":[{\"name\":\"hectowatt\",\"email\":\"0903tamaki@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
