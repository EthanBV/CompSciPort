function randomness(){
  //noprotect
    //height and windth of window
    h=window.innerHeight;
    w=window.innerWidth;
    //string of all Divs
    var divs = [];
    //number of Circles
    //var circles=1;
    var circles = (w*h)/350-Math.floor((w*h)/400*Math.random());
    //finalHTML code
    var finalHTML="";
    //generate cirles
    for(i=0;i<circles;i++){
        //saves code for current div
        var currentCircle = "<div style='";
        //saves code for current Element
        var currentElement;
        //generate background color
        currentElement = "background-color:rgb(" + Math.floor(Math.random()*250) + "," + Math.floor(Math.random()*250) + "," + Math.floor(Math.random()*250) + ")";
        currentCircle = currentCircle + currentElement + ";";
        //generate border color
        currentElement = "border-color:rgb(" + Math.floor(Math.random()*250) + "," + Math.floor(Math.random()*250) + "," + Math.floor(Math.random()*250) + ")";
        currentCircle = currentCircle + currentElement + ";";
        //generate border radius
        currentElement = "border-radius:" + Math.floor(Math.random()*200)+"px";
        currentCircle = currentCircle + currentElement + ";";
        //generate border width
        currentElement = "border-width:" + Math.floor(Math.random()*15)+"px";
        currentCircle = currentCircle + currentElement + ";";
        //set border style to solid
        currentElement = "border-style:solid";
        currentCircle = currentCircle + currentElement + ";";
        //generate left offset
        currentElement = "left:" + Math.floor(Math.random()*w) + "px";
        currentCircle = currentCircle + currentElement + ";";     
        //generate top offset
        currentElement = "top:" + Math.floor(Math.random()*h) + "px";
        currentCircle = currentCircle + currentElement + ";";
        //generate height
        currentElement = "height:" + Math.floor(Math.random()*200) + "px";
        currentCircle = currentCircle + currentElement + ";";
        //generate width
        currentElement = "width:" + Math.floor(Math.random()*200) + "px";
        currentCircle = currentCircle + currentElement + ";";
        //set rotate
        currentElement = "-webkit-transform: rotate(" + Math.floor(Math.random()*360) + "deg)";
        currentCircle = currentCircle + currentElement + ";";        
        //set position to static
        currentElement = "position:absolute";
        currentCircle = currentCircle + currentElement;
        //close div
        currentCircle = currentCircle + "'></div>";
        divs[i] = currentCircle;
        finalHTML = finalHTML + currentCircle;
    }
    document.getElementById("main").innerHTML = finalHTML;
  console.log(finalHTML);
}
$(window).load(function(){
  $('div').draggable();
});