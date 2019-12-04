export default [
    {
        title: 'sub1',
        key: 'sub1',
        level: 1,
        icon: 'home',
        childMenus: [
            {
                title: 'sub2',
                key: 'sub2',
                url: '/', // 选项要到达的地址
                level: 2,
            }
        ]
    },
    {
        title: 'sub3',
        key: 'sub3',
        level: 1,
        icon: 'hdd',
        childMenus: [
            {
                title: 'sub4',
                key: 'sub4',
                url: '/', // 选项要到达的地址
                level: 2,
            }
        ]
    }
];
