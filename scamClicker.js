var score = document.getElementById("score");
var pizzaStorage = document.getElementById("pizzaStorage");
var popUp = document.getElementById("popUp");
var money = 0;
var fatness = 0;
var moneyAnimationNum = 0;
var moneyAnimationHeight = [];
var moneyAnimationFade = [];
var moneyAnimationValue = [];
var moneyAnimationTime = [];

document.getElementById("scam").addEventListener("click", function () {
    createMoneyAnimation(1);
    money += 1;
    bakedPizza();
    popUpAdHideCheck();
    popUpAdCheck();
});

var pizzas = ["http://www.clker.com/cliparts/6/f/1/9/13686295372080717878tumblr_m2bfzuvopg1qkf22qo1_500.png","http://blog.lib.umn.edu/wlas0006/jhon%27s_sp2012%20class/larger%20pizza.png","http://img4-3.cookinglight.timeinc.net/i/2012/03/1203p47-greek-austerity-pizza-l.jpg?400:400","http://www.colasanti.com/ESW/Images/PEP_PIZZAs.png","http://firstcreditcardsinfo.com/wp-content/uploads/2014/06/pizza-slicecompetition--you-deserve-some-pizza-n-quiet-the-kings-blog-zg5p3bby.jpg","http://www.officialpsds.com/images/thumbs/Pizza-slice-psd88430.png","http://preview.turbosquid.com/Preview/2014/07/08__00_58_32/thumbnail1.png3bd4b664-4893-48d2-bf5f-bc0f6e6d581bLarge.jpg","http://www.colasanti.com/ESW/Images/PEP_PIZZAs.png","http://ourlifeinmeals.files.wordpress.com/2012/03/spinach-basil-pesto-pizza_slice.png%3Fw%3D690%26h%3D493","http://www.purdue.edu/21birthday/assets/img/SlicePizza.gif","http://incrediblemos.com/wp-content/uploads/2013/01/pizza-slice.jpg","http://www.chefette.com/images/uploads/food/947/pizza_-_pepperoni_slice__large.jpg","http://www.palermospizza.com/media/default/our%20pizzas/primo%20thin/slice_pt_cheese.png","http://www.hormelfoods.com/~/media/HormelFoods/Images/Brands/Product%20Shots/High%20Res%20Product%20Shots/spam-family-of-products.ashx"];

function bakedPizza() {
   var choice = Math.floor(Math.random()*pizzas.length);
    pizzaStorage.insertAdjacentHTML("beforeend", "<img class='pizza' src ='" + pizzas[choice] + "'/>");
}

function popUpAdCheck(){
    if(Math.random()>0.95){
        popUpAd();
    }
}

var popUps=["http://2.bp.blogspot.com/-U5-LcWygx4E/UKPMh3E3AzI/AAAAAAAAo9Q/Y3r1R8XsH5w/s320/stop_popup_ads.gif","http://www.fightwithice.com/wp-content/uploads/2012/12/ipad-mini.png","http://images.mocpages.com/user_images/51853/12869530548_SPLASH.jpg","http://ithreats.files.wordpress.com/2008/08/popup.png","http://www.mobiadnews.com/wp-content/uploads/2009/10/prius_drag.jpg"];

function popUpAd(){
       var popUpNum=Math.floor(Math.random()*popUps.length); 
   popUp.src=popUps[popUpNum];
   popUp.className="popUpShown";
   popUp.style.top=Math.floor(Math.random()*90)+"%";
   popUp.style.left=Math.floor(Math.random()*90)+"%";
}

document.getElementById("popUp").addEventListener("click", function () {
    money += 100;
    createMoneyAnimation(100);
    popUpAdHide();
});

function popUpAdHideCheck(){
    if(Math.random()>0.75){
        popUpAdHide();   
    }
}
function popUpAdHide(){
    popUp.className="popUpHidden";
}

function createMoneyAnimation(value){
  moneyAnimationNum++;
  moneyAnimationHeight[moneyAnimationHeight.length] = 0;
  moneyAnimationFade[moneyAnimationFade.length] = 0;
  moneyAnimationTime[moneyAnimationTime.length]= 0;
  moneyAnimationValue[moneyAnimationValue.length] = value;
}
window.requestAnimationFrame(update);

function update(){
  var moneyAnimationCode="";
  for(i=0;i<moneyAnimationNum;i++){
    moneyAnimationHeight[i]+=1;
    moneyAnimationFade[i]+=0.03;
    moneyAnimationTime[i]++;
    moneyAnimationCode=moneyAnimationCode+"<div class='moneyAnimation' style='top:"+(25-moneyAnimationHeight[i])+"px;opacity:"+(1-moneyAnimationFade[i])+"'>-$"+moneyAnimationValue[i]+"</div>";
    if(moneyAnimationTime[i]>33){
      moneyAnimationNum--;
      moneyAnimationTime.splice(i, 1);
      moneyAnimationValue.splice(i, 1);
      moneyAnimationHeight.splice(i, 1);
      moneyAnimationFade.splice(i, 1);
      
    }
}
score.innerHTML=("-$"+money);
document.getElementById("moneyAnimations").innerHTML=moneyAnimationCode;
window.requestAnimationFrame(update);
}