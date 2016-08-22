// images location
window.dhx_globalImgPath = "/resources/codebase/imgs/";
var watch = "watch";
var open_desc = 0;

var chart_xml = "	<chart showAlternateHGridColor='1' alternateHGridColor='CCD6DA' showAlternateVGridColor='1' vDivLineColor='D8E1ED' zeroPlaneColor='D8E1ED' alternateVGridColor='D8E1ED' yAxisMinValue='15000' chartLeftMargin='0' chartRightMargin='20' chartBottomMargin='7' rotateLabels='1' showToolTip='1' showValues='1' showDivLineValues='0' yAxisName='Votes' numberPrefix='' labelDisplay='NONE' bgColor='D8E1ED,BAC4C0' bgAlpha='100,100' bgRatio='0,100' bgAngle='90' canvasBorderThickness='0'  showBorder='0' borderThickness='0'  divLineColor='333333'>\
										[data]\
										<styles>\
											<definition>\
												<style name='Anim1' type='animation' param='_xscale' start='0' duration='1' />\
												<style name='Anim2' type='animation' param='_alpha' start='0' duration='1' />\
												<style name='DataShadow' type='Shadow' alpha='20'/>\
												<style name='myFont' type='font' isHTML='1' bold='0' size='11' color='#006AD5' />\
											</definition>\
											<application>\
												<apply toObject='DIVLINES' styles='Anim1' />\
												<apply toObject='HGRID' styles='Anim2' />\
												<apply toObject='DataLabels' styles='DataShadow,Anim2' />\
												<apply toObject='DataValues' styles='myFont' />\
										</application>	\
									</styles>\
								</chart>";
								
function  refresh_page(selected_year, selected_genre){
	if(!(selected_year == "Year" && selected_genre == "Genre")){
		if(selected_genre == "Genre"){
			selected_genre = "All Genres";
		}
		
		if(selected_year == "Year"){
			selected_year = "Blockbusters";
		}
		
		window.location.href = "/top/" + ("" +selected_genre).replace(/\s+|\//g, "_") + "/" + ("" + selected_year).replace(" ", "_") + "/";
	}
}

function show(mid, title, torrents, mode){
		if(mode == "download"){
			wurl = "/torrent/" + mid + "/" + torrents + "/" + encodeURIComponent(title.replace(/\s+|\//g, "_")) + "/";
		}
		else if(mode == "watch") {
			wurl = "/trailler/" + mid + "/" + encodeURIComponent(title.replace(/\s+|\//g, "_")) + "/";
		}
		else{
			return;
		}
		
		win = window.open(wurl, "video", "height=682,width=984,status=no,toolbar=yes,menubar=no,location=no,resizable=no,scrollbars=no");
		win.focus();
}

function show_desc(mid){
	document.getElementById("desc_" + mid).className = "right show_desc";
	if(open_desc > 0){
		document.getElementById("desc_" + open_desc).className = "right";
	}
	open_desc = mid;
}

function hide_desc(mid){
	document.getElementById("desc_" + mid).className = "right";
	open_desc = 0;
}

function show_title(obj, iconId, over){
	if(obj){
		title_obj = document.getElementById("title_" + iconId);
		if(over){
			switch (obj.className) {
				case "strailer" :
						stitle = "WATCH TRAILER";
						sfolder = "/trailler/";
						stooltip = "Watch trailer";
					break;
				case "sfile" :
						stitle = "DOWNLOAD";
						sfolder = "/file/";
						stooltip = "Download from File-sharing Host";
					break;
				case "semule" :
						stitle = "EMULE";
						sfolder = "/emule/";
						stooltip = "Download with Emule";
					break;
				case "storrent" :
						stitle = "PIRATEBAY";
						sfolder = "/torrent/";
						stooltip = "Get torrents";
					break;
				default :
						stitle = "WATCH VIDEO ONLINE";
						sfolder = "/player/";
						stooltip = "Watch video online";
					break;
			}
		}
		else{
			stitle = "WATCH VIDEO ONLINE";
			sfolder = "/player/";
		}
		
		current_href = title_obj.parentNode.href;
		href_split = current_href.indexOf(iconId) > 0 ? current_href.split(iconId) : Array("","/");
		
		if(obj.className == "sfile"){
			//title_obj.parentNode.target="_blank";
			//title_obj.parentNode.onclick = function() {return PPN.softwareLP.onDownload();};
			//title_obj.parentNode.href = "http://clkmon.com/static/rdr.html?pid=3898&cid=TB_Direct_Butt";
			title_obj.parentNode.href = "http://www.webtrackerplus.com/?page=flowplayerregister&a_aid=59045f4555d08&a_bid=f2dddc66&chan=flow";
			//PPN.zcp = zcFeedConfig2;
		}
		else{
			//title_obj.parentNode.target="_blank";
			//title_obj.parentNode.onclick = function() {};
			title_obj.parentNode.href = sfolder + iconId + href_split[1];
		}
		title_obj.parentNode.title = stooltip;
		title_obj.innerHTML = stitle;
	}
}

function info(obj, hover){
	current_url = $(obj).parent("a").attr("href");
	
	if(hover){
		$(obj).parent("a").attr("href", current_url.replace("/player/", "/info/"));
	}
	else{
		$(obj).parent("a").attr("href", current_url.replace("/info/", "/player/"));
	}
}