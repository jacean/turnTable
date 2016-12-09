# turntable
## 转盘
  利用jquery实现的转盘效果。
>  [GitPage]( https://jacean.github.io/turntable/)页面访问
## 功能

- 转盘子元素数量可变
- 转盘中心元素显示隐藏
- 转盘旋转
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
- 基础使用:3个必须参数
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
- 自定义使用:参数可选
```
    <script>
        $(document).ready(function() {
            var turnTable=new TurnTable({
                domid:"turn-table",
                sub:{
                    subnum:8,
                    rotate:true,
                    direct:"right",
                    bind:{
                        mouseover:function(){
                            console.log("sub-over");
                        }
                    }
                },
                respath:"resource",
                speed:9,
                radius:100,
                center:{
                    display:"show",
                    rotate:true,
                    direct:"left",
                    bind:{
                        click:function(){
                            console.log("center-click");
                        },
                        mouseover:function(){
                            console.log("center-over");
                        }
                    }
                }
            });
           
        });
    </script>
```
