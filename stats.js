/*
The MIT License (MIT)

Copyright (c) 2014 knusprigeswuerstchen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function  generateStats(query){
	var url = 'http://www.corsproxy.com/pr0gramm.com/api/items/get?tags=' + query;  
	source = $.get(url, function(data) {
		
		window.callback = JSON.parse(data);
		window.itemCount = callback.items.length;
		window.upTotal = 0;
		window.downTotal = 0;
		window.promoted = 0;
		window.controversy = 0;
		window.up = []; //Array für alle Upvotes
		window.down = []; //Array für alle Downvotes
		window.i = 0;
		
		for(;i < window.itemCount;i++){ //Schleife um alle items in Variablen zu schreiben
			window.up.push(window.callback.items[i].up); //Upvotes werden in window.up geschrieben
			window.down.push(window.callback.items[i].down); //Downvotes in window.down
			window.upTotal += window.callback.items[i].up; //Upvotes in UpTotal
			window.downTotal += window.callback.items[i].down; //Downvotes in DownTotal
			if(window.callback.items[i].promoted != 0){
				window.promoted++;  // Wenn Bild in /top ist wird promoted increased
			}
		}
		if(window.upTotal == 0 || window.downTotal == 0){
			if(window.callback.items.length == 0){
				window.markupOut = "<span style='font-size: 2em;text-transform:uppercase'>Nichts Gefunden ¯\\_(ツ)_/¯</span>";
			}
		}else{
		
			window.up.sort(); //Sortiert Up/Down um die min/max werte zu bekommen
			window.down.sort();
		
			if(window.upTotal >= window.downTotal)
			{
				window.controversy = window.downTotal/window.upTotal;
			}else
			{
				window.controversy = 1/(window.downTotal/window.upTotal);
			}
			window.controversy = Math.round(100*window.controversy);
			window.promotedpercent = Math.round(100*(window.promoted/itemCount));
			window.avgVote = 0;
			window.benisTotal = 0;
			window.benisTotal = window.upTotal-window.downTotal;
			window.avgVote = Math.round(window.benisTotal / window.itemCount);
			window.markupOut ="<br><span id='avg'>&empty;"+ window.avgVote + "</span><span>Benis</span></div><br><br/><span style='color: #4CAF50' id='up'>+" + window.upTotal + "</span><span style='color:#F44336' id='down'>-"+ window.downTotal + " </span><br/><span id='controversy'>" + window.controversy + "% kontrovers</span><br/><span id='promoted'>"+window.promotedpercent+"% in /top</span><br><span><span style='font-size: 2em;color:#4CAF50'>"+window.up[itemCount-1]+"</span>max. Upvotes</span><br><span><span style='font-size: 2em;color:#F44336'>"+window.down[itemCount-1]+"</span>max. Downvotes</span>";
		}
		$('#stats').append(window.markupOut);
		$('#avgwrapper').css("margin-left", "-"+$('#avgwrapper').width() *0.5+"px");
		$('#stats').css("padding-bottom", 30+"px");
		$('#loading').animate({
		opacity: 0
		},300);
		$('#statswrapper').animate
		({opacity: 1}, 500);
	});
}
