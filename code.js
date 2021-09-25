// Copyright Shoaib Malik
// it's simple litle game for fun 🤗
"use strict";
let W, H, san,{ceil,random,sqrt,sin,cos,atan2,pow,PI}=Math,Ang=26.56505117707799/180*PI,stacks=[],dotups=[],isover=true,ss=1,aa=.8,Score=0,one=true,al=0,alv=.02;

const createPlayer = (id, url) => { 
    let body = document.getElementsByTagName('body')[0];
    body.innerHTML += `<audio style="display:none" id="${id}" src="${url}"></audio>`;
}

const Pd=(x,y,X,Y)=>{
    let a=0/180*PI;
    let rx=(x-X)*cos(a)-(y-Y)*sin(a);
    let ry=((x-X)*sin(a)+(y-Y)*cos(a))*2;
    return sqrt((rx)*(rx)+(ry)*(ry))
}

const Rng=(n,x)=>{
     return random()*(x-n)+n
}

const Onc=(s1,s2)=>{
    s2.isStable=true; 
    let dis=Pd(s1.x,s1.y,s2.x,s2.y+20)
    console.log()
    if(s2.x<s1.x&&dis<s2.w/2+s1.w/2&&s2.w-dis>0&&s2.d=="left"){
        s2.x+=cos(Ang)*dis*.4
        s2.y+=sin(Ang)*dis*.4
        s2.w-=dis;Score++;   
    }else if(dis<s2.w/2+s1.w/2+20&&s2.w-dis>0&&s2.d=="left"){
        s2.x-=cos(Ang)*dis*.4
        s2.y-=sin(Ang)*dis*.4
        s2.w-=dis;Score++;       
    }else if(s2.x>s1.x&&dis<s2.h/2+s1.h/2&&s2.h-dis>0&&s2.d=="right"){
        s2.x-=cos(Ang)*dis*.4
        s2.y+=sin(Ang)*dis*.4
        s2.h-=dis;Score++;   
    }else if(dis<s2.h/2+s1.h/2+20&&s2.h-dis>0&&s2.d=="right"){
        s2.x+=cos(Ang)*dis*.4
        s2.y-=sin(Ang)*dis*.4
        s2.h-=dis;Score++;       
    }else{
        isover = true;
        stacks.pop()   
    }
    stacks.forEach(_=>_.y+=20);
    if(!isover) stacks.push(new Stack(s2.x+cos(Ang)*500*(s2.d=="left"?1:-1),s2.y-sin(Ang)*500-20,s2.h,s2.w,s2.c+30,s2.d=="left"?"right":"left"))
 }

class Stack{
 constructor(x,y,h,w,c,d){
  this.x=x;
  this.y=y;
  this.h=h;
  this.w=w;
  this.c=c;   
  this.d=d;
  this.v=4;
  this.isStable=false;
 }
 draw(){
  if(!this.isStable){
   this.y+=sin(Ang)*this.v
   if(this.d=="left") this.x+=cos(Ang)*this.v;
   if(this.d=="right") this.x-=cos(Ang)*this.v;
   if(this.y>H/2.2+150) isover = true
  }
  let pt=[
  Stack.Ct3d(this.x,this.y,-this.w/2,-this.h/2),
  Stack.Ct3d(this.x,this.y,this.w/2,-this.h/2),
  Stack.Ct3d(this.x,this.y,this.w/2,this.h/2),
  Stack.Ct3d(this.x,this.y,-this.w/2,this.h/2)
  ]
  san.beginPath();
  san.fillStyle="hsl("+this.c+",100%,40%)";
  san.moveTo(pt[1].x,pt[1].y)
  san.lineTo(pt[1].x,pt[1].y+20);
  san.lineTo(pt[2].x,pt[2].y+20); 
  san.lineTo(pt[2].x,pt[2].y);
  san.fill();
  san.closePath();
  san.beginPath();
  san.fillStyle="hsl("+this.c+",100%,30%)";
  san.moveTo(pt[2].x,pt[2].y)
  san.lineTo(pt[3].x,pt[3].y);
  san.lineTo(pt[3].x,pt[3].y+20); 
  san.lineTo(pt[2].x,pt[2].y+20);
  san.fill();
  san.closePath();
  san.beginPath(); 
  san.fillStyle="hsl("+this.c+",100%,50%)";
  san.moveTo(pt[0].x,pt[0].y);
  san.lineTo(pt[1].x,pt[1].y);
  san.lineTo(pt[2].x,pt[2].y);
  san.lineTo(pt[3].x,pt[3].y);
  san.fill()
  san.closePath();
 }
 static Ct3d(X,Y,x,y){
  let a=45/180*PI;
  let rx=X+x*cos(a)-y*sin(a);
  let ry=Y+(x*sin(a)+y*cos(a))*.5;
  return {x:rx,y:ry}   
 }
}

class Dotup{
 constructor(t){
  this.x=Rng(20,W-20);
  this.t=t;
  this.y=this.t?Rng(H,H+100):Rng(H*.5,H*1.2);
  this.r=Rng(1,3);
  this.v=Rng(.5,2); 
  this.c=Rng(0,360);
  this.f=Rng(H*.2,H*.5)
  this.a=.5;
  this.u=false;
 }    
 draw(){
 if(this.a<.01) this.u=true;
 this.y-=this.v;
 if(this.y<this.f) this.a-=.01;
 san.beginPath();
 san.arc(this.x,this.y,this.r,0,44/7);
 san.fill();
 san.closePath();
 }
}


const Render=()=>{
    san.fillStyle= "hsl("+stacks[stacks.length-1].c+",100%,80%)";
    san.font="150px Areil"
    san.fillText((Score<10?'0':'')+Score,W/2-100, 200,200,100)
    for(var i=0;i<dotups.length;i++){
        dotups[i].draw();
        if(dotups[i].u){
            dotups.splice(i,1);
            dotups.push(new Dotup(true))
        }
    }
    for(var i=0;i<stacks.length-2;i++){
        stacks[i].draw()
    }
    ss+=.007;aa-=.016
    if(ss>1.4){
         ss=1;
        aa=.8;   
    }
    let ws=stacks[stacks.length-(stacks.length==1?1:2)];
    let pt=[
    Stack.Ct3d(ws.x,ws.y,-ws.w/2*ss,-ws.h/2*ss),
    Stack.Ct3d(ws.x,ws.y,ws.w/2*ss,-ws.h/2*ss),
    Stack.Ct3d(ws.x,ws.y,ws.w/2*ss,ws.h/2*ss),
    Stack.Ct3d(ws.x,ws.y,-ws.w/2*ss,ws.h/2*ss)
    ]
    san.beginPath();
    san.strokeStyle="rgba(300,300,300,"+aa+")";
    san.lineWidth=10;
    san.moveTo(pt[0].x,pt[0].y+20);
    san.lineTo(pt[1].x,pt[1].y+20);
    san.lineTo(pt[2].x,pt[2].y+20);
    san.lineTo(pt[3].x,pt[3].y+20);
    san.closePath();    
    san.stroke();
    if(stacks.length>1) stacks[stacks.length-2].draw();
    stacks[stacks.length-1].draw()
    san.fillStyle=isover?"rgb(300,0,130)":"transparent";
    san.strokeStyle=isover?"rgb(300,0,130)":"transparent";
    san.fillText("S T A C K",W/2-300,H-100,600,80)
    san.strokeText("S T A C K",W/2-300,H-100,600,80)
    san.font="80px Areil" 
    al+=alv;
    if(al>1||al<0) alv=-alv; san.fillStyle=isover?"rgba(300,300,300,"+al+")":"transparent";
    san.fillText(one?"Tap to Play":"Tap to Replay",W/2-200,H-300,400,80)
    if(isover){
        stacks=[stacks[0]];
        stacks[0].x=W/2;
        stacks[0].y=H/2.2;
        isover=true;    
    }
}

const eventClick=()=>{
    music.play();
    if(!isover){ 
        Onc(stacks[stacks.length-2],stacks[stacks.length-1])
    }else{
        isover=false;
        stacks.push(new Stack(W/2+cos(Ang)*500,H/2.2-sin(Ang)*500-20,400,400,200,"right"));
        Score=0;
    }
    one=false;
}

// canvas setup
const init=()=>{

    H=innerHeight*2;
    W=innerWidth*2;
    createPlayer('music', 'https://soundimage.org/wp-content/uploads/2014/09/Our-Mountain_v003.mp3');

    document.body.innerHTML+="<canvas id='c'style='height:100vh;width:100vw;position:fixed;left:0;top:0;background:black;'></canvas>";
    c.height=H;c.width=W;
    
    let dh=+getComputedStyle(c).height.slice(0,-2),dw=+getComputedStyle(c).width.slice(0,-2);c.setAttribute('height',dh*2);c.setAttribute('width',dw*2);san=c.getContext('2d');
    let _=()=>{san.clearRect(0,0,W,H);Render(); webkitRequestAnimationFrame(_);};webkitRequestAnimationFrame(_);  
    stacks.push(new Stack(W/2,H/2.2,400,400,180))
    stacks[0].isStable=true;

    for(var i=0;i<80;i++){
        dotups.push(new Dotup(false))
    }

    c.addEventListener('click', () => eventClick());  
    
    };
    
    onload=init;
