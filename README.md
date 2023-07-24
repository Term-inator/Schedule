# schedule

An Electron application with Vue and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
cd ./src/prisma
npx prisma db push
```

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

### Tech Stack
vue3-ts pinia vite electron 
sqlite3 Prisma


### Grammar

名称
// 事件类型(event, todo)
YYYY/MM/DD(-YYYY/MM/DD) HH:MM(-HH:MM) (TZ) (daily,i2,c10) (by[day[weekday],month[],setpos[]]);
BYMONTH, BYWEEKNO, BYYEARDAY, BYMONTHDAY, BYDAY, ~~BYHOUR, BYMINUTE, BYSECOND~~，BYSETPOS
// 禁止无穷久
comment
操作：display or audio(-15m) repeat(5m,2)

// 持续几天的 event 没有意义
2023/7/10 22:00 Asia/Shanghai;
所有删掉的就是 exrule


perf:
schedule info 显示 done, created, updated, deleted
addModal的快捷键 比如ctrl+add打开，ctrl+close关闭，ctrl+enter 确认
deadline 可以不显示年份（加在设置里？）
month view hover 显示全名（目前几乎都显示不全）
到第二天重新获取数据，尤其是 week view
Modal 可拖动？有点遮挡视线
修改 todolist done 的宽度
成功/失败的提示
左右切换 tab ?

time sugar: end=23:59 start=0:00
date sugar: year可以省略，默认今年
优化 edit，如果没有变化就不修改

test代码换掉 moment 库
action 的解析

ctrl 1-7 next 1-7
