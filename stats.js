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
window.stats = {
	data:
	{
		items: [],
		totalTagCount: 0,
        	totalCommentCount: 0,
        	avgCommentCount: 0,
		avgVote: 0,
		benisTotal: 0,
        	upTotal: 0,
        	downTotal: 0,
        	promoted: 0,
        	controversy: 0,
        	up: [],
        	down: [],
        	itemIDs: [],
		lastItem_Id: 0,
		items_number: 0,
		graphData: [],
		sfw_graph: [],
		nsfw_graph: [],
		nsfl_graph: [],
		sfw: 0,
		nsfw: 0,
		nsfl: 0
	},
	template: "",
	_startTimer: function(){
		this.startTime = new Date();
	},
	convertUrl: function(){
		this._startTimer();
		function getUrlParams(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.href);
			if (results == null) return null;
				else return results[1];
		}
		flag = Number(getUrlParams("sfw")) + Number(getUrlParams("nsfw")) + Number(getUrlParams("nsfl"))
		try{
		if(getUrlParams("search") == null){ throw "query undefined";}else{
		this.url = 'http://85.214.140.92/cors/?path=items/get?tags=' + getUrlParams("search") + '&accuracy=' + getUrlParams("accuracy") +'&flags='+flag;
		$("#loading").css("opacity", 1);
		$('#tagsinput').val(decodeURI(getUrlParams("search")));
		var slider_x = (Number(getUrlParams("accuracy")))/50;
		slider.setValue(slider_x,0);
		/*pageTracker._setCustomVar(1,"Tag",getUrlParams("search"));
		pageTracker._trackPageview();
		pageTracker._setCustomVar(1,'Accuracy',getUrlParams("accuracy"));
		pageTracker._trackPageview();*/
		this.fetch();
		return "converted";
		
		}
		}
		catch(e){
			console.log(e);
		}
		
	},
	_append: function(status){
		switch (status){
			case 200:
				console.log(this.data.items_number + " "+ this.data.up.length);
				this.template += "<br><span id='avg'>&empty;" + this.data.avgVote + "</span><span>Benis</span></div><br><br/><span style='color: #4CAF50' id='up'>+" + this.data.upTotal + "</span><span style='color:#F44336' id='down'>-" + this.data.downTotal + " </span><br/><span id='controversy'>" + this.data.controversy + "% kontrovers</span><br/><span id='promoted'>" + this.data.promotedpercent + "% in /top</span><br><span><span style='font-size: 2em;color:#4CAF50'>" + this.data.up[this.data.items_number - 2] + "</span>max. Upvotes</span><br><span><span style='font-size: 2em;color:#F44336'>" + this.data.down[this.data.items_number - 2] + "</span>max. Downvotes</span><br><h1 style='font-size: 1.5em'>Am besten bewertete Bilder</h1>";
				$('#avgwrapper').css("margin-left", "-" + $('#avgwrapper').width() * 0.5 + "px");
				$("#sfw_bar").css("width", (this.data.sfw/this.data.items_number)*100+"%");
				$("#nsfw_bar").css("width", (this.data.nsfw/this.data.items_number)*100+"%");
				$("#nsfl_bar").css("width", (this.data.nsfl/this.data.items_number)*100+"%");
				width = 0;
				$(".bar").mouseenter(function(){
					b = this;
					$(".bar").not(b).animate({width: "0"},{queue: false});
					$(b).animate({width: "100%"},{queue: false});
				});
				$(".bar").mouseleave(function(){
						$("#sfw_bar").animate({width: (a.data.sfw/a.data.items_number)*100+"%"},{queue: false});
						$("#nsfw_bar").animate({width: (a.data.nsfw/a.data.items_number)*100+"%"},{queue: false});
						$("#nsfl_bar").animate({width: (a.data.nsfl/a.data.items_number)*100+"%"},{queue: false});
				});
				g = new Dygraph(document.getElementById("graph"), this.data.graphData, {
					showRoller: true,
					labels: ['Time', 'Benis'],
					title: 'Benis im Verlauf',
					colors: ["#D23C22"],
					fillGraph: true,
					axisLineColor: "#212425", // ln 88 \o
					showRoller: false
				});
				var counter = 0;
				for (; counter <= 4; counter++) { // Top-Bilder
					var currentTop = counter+1;
					$('#statswrapper #imagewrapper').append("<a class='img-hover' title='"+ this.data.items[counter].benis +" Benis' target='_blank' href='//pr0gramm.com/new/" + this.data.items[counter].id + "'><span style='position: absolute;z-index: 99999;vertical-align: middle;width:128px;height:128px;margin-left:13px;opacity:0;background-color: #212425'><p style='font-size: 2.2em;text-align:center;vertical-align: middle;font-weight: 300;letter-spacing: 0.2em;color: #D23C22;'> #"+ currentTop  +"</p></span><img src='//thumb.pr0gramm.com/" + this.data.items[counter].thumb + "'></a>");
				}
				$(".img-hover").hover(function() {
					$(this).children("span").animate({ 
						opacity: "0.9"
					}, 300)
				}, function() {
					$(this).children("span").animate({
						opacity: "0"
					}, 300)
				});
				$('#statswrapper').css("padding-bottom", 430+"px");
				calc_time = new Date() - this.startTime;
				$('footer').append("<p style='color:#fff;font-weight: 300'> Diese Statistik wurde mithilfe freier Energie in " + calc_time / 1000 + " Sekunden generiert");
				break;
			case 404:
				this.template += "<span style='font-size: 2em;text-transform:uppercase'>Nichts Gefunden &#175;\\_(&#12484;)_/&#175;</span>";
				break;
		}
			$("#stats").append(this.template);
			$('#loading').animate({
					opacity: 0
				}, 300);
			$('#loading').css("display", "none");
            $('#statswrapper').animate({
                opacity: 1
            }, 500);
			
	},
	_analyze: function(){ 
		sort_by = function(e, t, n) {var r = n ? function(t){return n(t[e])} : function(t) {return t[e]};t = [-1, 1][+!!t];return function(e, n) {return e = r(e), n = r(n), t * ((e > n) - (n > e))}}
		this.data.items_number = this.json.items.length;
		if(this.data.items_number==0){
			this._append(404);
		}else{
			var i = 0;
			for (; i < this.data.items_number; i++) {
                this.data.up.push(this.json.items[i].up);
                this.data.down.push(this.json.items[i].down);
                this.data.upTotal += this.json.items[i].up;
                this.data.downTotal += this.json.items[i].down;
                this.data.items.push(JSON.parse('{"id" : ' + this.json.items[i].id + ',"benis": ' + (this.json.items[i].up - this.json.items[i].down) + ', "thumb": "' + this.json.items[i].thumb.replace("/(\\)/", "http://thumb.pr0gramm.com/") + '", "image": "' + this.json.items[i].image.replace("/(\\)/", "http://thumb.pr0gramm.com/") + '"}'));
                this.data.itemIDs.push(this.json.items[i].id);
				switch (this.json.items[i].flags){
					case 1:
						this.data.sfw++;
						this.data.sfw_graph.push([new Date(this.json.items[i].created * 1000), this.json.items[i].up - this.json.items[i].down]);
						break;
					case 2:
						this.data.nsfw++;
						this.data.nsfw_graph.push([new Date(this.json.items[i].created * 1000), this.json.items[i].up - this.json.items[i].down]);
						break;
					case 4:
						this.data.nsfl++;
						this.data.nsfl_graph.push([new Date(this.json.items[i].created * 1000), this.json.items[i].up - this.json.items[i].down]);
						break;
				}
                if (this.json.items[i].promoted != 0) {
                    this.data.promoted++;
                }
            }
			this.data.sfw_graph.reverse();
			this.data.nsfw_graph.reverse();
			this.data.nsfl_graph.reverse();
			function sortNumber(a,b) {
				return a - b;
			}
			this.data.items.sort(sort_by('benis', false, parseInt));
			this.data.up.sort(sortNumber); 
			this.data.down.sort(sortNumber);
			if (this.data.upTotal >= this.data.downTotal) {
				this.data.controversy = this.data.downTotal / this.data.upTotal;
			} else {
				this.data.controversy = 1 / (this.data.downTotal / this.data.upTotal);
			}
			this.data.controversy = Math.round(100 * this.data.controversy);
			this.data.promotedpercent = Math.round(100 * (this.data.promoted / this.data.items_number));
			this.data.benisTotal = this.data.upTotal - this.data.downTotal;
			this.data.avgVote = Math.round(this.data.benisTotal / this.data.items_number);
			this.data.avgCommentCount = Math.round(this.data.totalCommentCount / this.data.items_number);
			dataCounter = 0;
            for (; dataCounter < this.data.items_number; dataCounter++) {
                this.data.graphData.push([new Date(this.json.items[dataCounter].created * 1000), this.json.items[dataCounter].up - this.json.items[dataCounter].down]);
            }
			this.data.graphData.reverse();
			this._append(200);
		}
		return "analyzed";
	},
	fetch: function(){
		a = this;
		$.ajax({
			url: this.url,
			dataType: "json",
			async: true,
			complete: function(data){ a.json = data.responseJSON;a._analyze();}
		});
		return "fetched"; 
	}
};
