# schedule

日程管理软件，遵循 iCalendar 设计，支持 Event 和 Todo \
Event: 持续一段时间的事件 \
Todo: 只有结束时间的事件（Deadline）

### Quick Start
#### 新建 Schedule
1. 点击导航栏下方的 Add 按钮，打开新建 Schedule 面板
2. 输入 Name 和 rTime，点击 Comfirm 提交

| 字段 | 说明 |
| ---- | ---- |
| Name | Schedule 的名称 |
| rTime | Schedule 的时间 |
| exTime | 需要排除的时间 |
| Comment | Schedule 的备注 |

rTime 和 exTime 的语法见下方 [Grammar](#grammar)

新建完成后，Todo 会在左侧的 Todo 列表中显示，Event 会在右侧的日历中显示
右侧的日历分为 [MonthView](#monthview) 和 [WeekView](#weekview)，可以通过点击上方按钮切换

在[设置](#settings)中可以设置优先显示哪种 View

#### TodoList
1. 主页左侧面板中，显示今天及之后的 Todo 
   今天的 Todo 为橘色，明天的为黑色，之后的为灰色，过期的为红色
2. 点击右侧的开始按钮打开 [Pomodoros](#pomodoros) 页面
3. 点击右侧的 done 按钮可以完成 Todo，点击 Name 和 Deadline 进入 [Schedule](#schedule) 页面 
4. 上方的 Not Expired 和 Not Done 选项默认选中，分别隐藏已经过期和已经完成的 Todo，点击取消选中则不隐藏，方便修改已过期事件的时间和取消已完成事件的完成状态
   如果要修改今天之前的 Todo，需要在 [Database](#database) 页面中修改，还请今日事今日毕

#### MonthView
1. 一个日历，每一格表示一天，格子中显示那天的 Event
2. 鼠标悬浮在 Event 上会显示 Event 的详细信息，点击进入 [Schedule](#schedule) 页面

#### WeekView
1. 分成 n 列，每一列表示一天，列中显示那天的 Event。n 默认为 5，可以在[设置](#settings)中修改
2. Event 方块的高度表示 Event 的持续时间，位置和 Event 的开始时间和一天的开始时间有关，可以在[设置](#settings)中修改
3. 鼠标悬浮在 Event 上会显示 Event 的详细信息，点击进入 [Schedule](#schedule) 页面
4. 为了避免 Event 方块重叠导致一些 Event 被覆盖，Event 方块可以上下拖动，Event 的数据不会改变

#### Pomodoros
1. 默认按 25分钟工作 5分钟休息的方式进行番茄钟，每 4 个番茄钟休息 20 分钟，可以在[设置](#settings)中修改
2. 离开该页面视为专注结束，会被记录为该 Todo 的专注时间（少于 1 分钟不记录），可以在 [Schedule](#schedule) 页面查看
3. 左上角可以切换当前进行的 Todo
4. 右上角灯泡按钮可以记录专注时突然产生的无法快速解决的想法和问题，之后再查看、处理

#### Schedule
1. Schedule 页面显示 Schedule 的基本信息、所有时间，如果是 Todo 还会显示之前的专注记录 \
2. 右上角 Edit 按钮可以编辑 Schedule 的基本信息和时间，Delete 按钮可以删除 Schedule，其所有时间也会被删除
3. 时间列表右上角 Delete 按钮可以删除所有选中的时间，删除的时间会作为 exTime 添加到 Schedule 中

#### Database
显示所有 Schedule，点击进入 [Schedule](#schedule) 页面

#### Settings
| 字段 | 说明 |
| ---- | ---- |
| RRule.Time Zone | 当前时区 |
| RRule.WKST | 一周的第一天，默认为周一 |
| Alarm.Todo | 开启后，默认提前 5 分钟提醒 |
| Alarm.Event | 开启后，默认提前 5 分钟提醒 |
| Preference.Priority | 优先显示 MonthView 还是 WeekView |
| Preference.Week View Days | WeekView 的列数 |
| Preference.Week View Start Time | WeekView 每天的开始时间 |
| Pomodoro.Focus | 番茄钟工作时间 |
| Pomodoro.Small Break | 番茄钟休息时间 |
| Pomodoro.Big Break | 番茄钟休息时间(每 4 个番茄钟) |

### Shortcuts
| 按键 | 说明 |
| ---- | ---- |
| Ctrl + upArrow | 打开 Schedule 面板 |
| Ctrl + downArrow | 关闭 Schedule 面板 |
| Ctrl + leftArrow/rightArrow | 导航栏 tab 切换 |
| Ctrl + 1/2/3/4/5/6/7 | 下一个周一/周二/周三/周四/周五/周六/周日，和[设置](#settings)的 WKST 有关 |
| Ctrl + Enter | 提交 Schedule 面板的数据，仅在 Schedule 面板开启时有效 |

### Grammar
```bash
DateRange TimeRange (TimeZone) (RRule)
```
TimeZone 和 RRule 是可选的

#### DateRange
```bash
startDate(-endDate)
```
endDate 可以省略

- startDate: (year/)month/day
year 省略时默认为当前年份
- endDate: (year/month/)day
year, month 省略时默认为 startDate 的 year, month

1. 省略 year
   ```bash
   # 假设当前年份为 2023
   7/10      # 表示 2023/7/10
   7/10-8/10 # 表示 2023/7/10-2023/8/10
   ```
2. month year 的前置 0 可以省略
   ```bash
   2023/07/10 == 2023/7/10
   ```
3. endDate 省略 year 和 month
   ```bash
   2023/7/10-8/10 # 表示 2023/7/10-2023/8/10
   2023/7/10-20   # 表示 2023/7/10-2023/7/20
   ```
4. 特殊语法
   tdy 表示今天的日期
   tmr 表示明天的日期
   ```bash
   # 假设今天是 2023/7/23
   tdy-8/30 # 表示 2023/7/23-8/30
   tmr-30   # 表示 2023/7/24-7/30 
   ```

#### TimeRange
```bash
startTime(-endTime)
```
24 小时制
包含 startTime 和 endTime

- startTime: hour(:minute)
minute 省略时默认为 0
- endTime: hour(:minute)
minute 省略时默认为 0

1. 整点可以省略 :00，hour, minute 的前置 0 可以省略，0点 和 0分 必须保留一个 0
   ```bash
   2   # 表示 2:0 
   2:0 # 表示 02:00
   2-3 # 表示 2:0-3:0
   ```
2. endTime 可以小于 startTime，表示跨天
   ```bash
   23-2  # 表示 23:00-次日2:00
   ```
3. time 可以包含 ?, 代表不确定
minute 为 ? 时 hour 必须为 ?
   ```bash
   2:?   # 表示 2 点多
   ?:?-3 # 表示不知道开始时间，到 3 点结束
   2-3:? # 表示 2 点到 3 点多
   ```
4. 特殊语法
   s/start 表示 00:00
   e/end 表示 23:59
   ```bash
   s-3 # 表示 00:00-03:00
   3-e # 表示 03:00-23:59
   ```

#### TimeZone
支持 IANA 时区和时区缩写

例如：
- Asia/Shanghai
- CDT (Central Daylight Time)

省略时默认为当前时区
可以在 [设置](#settings)中选择当前时区

#### RRule
```bash
(FreqCode) (ByCode)
```
只有 DateRange 包含 endDate 时才有意义，因为添加一个无穷久的 schedule 失去了紧迫性，往往会明日复明日

```bash
FreqCode = Freq(,interval,count)
```
- Freq 为 daily, weekly, monthly, yearly 之一，FreqCode 省略时默认为 daily
- interval 和 count 的顺序可以交换
- interval 为正整数，表示间隔多少天/周/月/年，和 Freq 对应，省略时默认为 1
- count 为正整数，表示重复多少次，省略时默认到 [DateRange](#daterange) 的 endDate 结束

*secondly, minutely, hourly 没有意义，有这时间插入这样的 schedule 不如立刻去做，所以不支持*

```bash
daily,i2,c10 # 表示每 2 天 1 次，重复 10 次
monthly,i2   # 表示每 2 个月 1 次
```

```bash
ByCode = by[byType[byValue],byType[byValue],...]
```
- byType 之间的顺序没有意义，byValue 之间的顺序没有意义
- byType 为 month, weekno, yearday, monthday, day, setpos 之一
- byValue 为整数，合法性检查交给了 rrule 库，不合法的 byValue 会被忽略，可能会造成卡顿

| byType   | 说明 |
| -------- | ---------- |
| month    | 月份，1-12 |
| weekno   | 一年中的第几周，1-53 |
| yearday  | 一年中的第几天，1-366 |
| monthday | 一个月中的第几天，1-31 |
| day      | 一周中的第几天，1-7，默认对应 周一 - 周日，和设置中的 WKST 有关 |
| setpos   | 必须和上述几种 byType 共同使用，表示规则指定的事件集合中的第 n 个事件 |

*byhour, byminute 的作用被 [timeRange](#timerange) 代替*
*bysecond 没有意义，有这时间插入这样的 schedule 不如立刻去做，所以不支持*

```bash
by[day[1,2],month[3,4]] # 表示 3 月和 4 月的周一和周二
```

#### 案例
1. 2023/7/10 到 2023/8/10 每天 8 点到 10 点，每 2 天 1 次，重复 10 次
   ```bash
   rTime: 2023/7/10-8/10 8-10 daily,i2,c10
   ```
2. 2023/7/10 到 2023/8/10 每天 8 点到 10 点，每 2 天 1 次，重复 10 次，除了 2023/7/20-7/25
   ```bash
    rTime: 2023/7/10-8/10 8-10 daily,i2,c10
    exTime: 2023/7/20-7/25 8-10
   ```
3. 2023/7/10 到 2023/8/10 每天 8 点到 10 点，每 2 天 1 次；2023/7/20-7/25 每天 20 点到 22 点，每 2 天 1 次
   ```bash
    rTime: 2023/7/10-8/10 8-10 daily,i2;
           2023/7/20-7/25 20-22 daily,i2
   ```
4. 2023/7/1 到 2023/8/31 每月最后一个工作日的 17:00 到 18:00
   ```bash
    rTime: 2023/7/1-8/31 17-18 monthly by[day[1,2,3,4,5],setpos[-1]]
   ```


操作：-15m repeat(5m,2)


### Tech Stack
vue3-ts Pinia Vite Electron 
SQLite3 Prisma

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