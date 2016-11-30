# turntable
## 转盘
  利用jquery实现的转盘效果。
## 功能
- 转盘子元素数量可变
- 转盘中心元素显示隐藏
- 转盘子元素自身旋转
- 转盘中心元素自身旋转
- 旋转方向控制
- 旋转速率控制
- 元素事件自定义
## 使用

1. 引用js和css
```
    <script src="js/turnTable.js"></script>
    <link rel="stylesheet" href="css/turnTable.css">
```
2. 添加turntable容器
```
<body>
    <div id="turn-table"></div>
</body>
```
3. 初始化turntable
```
    <script>
        $(document).ready(function() {
            var turnTable=new TurnTable({
                domid:"turn-table",
                sub:8,
                respath:'resource'
            });           
        });
    </script>
```