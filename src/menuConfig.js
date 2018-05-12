// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  // {
  //   name: '首页',
  //   path: '/index',
  //   icon: 'home',
  // },
  {
    name: '退出',
    path: '/',
    icon: 'backward',
  },
];

const asideMenuConfig = [
  {
    name: '图书管理',
    path: '/index',
    icon: 'home',
  },
  {
    name: '用户管理',
    path: '/user',
    icon: 'yonghu',
  },
  {
    name: '系统设置',
    path: '/setting',
    icon: 'shezhi',
    children: [
      {
        name: '基本设置',
        path: '/base',
      },
      {
        name: '评论设置',
        path: '/comment',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
