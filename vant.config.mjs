export default {
  name: 'TDesign',
  build: {
    css: {
      preprocessor: 'less',
    },
    site: {
      publicPath: '/TDesign/',
    },
  },
  site: {
    title: 'TDesign',
    logo: 'https://img.yzcdn.cn/vant/logo.png',
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 't-button',
            title: 'Button 按钮',
          },
          {
            path: 'tabs',
            title: 'tabs 按钮',
          },
        ],
      },
    ],
  },
};
