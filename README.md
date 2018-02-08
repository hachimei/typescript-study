[Ant Design of React](http://design.alipay.com/develop/web/docs/introduce)下面简称为“antd”

 ![antd-of-React](D:\photo\antd\01\antd-of-React.png)

GitHub上的[antd](https://github.com/ant-design/ant-design)是用typescript实现的，目前我在学习typescript，因此fork了一份antd的源码。学习过程中发现学习曲线很陡峭，不适合新手，因此想把antd中适合新手的东西（各个组件的typescript源码）剥离出来，做到零配置,方便学习。

我的想法是:

1. 不使用less，直接使用antd.min.css文件; 

2. 只提取antd源码中的src文件夹下的tsx文件和测试文件  <br>  ![hachimei-project-src](D:\photo\antd\01\hachimei-project-src.png)

3. 使用Facebook的creat-react-app工具(下面简称为CRA)创建项目，CRA帮我们的项目配置了开发用的服务器（该服务器还能热替换）、集成了Jest测试环境、集成了tslint代码规范、 webpack也配置好了。新手不用关心配置文件，上来就是编码和学习，Perfect ！

   ---

   **进入正题，新手如何创建一个项目来学习antd源码？**

   1. Windows打开命令行工具，进入项目根目录，输入命令，可以把 my-app 换成你想要的项目名，

   ```
      create-react-app my-app --scripts-version=react-scripts-ts
   ```


​	如果提示create-react-app 不是可用的，说明要安装CRA（-g 表示全局安装）

```
npm install create-react-app -g
```

​        如果你没有安装npm，那么就去百度一下安装node

​	2. 步骤1 生成的目录结构如下：  ![CRA-TS](D:\photo\antd\01\CRA-TS.png)

​	这里我把tslint.json的内容删掉了，只留下花括号，这么做是为了方便后面我们复制粘贴代码。

tslint是定义代码规范的，一旦代码不规范就会出现红色标识，很难看，干脆就不要tslint了。

​	3.在src目录下新建components文件夹，复制antd源码中src/components/icon下的index.tsx还有tests目录下的index.test.tsx文件，打开文件发现： ![icon-index](D:\photo\antd\01\icon-index.png) ![icon-test](D:\photo\antd\01\icon-test.png)

红色箭头是antd源码中没有的，我自己琢磨着加的。

红色波浪线表示相关模块没有安装，或者是该模块没有tsd文件，先安装模块：

```
npm install classnames omit.js
```

```
npm install enzyme enzyme-adapter-react-16 react-test-renderer --save-dev
```
​	4.安装后发现红色波浪线还在，这是因为我们安装的模块没有相应的声明文件，这里有个解决方法：建立一个和src同级的typings文件夹，新建index.d.ts，内容是：

```
/// <reference path="custom-typings.d.ts" />
```

新建custom-typings.d.ts，内容是：
```
declare module 'classnames';

declare module 'omit.js';

declare module 'enzyme';

declare module 'enzyme-adapter-react-16';

declare module 'react-test-renderer'; 
```
​	5. 回到icon下的index.tsx，发现

```
import * as React from 'react';
```

以前我不是这样写的，是这样的：

```
import React from 'react';
```

不仅仅是react，很多模块都要换成新写法，这让我很难受，因此我设置成了以前的写法，找到根目录下的tsconfig.js和tsconfig.test.js,把module的值替换成'es2015':
```
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "outDir": "build/dist",
    "module": "es2015",
    "target": "es5",
    ……
```
```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "es2015"
  }
}
```

然而vscode编辑器还会有红色波浪线错误，只有react是个特例,我不懂为什么,导入React就按新写法来,其他模块用原来写法。为什么可以这么改呢？我会把相应的资源链接放在最下面，请自行理解。

这一步可以解决类似"omit.js._default is not a function"的错误

6.Icon引入后,可以运行 npm test ,test运行成功代表上面的步骤你很好地执行了;我们接下来看看Icon的效果,编辑 App.tsx, 新增以下语句:
```
import './components/style/antd.min.css'
import Icon from  './components/icon';

<p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
          <Icon type="book" />
        </p>
```
运行 npm start , 会发现book图标出现了. 
这里要注意,我们引入了antd.min.css样式文件,它定义了antd的组件样式,是antd的最终产物之一.可以通过 npm install antd ,安装后在antd 的 dist 目录下找到它. ![antd-product](D:\photo\antd\01\antd-product.png)

7.我们接着引入button组件, 把button目录下的index.tsx, button.tsx, button-group.tsx 复制到自己项目下,编辑 button.tsx , 删掉其中的
```
import PropTypes from 'prop-types';

static propTypes = {
    type: PropTypes.string,
    shape: PropTypes.oneOf(['circle', 'circle-outline']),
    size: PropTypes.oneOf(['large', 'default', 'small']),
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: PropTypes.func,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    className: PropTypes.string,
    icon: PropTypes.string,
  };
```

prop-types是运行时的类型检查,我觉得有typescript就够了.
8.现在试试button的效果,编辑App.tsx:
```
import Button from "./components/button";
<Button type='danger' icon='search'>Antd</Button>
```
运行 npm start 即可在浏览器中看到效果.

9.接下来编辑button的测试文件,复制antd源码button目录下的test目录下的index.test.tsx,新增语句如下:

```
import { render, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```
最新版的enzyme需要这样设置.

运行 npm test 查看测试情况

10.总结一下,上面是把antd源码中的icon和button组件以及它们的测试文件剥离出来,运行在自己的项目当中, 研究antd的设计人员开发组件的思想, 这对我们学习typescript , react组件开发很有帮助.

**使用的编辑器**-VSCode

**推荐阅读**

[Antd官网](http://design.alipay.com/develop/web/docs/introduce)

[typescript中文官网](https://www.tslang.cn/docs/handbook/basic-types.html)

[翻译 | 开始使用 TypeScript 和 React](https://www.v2ex.com/t/391905)

[Jest snapshot testing(英文)](https://facebook.github.io/jest/docs/en/snapshot-testing.html)

[enzyme英文官网](http://airbnb.io/enzyme/)