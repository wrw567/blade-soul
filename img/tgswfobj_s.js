var getFlashVersion= function(){
var hasFlash=0;　　　　//是否安装了flash
var flashVersion=[0];　　//flash版本
if(document.all){var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); if(swf) {hasFlash=1;var VSwf=swf.GetVariable("$version");flashVersion=VSwf.split(" ")[1].split(",");}}
else{if (navigator.plugins && navigator.plugins.length > 0){var swf=navigator.plugins["Shockwave Flash"];if (swf){hasFlash=1; var words = swf.description.split(" "); for (var i = 0; i < words.length; ++i){  if (isNaN(parseInt(words[i]))) continue; flashVersion=words[i].split(".")}	}}}
return {f:hasFlash,v:flashVersion};
}
var swfIDDic={}
var getSwfObj= function(id){
	 return document[swfIDDic[id]];
};

var needHSwfId
var needHmin
var needHmax
var setHeight=function(){
	var height=document.documentElement.clientHeight||window.innerHeight;
if(needHmin&&height<needHmin){height=needHmin}
 if(needHmax&&height>needHmax){height=needHmax}
	document.getElementById(needHSwfId) && (document.getElementById(needHSwfId).style.height=height-42+"px");
}

function setSWFHeight(id,min,max){
needHSwfId=id;
needHmin=min;
needHmax=max;
window.onresize=setHeight;
if(navigator.userAgent.indexOf('MSIE 6')!=-1){
	window.attachEvent("onresize",setHeight);
}
setHeight();

}
function hackSwfHide(able){if(able){document.body.style.overflowX="hidden";}else{document.body.style.overflowX="auto";}}
var getSwfStr=function(swfid,url,width,height,flashvars,params){
		var v='', fv='';
		for(var i in flashvars){fv +="&"+i+"="+flashvars[i];}
		this.opt={'base':'','wmode':'transparent','allowfullscreen':'true','allowScriptAccess':'always','quality':'high'}//Window Opaque Transparent
		for(var i in params){this.opt[i] = params[i];}
		this.opt["flashvars"]=fv;
		v+='<object id="'+swfid+'" name="'+swfid+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+width+'" height="'+height+'">';
		v+='<param name="movie" value="'+url+'" />';
		for(var i in opt){v+='<param name="'+i+'" value="'+this.opt[i]+'" />';}
		v+='<embed id="'+swfid+'_embed" name="'+swfid+'_embed" src="'+url+'" width="'+ width +'" height="'+ height +'"';
		for(var i in opt){	v+=i+'="'+this.opt[i]+'" ';	}
		v+='type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
	//	alert(v)
		return v;
}
function insertSwfV2(elm,url,width,height,flashvars,params,version){
	if(!document.getElementById(elm))return;
	var swfid=elm+"_swf";
	if(document.getElementById(swfid))swfid+=("_"+Math.random());
	swfIDDic[elm]=navigator.appName.indexOf("Microsoft") != -1?swfid:swfid+"_embed";
	var fver=getFlashVersion();
	var ver=[10];
	if(version){ver=version.split(".")};
	var isVer=fver.f
	if(isVer){
		for(var i=0;i<ver.length;i++){
		if(parseInt(fver.v[i])<parseInt(ver[i])){isVer=false;break}
		}
	}
	if(isVer) {
		document.getElementById(elm).innerHTML=getSwfStr(swfid,url,width,height,flashvars,params);
	}else{
		document.getElementById(elm).innerHTML='<div id="noflash" ><p>你浏览器的flash插件版本低于'+version+';请先下载最新的Flash插件--><a href="http://get.adobe.com/flashplayer/" target="_blank" title="下载最新的Flash插件"><img src="http://ossweb-img.qq.com/images/xy/web200907/images/flashLogo.gif" align="absmiddle" target="_blank" />点击下载</a></p> </div>'
	}
}
/*  |xGv00|8d07ce163156e7f49a96f853e77c20f1 */