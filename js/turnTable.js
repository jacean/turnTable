;

//每个小模块自带div-class .turn-table
(function(){

})();
var defaultOptions={
    domid:false,
    sub:false,
    respath:false,
    radius:100,
    center:false,
    speed:9,    
}

var TurnTable=function(opts){
    var _init=new Object();
    var options=$.extend({},defaultOptions,opts);
    if(options.domid==false){
        console.log("turntable init arguments error:TurnTable dom");
        return;
    }
    if(options.sub==false){
        console.log("turntable init arguments error:TurnTable sub");
        return;
    }
    
    var domid=options.domid;
    var speed=options.speed;
    var radius=options.radius;

    var p=0;
    var p_center=0;
    var p_sub=0;
    var isAnimate=false;
    var xcenter=0;
    var ycenter=0;

    var STEP=360/1;

    function step(x){
        var step=(STEP*x)*(2*Math.PI/360);
        return step;
    }
    function coord(x){
        var r=radius;//旋转半径
        var sub_r=25;//旋转子元素的半径
        var newLeft = Math.floor(xcenter + (r* Math.cos(p+step(x))));
        var newTop = Math.floor(ycenter + (r * Math.sin(p+step(x))));
        return {
            l:newLeft-sub_r,
            t:newTop-sub_r
        }
    }
    function setCenter(){   
        if(!options.center)return;     
        var _center=options.center;
        var center={
            res:"",
            display:"show",
            rotate:false,
            direct:"right",
            bind:{},
            radius:25
        }
        if(typeof _center=="string"){
            center.res=_center;
        }
        if(typeof _center=="object"){
            $.extend(center,_center);
        }

        var turn_center=loadCenterDom(center); 

        /**display */
        turn_center.addClass('turn-table-center-'+center.display);
        /**rotate&direct */
        if(center.rotate){
            rotateCenter(center.direct);
        }
        /**bind */            
        var bind="turn_center";
        var event="";
        for(var k in center.bind){
            event+="."+k+"("+center.bind[k]+")";
        }
        if(event!="")
        {
            bind+=event;
            try{
                eval(bind);
            }catch(e){
                console.log(e);
            }
        }      
        
 
    }
    function rotateCenter(d){
        if(d=="right"){
            p_center+=2;
        }else{
            p_center-=2;
        }
        $('.turn-table-center').css('transform','rotate('+ p_center +'deg)');     
        $(".turn-table-center").animate({
                temp:p_center
            },10,function(){
                rotateCenter(d);
            });
    }
    function loadCenterDom(center){
        var turn_table=$("#"+domid);
        turn_table.append(
            "<div id='turn-center' class='turn-table-center'></div>"
        );

        var center_r=center.radius;
        $(".turn-table-center").css('left',xcenter-center_r).css('top',ycenter-center_r);

        var turn_center=$(".turn-table-center");
        turn_center.append(
            "<img  src='"+center.res+"' alt='center'/>"
        );
        return turn_center;
    }

    function initTable(){
        var turn_table=$("#"+domid);
        turn_table.addClass("turn-table");
        /**
         * 设置中心点
         */
            var margin=30;
            var center_r=25;
            xcenter=radius+margin;
            ycenter=radius+margin;
        /** */  
    }
    function loadSubDom(res){
        var turn_table=$("#"+domid);
        var num=res.length;
        for(var j=0;j<num;j++){
            turn_table.append(
                "<div id='turn-sub-"+j+"' class='turn-table-sub'></div>"
            );
        }
        var turn_subs=$(".turn-table-sub");
        var k=0;
        $.each(turn_subs,function(){
            $(this).append(
                "<img src='"+res[k]+"' alt='sub-"+k+"'/>"
            );
            k++;
        });
        return turn_subs;
    }
    function setSub(){
        var _sub=options.sub;
        var sub={
            res:[],
            repeat:false,
            rotate:false,
            direct:"right",
            bind:{},
            speed:9,
            display:"show"
        }
        var repeat=false;
        /**可以只提供资源图片数组
         * {
         *      subnum:num
         *      res:[
         *          1.png,
         *          2.png
         *      ]
         *      rotate:true/false,
         *      direct:left/right,
        //  *      speed:0-9,
        //  *      icon:turn-table-center|custom,
         *      bind:{
         *          click:function,
         *          mouseover:function,
         *          mouseout:function
         *      }
         * }
         */
        if($.isArray(_sub)){
            sub.res=_sub;
        }else if(typeof _sub=="object"){
            if(_sub.res=="undefined"){
                console.log("arguments error:lose res");
                return false;
            }
            $.extend(sub,_sub); 
            repeat=typeof sub.repeat=="undefined"?false:sub.repeat;
            if(!!repeat&&sub.res.length==1){
                for(var i=1;i<repeat;i++){
                    sub.res[i]=sub.res[0];
                }
            }

        }           
        if(sub.res.length==0){
            console.log("res load error");
            return;
        }    

        STEP=360/sub.res.length;
        var turn_subs=loadSubDom(sub.res);
         /**bind event*/            
        var bind="$(this)";
        var event="";
        for(var k in sub.bind){
            event+="."+k+"("+sub.bind[k]+")";
        }
        if(event!="")
        {
            bind+=event;
            try{
                $.each(turn_subs,function(){
                    eval(bind);
                });                
            }catch(e){
                console.log(e);
            }
        }
        /**rotate */
        if(sub.rotate){
            rotateSub(sub.direct);
        }
        /**display */
        if(sub.display=="show"){
            turn_subs.removeClass("turn-table-sub-hide");
        }else{
            turn_subs.addClass("turn-table-sub-hide");
        }

    }
    function rotateSub(d){
        if(d=="right"){
            p_sub+=2;
        }else{
            p_sub-=2;
        }
        $('.turn-table-sub').css('transform','rotate('+ p_sub +'deg)');     
        // $(".turn-table-sub").animate({
        //         temp:p_sub
        //     },10,function(){
        //         rotateSub(d);
        //     });
        setTimeout(function() {
            rotateSub(d);
        }, 10);
    }
    function rotateTable(){

        if(speed>9){speed=9}
        if(speed<1){speed=0}
        var duration=10-speed;//0-0,1-90,2-80
        var turns=$(".turn-table-sub");
        var i=0;
        p+=0.02;
        if(speed==0){
            p=0.00;
            $.each(turns,function(){

                $(this).animate({
                    top:coord(i).t,
                    left:coord(i).l
                });
                i++;
            });
        }
        else{
            $.each(turns,function(){

                $(this).animate({
                    top:coord(i).t,
                    left:coord(i).l
                },10*duration,function(){
                    rotateTable();
                });
                i++;

            });
        }
        isAnimate=true;

    }
    function clearAnimate(){
        var turns=$(".turn-table-sub");
         $.each(turns,function(){
                $(this).stop(true);
            });
            isAnimate=false;
    }
    function bindEvent(){
        var turns=$(".turn-table-sub");
        $.each(turns,function(){
            $(this)
            .mouseover(function(){
                        // var oldWid=$(this).width();
                        // var oldHei=$(this).height();
                        // $(this).width(oldWid+20);
                        // $(this).height(oldHei+20);
                        // var oldLeft=$(this).position().left;
                        // $(this).css("left",oldLeft-10);
                        // var oldTop=$(this).position().top;
                        // $(this).css("top",oldTop-10);
                        if(!$(this).hasClass('turn-table-sub-hover')){
                            $(this).addClass("turn-table-sub-hover");
                        }
                    })
            .mouseout(function(){
                        // var oldLeft=$(this).position().left;
                        // $(this).css("left",oldLeft-10);
                        // var oldTop=$(this).position().top;
                        // $(this).css("top",oldTop-10);
                        // var oldWid=$(this).width();
                        // var oldHei=$(this).height();
                        // $(this).width(oldWid-20);
                        // $(this).height(oldHei-20);
                        // console.log(oldWid+":"+oldHei);
                        $(this).removeClass("turn-table-sub-hover");
            })
            .click(function(){
                        if(isAnimate){
                            clearAnimate();
                        }else{
                            rotateTable();
                        }
                        
                    });

        });
    }


    _init.init=function(){
        initTable();
        setCenter();
        setSub();
        bindEvent();
        rotateTable();
    }
    _init.rotate=function(){

    }
    _init.init();
    return _init;
}
   

