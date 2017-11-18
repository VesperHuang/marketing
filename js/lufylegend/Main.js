init(50,"mylegend",600,600,main);

var loadingLayer;
var backLayer;
var stopLayer;
var startLayer;
var loadIndex = 0;
var imglist = {};
var btnup,btndown,btnleft,btnright;
var imgData = new Array();

var mapImgList = new Array();
var mapmoveflag = "";
var MOVE_STEP = 10;

var combination = new Array([1,2,1], [1,2,3], [1,2,1], [2,1,4], [2,3,3], [2,4,1], [2,3,4], [1,3,3], [4,1,3], [3,2,1], [4,1,2],[4,2,3], [4,2,1], [4,1,3], [2,1,1], [3,2,4], [4,3,2], [2,1,1], [1,1,1], [3,1,1]);
var reels = new Array();
var kakes = new Array();
//停止ボタン参照用配列
var stopBtn = new Array();
var start;
var win;
var theTextField;
var giftName;
var giftPic;
var msg;

function main(){
	imgData.push({name:"stop_up",path:"./images/slot_stop_up.png"});
	imgData.push({name:"stop_over",path:"./images/slot_stop_over.png"});
	imgData.push({name:"start",path:"./images/slot_start.jpg"});
	imgData.push({name:"kake",path:"./images/slot_kake.png"});
	imgData.push({name:"slot_back",path:"./images/slot_back.jpg"});
	imgData.push({name:"slot_ok",path:"./images/slot_ok.png"});
	imgData.push({name:"item1",path:"./images/1.png"});
	imgData.push({name:"item2",path:"./images/2.png"});
	imgData.push({name:"item3",path:"./images/3.png"});
	imgData.push({name:"item4",path:"./images/4.png"});


	loadingLayer = new LoadingSample1();
	addChild(loadingLayer);	
	LLoadManage.load(
		imgData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		function(result){
			imglist = result;
			removeChild(loadingLayer);
			loadingLayer = null;
			gameInit();
		}
	);
}
function gameInit(event){
	var i,j,bitmap,bitmapdata,childmap;
	
	backLayer = new LSprite();
	addChild(backLayer);

	bitmapdata = new LBitmapData(imglist["slot_back"]);
	bitmap = new LBitmap(bitmapdata);
	backLayer.addChild(bitmap);
	
	stopLayer = new LSprite();
	addChild(stopLayer);
	for(i=0;i<1;i++){
		
		//var kake = new LBitmap(new LBitmapData(imglist["kake"]));
		//kake.x = 150 * i + 90;
		//kake.y = 225;
		//kakes.push(kake);
		//addChild(kake);

		var reel = new Reel(combination,i);
		reel.x = 150 * i + 110;
		reel.y = 225;
		reels.push(reel);
		addChild(reel);
		
		var stop = new LButton(new LBitmap(new LBitmapData(imglist["stop_up"])),new LBitmap(new LBitmapData(imglist["stop_over"])));
		stop.x = 150 * 1 + 110;
		stop.y = 490;
		stop.index = i;
		stopBtn.push(stop);
		stop.visible = false;
		stop.addEventListener(LMouseEvent.MOUSE_UP, stopevent);
		addChild(stop);
	}

	startLayer = new LSprite();
	addChild(startLayer);
	start = new LButton(new LBitmap(new LBitmapData(imglist["start"])),new LBitmap(new LBitmapData(imglist["start"])));
	start.x = 55;
	start.y = 450;
	startLayer.addChild(start);
	start.addEventListener(LMouseEvent.MOUSE_UP, onmouseup);
	
	win = new LButton(new LBitmap(new LBitmapData(imglist["slot_ok"])),new LBitmap(new LBitmapData(imglist["slot_ok"])));
	startLayer.addChild(win);
	win.visible = false;
	win.addEventListener(LMouseEvent.MOUSE_UP, winclick);
		
  theTextField = new LTextField();
  theTextField.x = 95;
  theTextField.y = 200;
  theTextField.font = "Georgia";
  startLayer.addChild(theTextField);	
  theTextField.visible=false;	
	
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
}
function onframe(){
	var i;
	for(i=0;i<1;i++){
		reels[i].onframe();
	}
}
function stopevent(event,currentTarget){
  console.log("stopevent....");
	reels[currentTarget.index].stopFlag = true;
}
function onmouseup(event){

  console.log("onmouseup....");
	var i;
	var stopNum = Math.floor(Math.random()*(combination.length/1));
	//var stopNum = 8;
	start.visible = false;
	for(i=0;i<1;i++){
		stopBtn[i].visible = true;
		reels[i].startReel = true;
		reels[i].stopFlag = false;
		reels[i].stopNum = stopNum;
		console.log("result:" + reels[i].combination[stopNum][0]);
		giftName = getGiftName(reels[i].combination[stopNum][0]);
	}
	
	//console.log("stopNum...." + stopNum);
}

function getGiftName(giftNo)
{
	giftPic = null;
	
	var result = "";
  switch(giftNo)
  {
    case 1:
      giftPic = new LButton(new LBitmap(new LBitmapData(imglist["item4"])),new LBitmap(new LBitmapData(imglist["item4"])));
  		result = "夏日谅扇";
      break;
    case 2:
      giftPic = new LButton(new LBitmap(new LBitmapData(imglist["item1"])),new LBitmap(new LBitmapData(imglist["item1"])));
  		result = "垫板";  
      break;
    case 3:
      giftPic = new LButton(new LBitmap(new LBitmapData(imglist["item2"])),new LBitmap(new LBitmapData(imglist["item2"])));
    	result = "加油棒";
      break;
    case 4:
      giftPic = new LButton(new LBitmap(new LBitmapData(imglist["item3"])),new LBitmap(new LBitmapData(imglist["item3"])));
    	result = "书签尺";  
      break;      
  }
	giftPic.x = 80;
	giftPic.y = 250;
  startLayer.addChild(giftPic);
  giftPic.visible=false;	  
  
  return result;
}

function winclick(){

	var branch = $("#collectlist-branch_id").val();	
	var mobile = $("#collectlist-mobile").val();
	
	console.log("winclick....");
	
	if( branch != "" && mobile != "" ){
			var options = {
       	  url: Marketing.configuration.marketingUrl + "CollectListUpdate/",
          requestType: "POST",
          dataType: "JSON",
          data: {
         		Branch:branch,
           	Mobile: mobile,
           	GiftName: giftName                 	
           },                   
          callBack: fnPostCallBack				
			};          	
  		Marketing.dataAccess.callService(options);
	}
	
	closeLufylegend();
	win.visible = false;
	theTextField.visible=false;	
	giftPic.visible=false;
	start.visible = true;
	
}

function fnPostCallBack(result) {
    if (result.data.Message === "true") {
        msg ="储存成功！！";
    } else {
        msg ="储存失败！！";
    }	
		$("#collectlist-btn-clearn").click();
}


function checkWin(){

  console.log("checkWin....");
	var i;
	var allstop = 0;
	for(i=0;i<1;i++){
		if(!reels[i].startReel)allstop++;
	}
	if(allstop >= 1){
		for(i=0;i<1;i++){
			stopBtn[i].visible = false;
		}

		//20151013 Monica 停留十秒才秀出结果  		
		//for (j=0;j<=10000;j++){
			//if(j==10000){
  		  theTextField.htmlText = "<font color='#FCFF19' size='24'><i>恭喜您得到 "+ giftName +" 精美礼品一份！！</i></font>";

  			win.visible = true;
  			theTextField.visible=true;	
  			giftPic.visible=true;
  			start.visible = true;
			//}
		//}
	}
}