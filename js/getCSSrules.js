;


function getCSSrules(cssfile){
    var cssfiles=document.styleSheets;
    var cssrules=[];
SETCSSOBJECT:
    for(var i=0;i<cssfiles.length;i++){
        var csspath=cssfiles[i];
        var csstext=csspath.ownerNode.outerHTML.replace(/</,'').replace(/>/,'').replace(/link /,'').trim().split(" ");
        var attr;
        for(var j=0;j<csstext.length;j++){
            attr=csstext[j].split("=");
            if(attr[0]=="href"){
                if(attr[1].replace(/'/g,"").replace(/"/g,'')==cssfile){
                    cssrules=csspath.cssRules||csspath.rules;
                    break SETCSSOBJECT;
                }
            }
        }        
    }

    var cssattr=new Object();
    if(cssrules.length>0){
        for(var k=0;k<cssrules.length;k++){
            var key=cssrules[k].selectorText;
            var values=cssrules[k].cssText;
            values=values.substring(values.indexOf('{')+1,values.indexOf('}')).trim().split(";");;
            var prot=new Object();
            for(var x=0;x<values.length;x++){
                var attrs=values[x].split(":");
                if(attrs.length>1){                   
                    prot[attrs[0].trim()]=attrs[1].trim();
                }
            }
            cssattr[key]=prot;
        }
    }
    return cssattr;

}


