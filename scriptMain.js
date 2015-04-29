var eastereggs=["EATER EGG :))))","Even a King...","A mark is made...","YOU FOUND ME","I will learn Unspeakable...","Mega Awesome Website"]

var pageChange = function(page){
    document.getElementById("pageMain").innerHTML = document.getElementById(page).innerHTML;
};
window.onload = function(){
    pageChange(0);
};
var easter = function(egg){
    document.getElementById("header").innerHTML = eastereggs[egg]
}