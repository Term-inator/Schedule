# Schedule

用代码管理你的日程！

## 如何使用

### 关键字

add, del, delall, rename, ajust, to, id

### 语法

#### 任务名称命名规则

可以使用中文、英文、数字和下划线，不能以数字打头

#### 时间表示方法

- 年份 4位数字 yyyy
- 日期 2位月份/2位日期 MM/dd
- 时间范围 2位小时:2位分钟-2位小时:2位分钟 hh:mm-hh:mm

*注意：Schedule没有对日期和时间范围的合法性做任何检查*

#### 表示一个日程/任务 TASK

- 方式一

  年份 日期 时间范围 任务名

  ```
  2022 01/09 12:00-13:30 任务
  ```

  多个日期 多个时间范围 则用逗号分隔

  ```
  2022 01/09,01/10 12:00-13:30, 14:00-14:30 任务
  ```

  表示2022年1/9日和1/10日在12:00-13:30和14:00-14:30分别有一个名为“任务”的任务

- 方式二

  日期范围 星期（可选） 时间范围 任务名

  ```
  (2022 01/09, 2022 01/18) 12:00-13:00 任务
  ```

  表示2022年1/9日到2022年1/18日（不包括）之间的每一天的12:00-13:00有一个名为“任务”的任务

  ```
  (2022 01/09, 2022 01/18) Mon, Tue 12:00-13:00 任务
  ```

  表示2022年1/9日到2022年1/18日（不包括）之间的每个周一和周二的12:00-13:00有一个名为“任务”的任务

- 方式三

  感谢nanoid

  在成功添加任务后，每个任务都会生成一个id，可以直接用id表示那个任务
  
  ```
  id #abcdefgh, #12345678
  ```
  
  表示id为#abcdefgh和#12345678的两个任务

**后文提到的所有TASK都是指用方式一、方式二表示的任务**

#### 添加任务

1. 添加一种任务

   ```
   add TASK;
   ```

2. 添加多种任务

   ```
   add TASK & TASK & ...;
   ```

#### 删除任务

1. 删除一种任务

   ```
   del TASK;
   ```

2. 删除多种任务

   ```
   del TASK & TASK & ...;
   ```

3. 根据id删除

   ```
   del id #abcdefgh;
   ```

#### 批量删除任务

1. 删除某年某些日期的全部任务

   ```
   delall 2022 01/09, 01/10, 01/11, 01/17;
   ```

   删除2022年01/09, 01/10, 01/11, 01/17的所有任务

2. 删除某个日期范围的全部任务

   ```
   delall (2022 01/09, 2022 01/18);
   ```

   删除2022年1/9到2022年1/18日（不包括1/18）之间的所有任务

3. 删除某个日期范围的特定名字的任务

   ```
   delall (2022 01/09, 2022 01/18) 任务;
   ```

   删除该范围内名字为“任务”的任务

4. 删除某个日期范围的特定时间范围的任务

   ```
   delall (2022 01/09, 2022 01/18) 13:00-14:00;
   ```

   删除该范围内时间范围为13:00-14:00的任务

5. 删除特定名字的任务

   ```
   delall 任务;
   ```

   删除所有名字为“任务”的任务

6. 删除特定时间范围的任务

   ```
   delall 13:00-14:00;
   ```

   删除所有时间范围为13:00-14:00的任务

7. 根据多个id删除

   ```
   delall id #abcdefgh, #12345678;
   ```

   删除这些id对应的任务

#### 重命名任务

1. 根据名字重命名

   ```
   rename 任务 任务1;
   ```

   将所有名字为“任务”的任务重命名为“任务1”

2. 根据id重命名

   ```
   rename id #abcdefgh 任务1;
   ```

   将id对应的任务重命名为“任务1”

#### 调整任务时间

1. 调整TASK

   ```
   ajust TASK to 2022 01/09 13:00-14:00;
   ```

   将TASK调整到2022 01/09 13:00-14:00

   ```
   ajust TASK to 01/09 13:00-14:00;
   ```

   TASK年份不变，其他调整到01/09 13:00-14:00

   ```
   ajust TASK to 13:00-14:00;
   ```

   只调整时间范围，到13:00-14:00

2. 调整id对应的任务

   ```
   ajust id #abcdefgh to 2022 01/09 13:00-14:00;
   ```

   另外两种和上面类似

### 文法

感谢antlr4

```
program ->  ( addtasks | deltasks | delalltasks | renametask | ajusttask )*
addtasks -> ADD tasks ';'
deltasks -> DEL ( ID IDENTIFIER | tasks ) ';'
delalltasks -> DELALL ( YEAR dates | daterange | daterange? names | daterange? timeranges | ID identifiers ) ';'
renametask -> RENAME ( NAME | ID IDENTIFIER ) NAME ';'
ajusttask -> AJUST ( task | ID IDENTIFIER ) TO YEAR? DATE? timerange ';'
identifiers -> IDENTIFIER ',' identifiers | IDENTIFIER
tasks -> task '&' tasks | task
task -> YEAR dates | daterange weekdays? ) timeranges NAME 
daterange -> '(' YEAR DATE ',' YEAR DATE ')'
names -> NAME ',' names | NAME
dates -> DATE ',' dates | DATE
timeranges -> timerange ',' timeranges | timerange
timerange -> TIME '-' TIME
weekdays -> WEEKDAY ',' weekdays | WEEKDAY

ID -> 'id'
ADD -> 'add'
DEL -> 'del'
DELALL -> 'delall'
RENAME -> 'rename'
AJUST -> 'ajust'
TO -> 'to'
YEAR -> [0-9][0-9][0-9][0-9]
WEEKDAY -> 'Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | 'Sun'
NAME -> ( [_] | LETTER | CHINESE ) ( [_] | LETTER | CHINESE | DIGIT )*
DATE -> [0-9][0-9] '/' [0-9][0-9]
TIME -> [0-9][0-9] ':' [0-9][0-9]
IDENTIFIER -> [#]( LETTER | DIGIT )+

CHINESE -> [\u4e00-\u9fa5]
DIGIT -> [0-9]
LETTER -> [a-zA-Z]
```

### 待开发

[] 搜索

[] 周视图

[] 导入excel/csv 

### 说明

用户数据保存在安装目录resource下的data.json中

请妥善保管data.json

重新安装需要将data.json取出，安装完再放回，否则数据会被覆盖

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run electron:serve
```

or

```
npm run serve
```

### Compiles and minifies for production

```
npm run electron:build
```

or

```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

