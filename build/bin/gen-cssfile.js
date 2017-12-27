var fs = require('fs');
var path = require('path');
var Components = require('../../components.json');
var themes = [
  'theme-chalk'
];
// 新增变量，用于存储组件路径
var ComponentsPath = Object.values(Components);
Components = Object.keys(Components);
var basepath = path.resolve(__dirname, '../../packages/');
// 新增变量，扩展组件的目录
var bbBasepath = path.resolve(__dirname, '../../bb-packages/');

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

themes.forEach((theme) => {
  var isSCSS = theme !== 'theme-default';
  var indexContent = isSCSS ? '@import "./base.scss";\n' : '@import "./base.css";\n';
  // 新增参数 index
  Components.forEach(function(key, index) {
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
    var fileName = key + (isSCSS ? '.scss' : '.css');
    var bbPath = basepath;
    var bbTheme = theme;
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
  fs.writeFileSync(path.resolve(basepath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'), indexContent);
});

