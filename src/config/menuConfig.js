// 只有第一级选项才有icon
export default [
    {
        name: 'Home',
        key: 'Home',
        level: 1,
        icon: 'home',
        childMenus: [
            {
                name: 'page2',
                key: 'page2',
                url: '/page2', // 选项要跳转的地址
                level: 2,
            },
            {
                name: 'home-1',
                key: 'home-1',
                url: '/home', // 选项要跳转的地址
                level: 2,
            }
        ]
    },
    {
        name: 'page3-c',
        key: 'page3-c',
        level: 1,
        icon: 'hdd',
        childMenus: [
            {
                name: 'page3',
                key: 'page3',
                url: '/page3', // 选项要跳转的地址
                level: 2,
            }
        ]
    }
];
