/** *************Init JS*********************

    TABLE OF CONTENTS
	---------------------------
	1.Ready function
	2.Load function
	3.Full height function
	4.Jetson function
	5.Chat App function
	6.Resize function
 ** ***************************************/

 "use strict";


/***** Connected *****/
var ApiKeyDev = "E39CDD5E459A4493A6AC51204115204D";
var ApiKeyProd ="083E87CC0E9E4300AA7354F31C8FD6F8";
var ActiveApi = ApiKeyProd;
var PortProd = 5005;
var PortTest = 8112;
var ActivePort = PortProd;

var idIntervals=0;
var TARGET = 300;

$('#UP_Z').on('click', function () {
		alert('UP_Z' + $('#myTabs_8').find('.active').find('a').text());
    });
$('#UP_Y').on('click', function () {
		alert('UP Y' + $('#myTabs_8').find('.active').find('a').text());
    });
$('#DOWN_Z').on('click', function () {
		alert('DOWN Z' + $('#myTabs_8').find('.active').find('a').text());
    });
$('#Down_Y').on('click', function () {
		alert('DOWN Y' + $('#myTabs_8').find('.active').find('a').text());
    });
$('#Home_Z').on('click', function () {
		alert('Home Z' + $('#myTabs_8').find('.active').find('a').text());
    });
$('#Home_XY').on('click', function () {
		alert('Home XY' + $('#myTabs_8').find('.active').find('a').text());
    });
$('#Left_X').on('click', function () {
		alert('Left X' + $('#myTabs_8').find('.active').find('a').text());
    });
$('#Right_X').on('click', function () {
		alert('Right X' + $('#myTabs_8').find('.active').find('a').text());
    });

function timer(){
    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://127.0.0.1:" + ActivePort + "/api/printer",
  "method": "GET",
  "headers": {
  	"x-api-key": ActiveApi,
	  "content-type": "application/json",
	  "cache-control": "no-cache"
  },
  "processData": false,
  "success": function(response) {
  	console.log(response);
  	//var resptxt = JSON.parse(response.responseText);
  	if (response.temperature.tool0){
  		if (response.temperature.tool0.target === 0){
  			var temptool1 = response.temperature.tool0.actual * 100 / TARGET;
  			$('#pie_chart_1').find('.percents').text(response.temperature.tool0.actual);
  			$('#pie_chart_1').data('easyPieChart').update(temptool1);
  			//$('#pie_chart_1').find('.percent').text(response.temperature.tool0.actual);
  		}
  		else {
  		var temptools1 = response.temperature.tool0.actual * 100 / response.temperature.tool0.target;
  		$('#pie_chart_1').data('easyPieChart').update(temptools1);}


	};
  	if (response.temperature.tool1){
  		if (response.temperature.tool1.target === 0){
  			var temptool2 = response.temperature.tool1.actual * 100 / TARGET;
  			$('#pie_chart_2').find('.percents').text(response.temperature.tool1.actual);
  			$('#pie_chart_2').data('easyPieChart').update(temptool2);
  			//$('#pie_chart_2').find('.percent').text(response.temperature.tool1.actual);
  		}
  		else {
  		var temptools2 = response.temperature.tool1.actual * 100 / response.temperature.tool1.target;
  		$('#pie_chart_2').data('easyPieChart').update(temptools2);}
	};
  	if (response.temperature.bed){
  		if (response.temperature.bed.target === 0){
  			var tempbed = response.temperature.bed.actual * 100 / TARGET;
  			$('#pie_chart_3').find('.percents').text(response.temperature.bed.actual);
  			$('#pie_chart_3').data('easyPieChart').update(tempbed);
  			//$('#pie_chart_3').find('.percent').text(response.temperature.bed.actual);
  		}
  		else {
  		var tempbeds = response.temperature.bed.actual * 100 / response.temperature.bed.target;
  		$('#pie_chart_3').data('easyPieChart').update(tempbeds);}
	};
	  },
  "error": function() {
  	//alert("Error");
  	var status = document.getElementById("status");
  	status.innerText = "Не удалось подключиться";
                }
};
$.ajax(settings).done(function (response) {
    console.log(response);
});
}
var GetState = function (flag) {
	if (flag === 'false') {
		$('#pie_chart_1').data('easyPieChart').update(0);
			$('#pie_chart_2').data('easyPieChart').update(0);
				$('#pie_chart_3').data('easyPieChart').update(0);
                clearInterval(idIntervals);
             }
             else {
		idIntervals=setInterval(function(){timer();},10000);//опять запускается таймер
	}
  //clearInterval(idIntervals);//тут останавливаем таймер

};

//function timer(flag){
//    var intervalId = setInterval (function(){...}
//    if (flag == 'false') {
//                clearInterval(intervalId);
//             }
//};

//var GetState = function () {

//};

var Connected = function () {
	var connect = document.getElementById("connect");
  	connect.classList.add('disabled');
  	var disconnect = document.getElementById("disconnect");
  	disconnect.classList.remove('disabled');
  	//var status = document.getElementById("status");
  	//status.innerText = "подключено";
  	$('.label_status').text('подключено');
  	GetState();
  	//$('#pie_chart_2').data('easyPieChart').update(100);
};
/***** End Connected *****/
/***** Disconnected *****/
var Disconnected = function () {
	var connect = document.getElementById("connect");
  	connect.classList.remove('disabled');
  	var disconnect = document.getElementById("disconnect");
  	disconnect.classList.add('disabled');
  	$('.label_status').text('отключено');
  	GetState('false');
};
/***** End Disconnected *****/

/*****Connect Octoprint Serve ******/
var ConnectServ = function () {
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://127.0.0.1:" + ActivePort + "/api/connection",
  "method": "POST",
  "headers": {
  	"x-api-key": ActiveApi,
	  "content-type": "application/json",
	  "cache-control": "no-cache"
  },
  "processData": false,
  "data": '{"command": "connect"}',
  "success": function(response) {
  	//alert(response);
	  console.log(response + 'ConnectServ');
	  Connected();
	  },
  "error": function(response) {
  	console.log(response + 'Error connect serv');
  	var status = document.getElementById("status");
  	status.innerText = "Не удалось подключиться";
                }
};
$.ajax(settings).done(function (response) {
    console.log(response);
});
};
/***** Disconnect Octoprint Serve ******/
var DisconnectServ = function () {
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://127.0.0.1:" + ActivePort + "/api/connection",
  "method": "POST",
  "headers": {
    "x-api-key": ActiveApi,
    "content-type": "application/json",
	  "cache-control": "no-cache"
  },
  "processData": false,
  "data": '{"command": "disconnect"}',
  "success": function() {
  	//alert("Success");
	  Disconnected();
	  },
  "error": function() {
  	//alert("Error");
  	var status = document.getElementById("status");
  	status.innerText = "Нет соединения";
                }
};
$.ajax(settings).done(function (response) {
    console.log(response);
});
};

//$('#disconnect').bind('click', DisconnectServ());
//$('#connect').bind('click', ConnectServ());

var StartOcto = function(){
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://127.0.0.1:" + ActivePort + "/api/connection",
  "method": "POST",
  "headers": {
    "x-api-key": ActiveApi,
    "content-type": "application/json",
    "cache-control": "no-cache"
  },
  "processData": false,
  "data": '{"command": "connect"}'
};

$.ajax(settings).done(function (response) {
  console.log(response);
  //var current = JQuery.parseJSON(response);
  //alert(response['current']['state']);
  //var msg = document.getElementById("baudrates");
  //for (var key in response['options']['baudrates']) {
    //  var newOption = new Option(response['options']['baudrates'][key], "Классика");
      //msg.appendChild(newOption);
  //}
  //msg.innerText = response['current']['state'];
  //return response;
});
};

var GetStatePrinter = function () {
	var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://127.0.0.1:" + ActivePort + "/api/connection",
  "method": "GET",
  "headers": {
    "x-api-key": ActiveApi,
    "content-type": "application/json",
    "cache-control": "no-cache"
  },
  "processData": false,
		"success": function (msg) {
			console.log(msg.current.state + 'MSG SUC');
			if (msg.current.state === 'Operational'){
				ConnectServ();
			} else {Disconnected();}
        },
		"error": function (msg) {
			console.log(msg + 'MSG ERR');
        },
};

$.ajax(settings).done(function (response) {
  console.log(response.current.state);
})};
var ShowTimer = function (iter, idIntervall) {
$('.connection_label').text(iter);
if (iter <0){console.log(iter, idIntervall);clearInterval(idIntervall);};
	 	if (iter === 0){console.log(iter, idIntervall, 'sad');clearInterval(idIntervall);};
};
var CheckedConnect = function (error) {
	if (error === 'false') {

                clearInterval(idIntervall);
             } else {
	var i = 30;
	 //while (i > 0){
	 var idIntervall=setInterval(function(){
	 	ShowTimer(i, idIntervall);
	 	i--;

	 },1000);
	 //i--;
	 console.log(i);
	 //};
	 //i--;
	 //if (i < 0){clearInterval(idIntervals);InitialServe('false');};
	 //if (i === 0){clearInterval(idIntervals);InitialServe('false');};
		 }
	//alert(args);
};

var InitialServe = function (error) {
if (error === 'false') {

                clearInterval(idIntervals);
             }
             else {
		var idIntervals=setInterval(function(){CheckedConnect();},32000);//опять запускается таймер
	}
};
/********END FUNC ******/
/*****Ready function start*****/
$(document).ready(function(){
	jetson();
	//ConnectServ();
	//$('#disconnect').onClick(DisconnectServ());
	//StartOcto();
	$('.preloader-it > .la-anim-1').addClass('la-animate');
	$('#pie_chart_1').data('easyPieChart').update(0);
	$('#degres_1').text('/' + TARGET + '°');
	$('#pie_chart_2').data('easyPieChart').update(0);
	$('#degres_2').text('/' + TARGET + '°');
	$('#pie_chart_3').data('easyPieChart').update(0);
	$('#degres_3').text('/' + TARGET + '°');
	//InitialServe();
	GetStatePrinter();
});
/*****Ready function end*****/

/*****Load function start*****/
$(window).on("load", function() {
	$(".preloader-it").delay(500).fadeOut("slow");
	/*Progress Bar Animation*/
	var progressAnim = $('.progress-anim');
	if( progressAnim.length > 0 ){
		for(var i = 0; i < progressAnim.length; i++){
			var $this = $(progressAnim[i]);
			$this.waypoint(function() {
			var progressBar = $(".progress-anim .progress-bar");
			for(var i = 0; i < progressBar.length; i++){
				$this = $(progressBar[i]);
				$this.css("width", $this.attr("aria-valuenow") + "%");
			}
			}, {
			  triggerOnce: true,
			  offset: 'bottom-in-view'
			});
		}
	};
    $('ul.menu-main').on('click', 'li:not(.active)', function() {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});

	var tabIndex = window.location.hash.replace('#tab','')-1;
	if (tabIndex != -1) $('ul.menu-main li').eq(tabIndex).click();

	$('a[href*=#tab]').click(function() {
		var tabIndex = $(this).attr('href').replace(/(.*)#tab/, '')-1;
		$('ul.menu-main li').eq(tabIndex).click();
	});

});
/*****Load function* end*****/

/***** Full height function start *****/
var setHeightWidth = function () {
	var height = $(window).height();
	var width = $(window).width();
	$('.full-height').css('height', (height));
	$('.page-wrapper').css('min-height', (height));

	/*Right Sidebar Scroll Start*/
	if(width<=1007){
		$('#chat_list_scroll').css('height', (height - 270));
		$('.fixed-sidebar-right .chat-content').css('height', (height - 279));
		$('.fixed-sidebar-right .set-height-wrap').css('height', (height - 219));

	}
	else {
		$('#chat_list_scroll').css('height', (height - 204));
		$('.fixed-sidebar-right .chat-content').css('height', (height - 213));
		$('.fixed-sidebar-right .set-height-wrap').css('height', (height - 153));
	}
	/*Right Sidebar Scroll End*/

	/*Vertical Tab Height Cal Start*/
	var verticalTab = $(".vertical-tab");
	if( verticalTab.length > 0 ){
		for(var i = 0; i < verticalTab.length; i++){
			var $this =$(verticalTab[i]);
			$this.find('ul.nav').css(
			  'min-height', ''
			);
			$this.find('.tab-content').css(
			  'min-height', ''
			);
			height = $this.find('ul.ver-nav-tab').height();
			$this.find('ul.nav').css(
			  'min-height', height + 40
			);
			$this.find('.tab-content').css(
			  'min-height', height + 40
			);
		}
	}
	/*Vertical Tab Height Cal End*/
};
/***** Full height function end *****/

/***** jetson function start *****/
var $wrapper = $(".wrapper");
var jetson = function(){

	/*Counter Animation*/
	var counterAnim = $('.counter-anim');
	if( counterAnim.length > 0 ){
		counterAnim.counterUp({ delay: 10,
        time: 1000});
	}

	/*Tooltip*/
	if( $('[data-toggle="tooltip"]').length > 0 )
		$('[data-toggle="tooltip"]').tooltip();

	/*Popover*/
	if( $('[data-toggle="popover"]').length > 0 )
		$('[data-toggle="popover"]').popover()


	/*Sidebar Collapse Animation*/
	var sidebarNavCollapse = $('.fixed-sidebar-left .side-nav  li .collapse');
	var sidebarNavAnchor = '.fixed-sidebar-left .side-nav  li a';
	$(document).on("click",sidebarNavAnchor,function (e) {
		if ($(this).attr('aria-expanded') === "false")
				$(this).blur();
		$(sidebarNavCollapse).not($(this).parent().parent()).collapse('hide');
	});

	/*Panel Remove*/
	$(document).on('click', '.close-panel', function (e) {
		var effect = $(this).data('effect');
			$(this).closest('.panel')[effect]();
		return false;
	});

	/*Accordion js*/
		$(document).on('show.bs.collapse', '.panel-collapse', function (e) {
		$(this).siblings('.panel-heading').addClass('activestate');
	});

	$(document).on('hide.bs.collapse', '.panel-collapse', function (e) {
		$(this).siblings('.panel-heading').removeClass('activestate');
	});

	/*Sidebar Navigation*/
	$(document).on('click', '#toggle_nav_btn,#open_right_sidebar,#setting_panel_btn', function (e) {
		$(".dropdown.open > .dropdown-toggle").dropdown("toggle");
		return false;
	});
	$(document).on('click', '#toggle_nav_btn', function (e) {
		$wrapper.removeClass('open-right-sidebar open-setting-panel').toggleClass('slide-nav-toggle');
		return false;
	});

	$(document).on('click', '#open_right_sidebar', function (e) {
		$wrapper.toggleClass('open-right-sidebar').removeClass('open-setting-panel');
		return false;

	});

	$(document).on('click','.product-carousel .owl-nav',function(e){
		return false;
	});

	$(document).on('click', 'body', function (e) {
		if($(e.target).closest('.fixed-sidebar-right,.setting-panel').length > 0) {
			return;
		}
		$('body > .wrapper').removeClass('open-right-sidebar open-setting-panel');
		return;
	});

	$(document).on('show.bs.dropdown', '.nav.navbar-right.top-nav .dropdown', function (e) {
		$wrapper.removeClass('open-right-sidebar open-setting-panel');
		return;
	});

	$(document).on('click', '#setting_panel_btn', function (e) {
		$wrapper.toggleClass('open-setting-panel').removeClass('open-right-sidebar');
		return false;
	});
	$(document).on('click', '#toggle_mobile_nav', function (e) {
		$wrapper.toggleClass('mobile-nav-open').removeClass('open-right-sidebar');
		return;
	});


	$(document).on("mouseenter mouseleave",".wrapper > .fixed-sidebar-left", function(e) {
		if (e.type == "mouseenter") {
			$wrapper.addClass("sidebar-hover");
		}
		else {
			$wrapper.removeClass("sidebar-hover");
		}
		return false;
	});

	$(document).on("mouseenter mouseleave",".wrapper > .setting-panel", function(e) {
		if (e.type == "mouseenter") {
			$wrapper.addClass("no-transition");
		}
		else {
			$wrapper.removeClass("no-transition");
		}
		return false;
	});

	/*Todo*/
	var random = Math.random();
	$(document).on("keypress","#add_todo",function (e) {
		if ((e.which == 13)&&(!$(this).val().length == 0))  {
				$('<li class="todo-item"><div class="checkbox checkbox-success"><input type="checkbox" id="checkbox'+random+'"/><label for="checkbox'+random+'">' + $('.new-todo input').val() + '</label></div></li><li><hr class="light-grey-hr"/></li>').insertAfter(".todo-list li:last-child");
				$('.new-todo input').val('');
		} else if(e.which == 13) {
			alert('Please type somthing!');
		}
		return;
	});

	/*Chat*/
	$(document).on("keypress","#input_msg_send",function (e) {
		if ((e.which == 13)&&(!$(this).val().length == 0)) {
			$('<li class="self mb-10"><div class="self-msg-wrap"><div class="msg block pull-right">' + $(this).val() + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">3:30 pm</span></div></div></div><div class="clearfix"></div></li>').insertAfter(".fixed-sidebar-right .chat-content  ul li:last-child");
			$(this).val('');
		} else if(e.which == 13) {
			alert('Please type somthing!');
		}
		return;
	});
	$(document).on("keypress","#input_msg_send_widget",function (e) {
		if ((e.which == 13)&&(!$(this).val().length == 0)) {
			$('<li class="self mb-10"><div class="self-msg-wrap"><div class="msg block pull-right">' + $(this).val() + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">3:30 pm</span></div></div></div><div class="clearfix"></div></li>').insertAfter(".chat-for-widgets .chat-content  ul li:last-child");
			$(this).val('');
		} else if(e.which == 13) {
			alert('Please type somthing!');
		}
		return;
	});
	$(document).on("keypress","#input_msg_send_chatapp",function (e) {
		if ((e.which == 13)&&(!$(this).val().length == 0)) {
			$('<li class="self mb-10"><div class="self-msg-wrap"><div class="msg block pull-right">' + $(this).val() + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">3:30 pm</span></div></div></div><div class="clearfix"></div></li>').insertAfter(".chat-for-widgets-1 .chat-content  ul li:last-child");
			$(this).val('');
		} else if(e.which == 13) {
			alert('Please type asomthing!');
		}
		return;
	});

	$(document).on("click",".fixed-sidebar-right .chat-cmplt-wrap .chat-data",function (e) {
		$(".fixed-sidebar-right .chat-cmplt-wrap").addClass('chat-box-slide');
		return false;
	});
	$(document).on("click",".fixed-sidebar-right #goto_back",function (e) {
		$(".fixed-sidebar-right .chat-cmplt-wrap").removeClass('chat-box-slide');
		return false;
	});

	/*Chat for Widgets*/
	$(document).on("click",".chat-for-widgets.chat-cmplt-wrap .chat-data",function (e) {
		$(".chat-for-widgets.chat-cmplt-wrap").addClass('chat-box-slide');
		return false;
	});
	$(document).on("click","#goto_back_widget",function (e) {
		$(".chat-for-widgets.chat-cmplt-wrap").removeClass('chat-box-slide');
		return false;
	});
	/*Horizontal Nav*/
	$(document).on("show.bs.collapse",".top-fixed-nav .fixed-sidebar-left .side-nav > li > ul",function (e) {
		e.preventDefault();
	});

	/*Slimscroll*/
	$('.nicescroll-bar').slimscroll({height:'100%',color: '#878787', disableFadeOut : true,borderRadius:0,size:'4px',alwaysVisible:false});
	$('.message-nicescroll-bar').slimscroll({height:'229px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.message-box-nicescroll-bar').slimscroll({height:'350px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.product-nicescroll-bar').slimscroll({height:'346px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.app-nicescroll-bar').slimscroll({height:'162px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.todo-box-nicescroll-bar').slimscroll({height:'310px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.users-nicescroll-bar').slimscroll({height:'370px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.users-chat-nicescroll-bar').slimscroll({height:'257px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.chatapp-nicescroll-bar').slimscroll({height:'543px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.chatapp-chat-nicescroll-bar').slimscroll({height:'483px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});

	/*Product carousel*/
	if( $('.product-carousel').length > 0 )
	var $owl = $('.product-carousel').owlCarousel({
		loop:true,
		margin:15,
		nav:true,
		navText: ["<i class='zmdi zmdi-chevron-left'></i>","<i class='zmdi zmdi-chevron-right'></i>"],
		dots:false,
		autoplay:true,
		responsive:{
			0:{
				items:1
			},
			400:{
				items:2
			},
			767:{
				items:3
				},
			1399:{
				items:4
			}
		}
	});

	/*Refresh Init Js*/
	var refreshMe = '.refresh';
	$(document).on("click",refreshMe,function (e) {
		var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
		var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
		var loadingAnim = panelToRefresh.find('.la-anim-1');
		panelToRefresh.show();
		setTimeout(function(){
			loadingAnim.addClass('la-animate');
		},100);
		function started(){} //function before timeout
		setTimeout(function(){
			function completed(){} //function after timeout
			panelToRefresh.fadeOut(800);
			setTimeout(function(){
				loadingAnim.removeClass('la-animate');
			},800);
		},1500);
		  return false;
	});

	/*Fullscreen Init Js*/
	$(document).on("click",".full-screen",function (e) {
		$(this).parents('.panel').toggleClass('fullscreen');
		$(window).trigger('resize');
		return false;
	});

	/*Nav Tab Responsive Js*/
	$(document).on('show.bs.tab', '.nav-tabs-responsive [data-toggle="tab"]', function(e) {
		var $target = $(e.target);
		var $tabs = $target.closest('.nav-tabs-responsive');
		var $current = $target.closest('li');
		var $parent = $current.closest('li.dropdown');
			$current = $parent.length > 0 ? $parent : $current;
		var $next = $current.next();
		var $prev = $current.prev();
		$tabs.find('>li').removeClass('next prev');
		$prev.addClass('prev');
		$next.addClass('next');
		return;
	});
};
/***** jetson function end *****/

/***** Chat App function Start *****/
var chatAppTarget = $('.chat-for-widgets-1.chat-cmplt-wrap');
var chatApp = function() {
	$(document).on("click",".chat-for-widgets-1.chat-cmplt-wrap .chat-data",function (e) {
		var width = $(window).width();
		if(width<=1007) {
			chatAppTarget.addClass('chat-box-slide');
		}
		return false;
	});
	$(document).on("click","#goto_back_widget_1",function (e) {
		var width = $(window).width();
		if(width<=1007) {
			chatAppTarget.removeClass('chat-box-slide');
		}
		return false;
	});
};
/***** Chat App function End *****/

var boxLayout = function() {
	if((!$wrapper.hasClass("rtl-layout"))&&($wrapper.hasClass("box-layout")))
		$(".box-layout .fixed-sidebar-right").css({right: $wrapper.offset().left + 300});
		else if($wrapper.hasClass("box-layout rtl-layout"))
			$(".box-layout .fixed-sidebar-right").css({left: $wrapper.offset().left});
}
boxLayout();

/***** Resize function start *****/
$(window).on("resize", function () {
	setHeightWidth();
	boxLayout();
	chatApp();
}).resize();
/***** Resize function end *****/

