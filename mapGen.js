var tileSize=15;
var raduis=document.getElementById("radius");
var wallNum=document.getElementById("wallNum");
var miss=document.getElementById("miss");
var turn=document.getElementById("turn");
var mirrored=document.getElementById("mirrored");
document.getElementById("generateMap").addEventListener("click",function(){if(raduis.value>=10)makeMap(raduis.value,raduis.value,wallNum.value,miss.value,turn.value,mirrored.value);});
                                         
function makeMap(width,height,walls,missChance,turnChance,mirror){
  if(mirror=="true")mirror=true;
  else mirror=false;
  console.log(width +" "+walls+" "+missChance+" "+mirror);
  var gunsMade=[false,false,false];
  document.getElementById("map").innerHTML="";
    var map=[];
    var size = width*height;
    //generate Base Map
    for(i=0;i<size;i++){
        map.push(0);
        if(i<width||i>size-width||i%width===0||(i+1)%width===0)map[i]=1;
    }
    var wallLength;
    var pos = [0,0];
    var wallDir;
    //Add random Walls
    for(i=0;i<walls*(mirror?1:2);i++){
      wallLength=Math.floor(Math.random()*Math.min(width,height)/2);
      pos[0]=Math.floor(Math.random()*width);
      pos[1]=Math.floor(Math.random()*height);
      wallDir=Math.floor(Math.random()*4);
      for(e=0;e<wallLength;e++){
        if(Math.random()*100<turnChance)wallDir=Math.floor(Math.random()*4);
        if(Math.random()*100>missChance){
          map[pos[0]+pos[1]*width]=1;
          if(mirror)map[pos[1]+pos[0]*width]=1;
        }
        switch(wallDir){
          case 0:
            pos[0]++;
            break;
          case 1:
            pos[0]--;
            break;
          case 2:
            pos[1]++;
            break;
          case 3:
            pos[1]--;
            break;
        }
        if(pos[0]>(width-1)||pos[0]<1||pos[1]>(height-1)||pos[1]<1)e=wallLength;
      }
    }
    //Generate Guns
    if(!mirror){
      do{
      for(i=0;i<map.length;i++){
      if(map[i]===0&&gunsMade[0]===false&&Math.round(Math.random()*(map.length-i))>(map.length-i-1)){
        map[i]=2;
        gunsMade[0]=true;
      }else if(map[i]===0&&gunsMade[1]===false&&Math.round(Math.random()*(map.length-i))>(map.length-i-1)){
        map[i]=3;
        gunsMade[1]=true;
      }else if(map[i]===0&&gunsMade[2]===false&&Math.round(Math.random()*(map.length-i))>(map.length-i-1)){
        map[i]=4;
        gunsMade[2]=true;
      }
    }
    }while(gunsMade[0]===false||gunsMade[1]===false||gunsMade[2]===false);
    }else{
      do{
      for(i=0;i<height;i++){
        if(map[i+i*width]===0&&gunsMade[0]===false&&Math.round(Math.random()*(width-i))>(width-i-1)){
        map[i+i*width]=2;
        gunsMade[0]=true;
      }else if(map[i+i*width]===0&&gunsMade[1]===false&&Math.round(Math.random()*(width-i))>(width-i-1)){
        map[i+i*width]=3;
        gunsMade[1]=true;
      }else if(map[i+i*width]===0&&gunsMade[2]===false&&Math.round(Math.random()*(width-i))>(width-i-1)){
        map[i+i*width]=4;
        gunsMade[2]=true;
      }
      }
      }while(gunsMade[0]===false||gunsMade[1]===false||gunsMade[2]===false);
    }
    
    //draw map to html
    map[2*width-2]=0;
    map[(height-2)*width+1]=0;
    for(i=0;i<map.length;i++){
      var x=i%width;
      var y=Math.floor(i/width);
      /*document.getElementById("map").insertAdjacentHTML("beforeend"," "+map[i]);
      if((i+1)%width===0)document.getElementById("map").insertAdjacentHTML("beforeend","<br>");*/
      Tile(x,y,map[i],width);
    }
}

function Tile(x,y,id,width) {
  var size = tileSize;
  
  var image = document.createElement("IMG");
  image.src = id === 1 ? "https://f.smtcs.rocks/dexterh/PraiseJebus.png":(id===2?"http://www.toonpool.com/user/562/files/gun_946935.jpg":(id===3?"http://st.depositphotos.com/1742172/2007/v/950/depositphotos_20073171-toy-gun-cartoon.jpg":(id===4?"http://image.shutterstock.com/display_pic_with_logo/483673/483673,1287926772,4/stock-vector-ray-gun-cartoon-63622531.jpg":"")));
  image.className = "tile";
  image.style.top = y * size + "px";
  image.style.left =250+ x * size + "px";
  image.style.width = size + "px";
  image.style.height = size + "px";
  document.getElementById("map").appendChild(image);
}
