var myGamePiece;
var isPlay = 0;
var listColor = ["#bc1818","#d66d91","#f2c4e4"];
var count = 0;
var listWords;
var numPiece = 20;
var listIndex;
function loadIrregular(){
    $.ajax({
           url: '/Zendapp/fronten/ajax/loadirregular', // localhost/Demo/public/foo/insert
           type: 'POST',
           dataType: 'json',
           data: { id: 123, name: "Yin Yang"},
           success: function(data) {
               listWords = data;
               console.log("list Words length = "+listWords.length);
               listIndex = randNums(numPiece, listWords.length - 1);
               //console.log(JSON.stringify(data));
               myGamePiece = new component(300, 300, 300);
               myGameArea.start();
    
               
           },
           error:function(xhtm,textStt,err){
               console.log("---XHTML----");
               console.log(xhtm);
               console.log("---STATUS---");
               console.log(textStt);
               console.log("---ERROR--");
               console.log(err);
               console.log("_____________");
           }    
   });
}
function startGame() {
    loadIrregular();
    
//    myGamePiece = new component(300, 300, 300);
//    myGameArea.start();
//    
}

var myGameArea = {
    canvas : null,//.getElementsByClassName("canvas")[0],
    start : function() {
        this.canvas = document.getElementById("wheel")
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        //document.getElementById("game-area").insertBefore(this.canvas, document.getElementById("game-area").childNodes[1]);
        this.frameNo = 0;
        
        this.interval = setInterval(updateGameArea, 20);
        isPlay = 1;
        count = 0;
    },
    stop : function() {
        clearInterval(this.interval);
        isPlay = 0;
        count = 0;
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function play(){
    if(isPlay != 1){
        count = 0;
        myGameArea.interval = setInterval(updateGameArea, 20);
        isPlay = 1;
    }
}
function pause(){
    clearInterval(myGameArea.interval);
    isPlay = 0;
}
function piece(tex, r, color, startP, wArc,x,y){//wArc: So do goc cung tron
    ctx = myGameArea.context;
    ctx.save();
    //ctx.translate(x,y);
    ctx.rotate(startP*Math.PI/180);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.arc(0,0,r,-wArc*Math.PI/360,wArc*Math.PI/360);
    ctx.closePath();
    ctx.fill();
    ctx.translate(r,0);
    ctx.rotate(Math.PI);
    ctx.textAlign = "left";
    ctx.strokeText(tex,10,0);
    ctx.restore();
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function isExisted(i,arr){
    for(x in arr){
        if(arr[x] == i){
            return true;
        }
    }
    return false;
}
function randNums(num,max){
    temp = [];
    while(temp.length < max){
        i = getRndInteger(0,max);
        console.log(i);
        if(!isExisted(i,temp)){
            temp.push(i);
        }
    }
    console.log("temp: "+temp);
    return temp;
}
function component(r, x, y) {
    this.angle = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle);
        witArc = 360/numPiece;
        for(i=0;i<numPiece;i++){
            piece(i +": "+listWords[listIndex[i]].simple,r,listColor[i%3],i*witArc,witArc,this.x,this.y);
        }
        ctx.beginPath();
        ctx.arc(0,0,50,0,2*Math.PI);
        ctx.fillStyle = "#A09AFF";
        ctx.fill();
        ctx.strokeStyle = "#8e0101";
        ctx.stroke();
        //piece("Hello",150,"#000AD0",0,20,this.x,this.y);
        //piece("MOrning",150,"#0098D0",20,20,this.x,this.y);
        ctx.restore();
        pointer(50,50);
//        ctx.fillStyle = "red";
//        ctx.textAlign = "left";
//        ctx.fillText("Angle = "+this.angle,20,20);
         
    }
}
function pointer(x,y){
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(x, y); 
    ctx.beginPath();
    ctx.moveTo(40,40);
    ctx.lineTo(0,10);
    ctx.lineTo(10,0);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
}
function optAngle(angle){
    temp = angle;
    if(temp > 0){
        while(temp > 2*Math.PI){
            temp = temp - 2*Math.PI;
        }
    }else{
        while(temp < 0){
            temp += 2*Math.PI;
        }
    }
    return temp;
}
function radianToDegree(x){
    return x*180/Math.PI;
}
function updateGameArea() {
    count++;
    delta = 15 - 0.00171*count*count ;
     
    if(delta > 0){
        myGameArea.clear();
        myGamePiece.angle += delta* Math.PI / 180;   
        myGamePiece.update();
//        document.getElementById("console").innerHTML = "<p>"+optAngle(1.25*Math.PI - myGamePiece.angle - Math.PI/20)/(Math.PI/10)+"</p>";
//        document.getElementById("console").innerHTML += "<p>"+radianToDegree(optAngle(myGamePiece.angle - 1.25*Math.PI))+"</p>";
//        document.getElementById("console").innerHTML += "<p>"+radianToDegree(optAngle(myGamePiece.angle))+"</p>";
    }else{
        p = Math.ceil(optAngle(1.25*Math.PI - myGamePiece.angle - Math.PI/20)/(Math.PI/10));
        document.getElementById("console").innerHTML = "<p> Your word is "+listWords[listIndex[p]].simple+"</p>";
        pause();
        
    }
}
