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