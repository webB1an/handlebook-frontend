# handlebook-frontend

base on [simple-vite-templete-v2](https://github.com/webB1an/simple-vite-templete-v2)

- icon from [Carbon](https://icon-sets.iconify.design/carbon/) by [@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons)
- [tailwindcss](https://tailwindcss.com/)
- [tailwindcss-中文站](https://www.tailwindcss.cn/)

## Unocss 使用问题

图标通过动态 `:class` 绑定不会显示，具体可以看 [issue](https://github.com/unocss/unocss/issues/1355)，坐着在这个 issue 里说明了这是 UnoCSS 的[工作原理](https://github.com/unocss/unocss#scanning)，需要在 `unocss.config.ts` 中配置 `safelist` 添加动态的 `class` 图标即可。

## 待完成

- [x] 通过 midjourney 设计 logo
- [x] 自适应侧边栏布局
- [x] 定位锚点跳转
- [ ] 自适应侧边栏布局的多菜单情况
- [ ] tooltip
- [ ] 页面数据填充
- [ ] 页面数据动态化
- [ ] 切换主题模式
