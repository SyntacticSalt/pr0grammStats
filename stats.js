function  generateStats(data){
var itemCount = data.items.length;
var upTotal;
var downTotal;
for(i=0;i >= itemCount;i++){
upTotal += data.item[i].up;
downTotal += data.item[i].down;
}
var controversy = 0;
if(upTotal >= downTotal){
controversy = downTotal/upTotal;
}else{
controversy = 1/(downTotal/upTotal);
}
controversy = Math.round(100*controversy);
var promotedpercent = Math.round(100*(promoted/itemCount));
var avgVote = 0;
var benisTotal = 0;
benisTotal = upTotal-downTotal;
avgVote = Math.round(benisTotal / itemCount);
var markupOut ="<span id='avg'>&empty;"+ avgVote + "</span><span>Benis</span><br/><span style='color: green' id='up'>+" + upTotal + "</span><span id='seperator'> &#124;</span><span style='color:red' id='down'>-"+ downTotal + " </span><br/><span id='controversy'>" + controversy + "% kontrovers</span><br/><span id='promoted'>"+promotedpercent+" % in /top</span>";
return markupOut;
}
