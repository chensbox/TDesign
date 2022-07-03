export default {
  name: 'TDesign',
  build: {
    css: {
      preprocessor: 'less',
    },
    site: {
      publicPath: '/TDesign/site-dist',
    },
    configureVite(config){
      const { BUILD_TARGET } = process.env;
      if (BUILD_TARGET === 'site') {
        // 修改文档站点构建配置
        config.server.fs = {
          strict:false
        }
      }
      return config
    }
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
            path: 'button',
            title: 'Button 按钮',
          },
          {
            path: 'cell',
            title: 'cell 单元格',
          },
          {
            path: 'tabs',
            title: 'tabs 标签页',
          },
          {
            path: 'icon',
            title: 'icon 图标',
          },
          {
            path: 'toast',
            title: 'toast 弹窗',
          },
          {
            path: 'dialog',
            title: 'dialog 对话框',
          },
          {
            path: 'popup',
            title: 'popup 弹出层',
          },
          {
            path: 'overlay',
            title: 'overlay 遮罩层',
          },
          {
            path: 'picker',
            title: 'picker 选择器',
          },
          {
            path: 'cascader',
            title: 'cascader 级联选择',
          },
          {
            path: 'swipe',
            title: 'swipe 轮播',
          },
        ],
      },
      {
        title:"Beta",
        items:[
          {
            path: 'signature',
            title: 'signature 电子签名',
          },
          {
            path: 'virtual-list',
            title: 'VirtualList 虚拟列表',
          },
        ]
      }
    ],
  },
};
