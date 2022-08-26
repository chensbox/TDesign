export default {
  name: 'TDesign',
  build: {
    css: {
      preprocessor: 'less',
    },
    site: {
      publicPath: '/TDesign/site-dist',
    },
    configureVite (config) {
      const { BUILD_TARGET } = process.env;
      if (BUILD_TARGET === 'site') {
        // 修改文档站点构建配置
        config.server.fs = {
          strict: false
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
            title: 'Cell 单元格',
          },
          {
            path: 'tabs',
            title: 'Tabs 标签页',
          },
          {
            path: 'toast',
            title: 'Toast 弹窗',
          },
          {
            path: 'dialog',
            title: 'Dialog 对话框',
          },
          {
            path: 'popup',
            title: 'Popup 弹出层',
          },
          {
            path: 'overlay',
            title: 'Overlay 遮罩层',
          },
          {
            path: 'action-sheet',
            title: 'ActionSheet 动作面板'
          },
          {
            path: 'picker',
            title: 'Picker 选择器',
          },
          {
            path: 'cascader',
            title: 'Cascader 级联选择',
          },
          {
            path: 'swipe',
            title: 'Swipe 轮播',
          },
          {
            path: 'pull-refresh',
            title: 'PullRefresh 下拉刷新'
          },
          {
            path: 'list',
            title: 'List 列表'
          },
          // {
          //   path: 'rend',
          //   title: 'rend 测试'
          // },
          {
            path: 'skeleton',
            title: 'Skeleton 骨架屏'
          },
          {
            path: 'notify',
            title: 'Notify 消息通知'
          },
          {
            path: 'collapse',
            title: 'Collapse 折叠面板'
          },
          {
            path: 'pagination',
            title: 'Pagination  分页'
          }
        ],
      },
      {
        title: '功能指令',
        items: [
          {
            path: 'infinite-list',
            title: 'InfiniteScroll 无限滚动'
          }
        ]
      },
      {
        title: "Beta",
        items: [
          {
            path: 'signature',
            title: 'Signature 电子签名',
          },
          {
            path: 'virtual-list',
            title: 'VirtualList 虚拟列表',
          },
          {
            path: 'icon',
            title: 'Icon 图标',
          }
        ]
      }
    ],
  },
};
