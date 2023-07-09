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


vue3-ts vite electron antlr sqlite3 TypeORM


### Grammar
string ID = "xxx";
date ID = DDDD/DD/DD;
day ID = Mon | Tue | Wed | Thur | Fri | Sat | Sun;
day[] ID = [day, day, ...]
time = date DD:DD-DD:DD; | date DD:DD;
time[] t = range(time, time, day[]); | range(time, time);
task ID = time string;
task[] ID = time[] string;
create(task[]);
remove(task[]);
update(task[], string, string);
delete(task[]);
select(string, string[], ...) -> task[];
select() -> task[];
print(task[]);

ID: [a-zA-Z]+[a-zA-Z0-9]*;
idValue: '#' ALPHANUM+;
ALPHANUM: [a-zA-Z0-9]+;


schedule
id, begin_time, end_time, name, comment, create_time, update_time, uid

time

名称
// 事件类型(event, todo)
YYYY/MM/DD(-YYYY/MM/DD) HH:MM-HH:MM (TZ) (daily,i2,c10 by[day[weekday],month[],setpos[]]);
BYMONTH, BYWEEKNO, BYYEARDAY, BYMONTHDAY, BYDAY, ~~BYHOUR, BYMINUTE, BYSECOND~~，BYSETPOS
// 禁止无穷久
comment
操作：display or audio(-15m) repeat(5m,2)

保存

// 持续几天的 event 没有意义