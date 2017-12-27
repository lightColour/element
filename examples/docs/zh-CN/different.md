## 项目配置修改

#### 组件目录配置

新增/bb-packages目录，用于存放扩展的组件

<br/>配置文件 `build/bin/build-entry.js`

```shell
// bbplus的组件模板路径
var IMPORT_TEMPLATE_BBPLUS = 'import {{name}} from \'../bb-packages/{{package}}/index.js\';';

...

// 新增变量，存储组件路径
var ComponentPath = Object.values(Components);

...

// 新增参数 index 
ComponentNames.forEach((name, index) => {

...

// 增加条件判断，包含bb-packages路径的为bbplus增加的组件
includeComponentTemplate.push(render(ComponentPath[index].search('bb-packages') > -1 ? IMPORT_TEMPLATE_BBPLUS : IMPORT_TEMPLATE, {
  name: componentName,
  package: name
}));

...


// 将/src/bb-utils目录打包到/lib/bb-utils
bbUtilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/bb-utils/${file}`] = `element-ui/lib/bb-utils/${file}`;
});

```

#### 样式(.scss)目录配置

新增/bb-packages/bb-theme-chalk/src目录，用于存放扩展的组件样式

<br/>配置文件 `build/bin/gen-cssfile.js`

```shell
// 新增变量，用于存储组件路径
var ComponentsPath = Object.values(Components);

...

// 新增变量，扩展组件的目录
var bbBasepath = path.resolve(__dirname, '../../bb-packages/');

...

/**
 * 原始配置
 * Components.forEach(function(key) {
 *   if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
 *   var fileName = key + (isSCSS ? '.scss' : '.css');
 *   indexContent += '@import "./' + fileName + '";\n';
 *   var filePath = path.resolve(basepath, theme, 'src', fileName);
 *   if (!fileExists(filePath)) {
 *     fs.writeFileSync(filePath, '', 'utf8');
 *     console.log(theme, ' 创建遗漏的 ', fileName, ' 文件');
 *   }
 * });
 */

// 新增参数 index
Components.forEach(function(key, index) {
  if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
  var fileName = key + (isSCSS ? '.scss' : '.css');
  var bbPath = basepath;
  var bbTheme = theme;
  // 如果组件目录包含bb-packages，则加载bb-packages/bb-theme-chalk/src下的样式
  if (ComponentsPath[index].search('bb-packages') > -1) {
    indexContent += '@import "' + '../../../bb-packages/bb-theme-chalk/src/' + fileName + '";\n';
    bbPath = bbBasepath;
    bbTheme = 'bb-theme-chalk';
  } else indexContent += '@import "./' + fileName + '";\n';
  var filePath = path.resolve(bbPath, bbTheme, 'src', fileName);
  if (!fileExists(filePath)) {
    fs.writeFileSync(filePath, '', 'utf8');
    console.log(bbTheme, ' 创建遗漏的 ', fileName, ' 文件');
  }
});

```

#### 工具函数目录配置

新增/src/bb-utils目录，用于存放前端公用工具函数

<br/>配置文件 `build/config.js`

```shell
// 新增/src/bb-utils目录
var bbUtilsList = fs.readdirSync(path.resolve(__dirname, '../src/bb-utils'));

...

// 将/src/bb-utils目录打包到/lib/bb-utils
bbUtilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/bb-utils/${file}`] = `element-ui/lib/bb-utils/${file}`;
});

```
