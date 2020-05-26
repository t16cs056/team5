function setOption() {
	var n;
	//年
	document.fym.syear.length = h_year * 2 + 1;
	for (n=0;n<201;n++) {
		document.fym.syear[n].text = n + year - h_year;
		document.fym.syear[n].value = n + year - h_year;
	}
	document.fym.syear[h_year].selected = true;
	//月
	document.fym.smon.length = 12;
	for (n=0;n<12;n++) {
		document.fym.smon[n].text = n + 1;
		document.fym.smon[n].value = n + 1;
	}
	document.fym.smon[mon-1].selected = true;
}

function view_cal(cy,cm) {
	nowyear = cy;
	nowmonth = cm;
	get_cal = "";
	//1日
	fday = new Date(cy+"/"+cm+"/1");
	fyou = fday.getDay();
	//末日
	lday = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	if ((cy%4 == 0 && cy%100 != 0) || (cy%400 == 0)) {lday[1]++;}
	//カレンダー表示
	get_cal += "<table border='2'>";
	//get_cal += "<tr><th colspan='7'>"+cy+"年"+cm+"月</th></tr>";
	get_cal += "<tr>";
		for (m = 0; m < 7; m++){
			get_cal += "<th><font color='" + youbi_color[m] + "'>" + youbi[m] + "</font></th>";
		}
	get_cal += "</tr>";
	for (n = 0; n < 6; n++) {
		get_cal += "<tr>";
			for (m = 0; m < 7; m++){
				d = (n*7+m+1-fyou);
				if (year == cy && mon == cm && day == d) {get_cal += "<td id='button' align='right' bgcolor='#ff00FF'>";}
				else {get_cal += "<td id='button' align='right'>";}
				if (d > 0 && d <= lday[cm-1]) {get_cal += "<font color='" + youbi_color[m] + "'>" + d + "</font>";}
				else {get_cal += "&nbsp;";}
				get_cal += "</td>";
			}
		get_cal += "</tr>";
		if (d >= lday[cm-1]) break;
	}
	get_cal += "</table>";

	//出力
	document.getElementById("calendar").innerHTML = get_cal;
}

function change_cal() {
	
	cy = document.fym.syear.value;
	cm = document.fym.smon.value;
	
	view_cal(cy,cm);
}

function change_form(cy,cm) {
	view_cal(cy,cm);
	cy = cy - year + h_year;
	cm = cm - 1;
	document.fym.syear[cy].selected = true;
	document.fym.smon[cm].selected = true;
}

function change_month(ch) {
	cy = document.fym.syear.selectedIndex;
	cm = document.fym.smon.selectedIndex;
	
	if (ch > 0) {
		cy = cy + Math.floor(ch/12);
		cm = cm + ch % 12;
	} else {
		ch = Math.abs(ch);
		cy = cy - Math.floor(ch/12);
		cm = cm - ch % 12;
	}
	
	if (cm > 11) {cy += 1; cm -= 12;}
	if (cm < 0) {cy -= 1; cm += 12;}
	
	if (cy < 0) {cy = 0; cm = 0;}
	if (cy > h_year*2) {cy = h_year*2; cm = 11;}
	
	document.fym.syear[cy].selected = true;
	document.fym.smon[cm].selected = true;

	cy = document.fym.syear.value;
	
	view_cal(cy,cm+1);
	//now_select_date.setFullYear(nowyear);
	//now_select_date.setMonth(nowmonth-1);
}


function weekly_change(now_select_date){
  	var wd = ['日', '月', '火', '水', '木', '金', '土'];

  	$('.dateSlideTable .date').text(function(){

		var m = now_select_date.getMonth()+1;
		var d = now_select_date.getDate();
    	var w = wd[now_select_date.getDay()];
		now_select_date.setDate(now_select_date.getDate()+1);
    	return m+"月"+d+"日"+"(" + w + ")";
  	});

	$('.dateSlideTable .time').text(function(){
    	return "time＼date";
  	});
  	
}

//予約された場所の背景色を変更する関数
function changeBackColor(matchdata){
	console.log(matchdata);
	//デバッグ用　クリックされた日付（weeklyカレンダーの右端の日付）
	firstday = new Date();
	firstday.setFullYear(nowyear);
	firstday.setMonth(nowmonth-1);
	firstday.setDate(nowday);
	firstday.setHours(10);
	firstday.setMinutes(00);
	//デバッグ用　予定がある日付の開始時間
	/*
	changeday = new Date();
	changeday.setFullYear(nowyear);
	changeday.setMonth(nowmonth-1);
	changeday.setDate(nowday);
	changeday.setHours(10);
	changeday.setMinutes(00);
	//デバッグ用　予定がある日付の終了時間
	changeday_finish = new Date();
	changeday_finish.setFullYear(nowyear);
	changeday_finish.setMonth(nowmonth-1);
	changeday_finish.setDate(nowday);
	changeday_finish.setHours(12);
	changeday_finish.setMinutes(30);
	*/
	//本番仕様　予定がある日付の開始時間
	changeday = new Date();
	changeday.setFullYear(matchdata.year);
	changeday.setMonth(matchdata.month-1);
	changeday.setDate(matchdata.day);
	changeday.setHours(matchdata.start_hour);
	changeday.setMinutes(matchdata.start_minute);
	
	//本番仕様　予定がある日付の終了時間
	changeday_finish = new Date();
	changeday_finish.setFullYear(matchdata.year);
	changeday_finish.setMonth(matchdata.month-1);
	changeday_finish.setDate(matchdata.day);
	changeday_finish.setHours(matchdata.end_hour);
	changeday_finish.setMinutes(matchdata.end_minute);
	

	//3日後に予定がある想定で日付を設定
	//changeday.setDate(changeday.getDate()+4);
	//changeday_finish.setDate(changeday_finish.getDate()+4);
	console.log(firstday);
	console.log(changeday);
	console.log(changeday_finish);
	//var selector = '.time_10 #day_';

	//先頭の日付と予定の日付の差
	var day_dif = Math.round((changeday - firstday) / 86400000);
	//console.log(day_dif);
	//selector += Math.round(difference);
	//console.log(selector);

	//会議の時間計算
	var time_dif = Math.round((changeday_finish-changeday)/(1000*60*60));
	//console.log(time_dif);
	
	//for文を使って表示
	for(var i = 0; i < time_dif; i++){
		var selector = ".time_";
		selector += (changeday.getHours()+i) + " #day_" + day_dif;
		
		console.log(selector);
		$(selector).css('background-color', '#FF1111');
		if(i == 0){
			$(selector).text(function(){return "予約済み";});

		}
		//登録したところのhtml要素にこれを追加して呼び出せれば吹き出し出そうなんだが・・・
		//<p class="arrow_box">ふきだし1</p>
		//document.getElementById("calendar").innerHTML = get_cal;
	}
	//document.getElementsByClassName('weekly').innerHTML = '<p class="arrow_box">ふきだし1</p>';
	//$(selector).css('background-color', '#FF1111');
}


//予約データを取得し、それをweeklyカレンダーに反映させる
function reflectReservation(){
	//呼び出されたら予約情報を取得する
	console.log("予約情報の取得");
	var url = "https://sheetdb.io/api/v1/h1suyadjlg423"; // リクエスト先URL
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.onreadystatechange = function (obj) {
    	if (request.readyState != 4) {
        	// リクエスト中
			console.log("もらってきます！");
    	} else if (request.status != 200) {
        	// 失敗
			console.log(request.status);
			console.log("もらえませんでした・・・");
    	} else {
        	// 取得成功
			// var result = request.responseText;
			console.log(request.responseText);
			var json = request.responseText;
			var obj = JSON.parse(json);
			console.log("予約情報の絞り込み");
			
			//今日の日付を使用して予約情報の絞り込みを行う
	
			//指定の会議室のデータを抽出
			
			matchData = obj.filter(function(item, index){
				if (item.room == room ) return true;
			});
			
			//matchData = obj;
			
			//絞り込まれた予約情報一つ一つを参照し、その時間に合った場所を塗りつぶす
			console.log("予約情報の反映");
			//matchDataの中にはその年の予約データ

			//日付オブジェクト
			week_first_date = new Date();

			week_first_date.setFullYear(nowyear);
			week_first_date.setMonth(nowmonth-1);
			week_first_date.setDate(nowday);
			//console.log("選択中の日付は" + nowyear + "年" + nowmonth + "月" + nowday + "日");
			//console.log("wfdは" + week_first_date.getFullYear() + "年" + (week_first_date.getMonth()+1) + "月" + week_first_date.getDate() + "日");
			
			week_date = new Date();
			week_date.setFullYear(nowyear);
			week_date.setMonth(nowmonth-1);
			week_date.setDate(nowday);
			
			//console.log(week_first_date);
			//console.log(week_date);
			for(var i=0;i<matchData.length;i++){
				//console.log(matchData[i].month + "月" + matchData[i].day + "日");
				//console.log(i+"週目");
				for(;(week_date - week_first_date) / 86400000 < 7;){
					//console.log(week_date);
					//日付があっていたら
					//console.log(matchData[i].year + ":" + week_date.getFullYear());
					//console.log(matchData[i].month + ":" + (week_date.getMonth()+1));
					//console.log(matchData[i].day + ":" + week_date.getDate());
					if(matchData[i].year == week_date.getFullYear() &&
					matchData[i].month == (week_date.getMonth()+1) && 
					matchData[i].day == week_date.getDate()
					){
						//console.log("Data hit!!!!!");
						changeBackColor(matchData[i]);
					}
					week_date.setDate(week_date.getDate()+1);
				}
				
				
				week_date.setFullYear(week_first_date.getFullYear());
				week_date.setMonth(week_first_date.getMonth());
				week_date.setDate(week_first_date.getDate());
				//console.log(week_date);
			}
			
		}
	};
	request.send(null);


	
}

//予約の時間帯が被っているか確認
function checkDuplication(click_date, click_time){
	return new Promise((resolve,reject) => {
		console.log("データ持ってきて判定します");
		
		//console.log(click_date); //クリックしたところの日付　
		//console.log(click_time); //時刻のみ　例えば「9」
		//POSTしてよければtrue
		var POST_OK = true;
		//YMDと会議室を指定して情報をGET
		// リクエスト先URL
		var url = "https://sheetdb.io/api/v1/h1suyadjlg423/search?room=" + room + "&year=" + click_date.getFullYear() 
				+ "&month=" + (click_date.getMonth()+1) + "&day=" + click_date.getDate();
		//console.log(url);
		var request = new XMLHttpRequest();
		request.open('GET', url);
		request.onreadystatechange = function (obj) {
			if (request.readyState != 4) {
				// リクエスト中
				//console.log("もらってきます！");
			} else if (request.status != 200) {
				// 失敗
				console.log(request.status);
				console.log("もらえませんでした・・・");
			} else {
				// 取得成功
				console.log(request.responseText);
				var json = request.responseText;
				var obj = JSON.parse(json);

				var select_start = new Date();
				select_start.setFullYear(click_date.getFullYear());
				select_start.setMonth(click_date.getMonth());
				select_start.setDate(click_date.getDate());
				select_start.setHours(click_time);
				select_start.setMinutes(0); 
				select_start.setSeconds(0);

				var select_end = new Date();
				select_end.setFullYear(select_start.getFullYear());
				select_end.setMonth(select_start.getMonth());
				select_end.setDate(select_start.getDate());
				select_end.setHours(select_start.getHours() + 3);
				select_end.setMinutes(0); 
				select_end.setSeconds(0);
				var date_select = {
					start: select_start,
					end: select_end,
				}
				console.log("被り確認");
				console.log(date_select.start);
				console.log(date_select.end);
				for(var i=0;i<obj.length;i++){
					console.log(i + "番目");
					
					var reserved_start = new Date();
					reserved_start.setFullYear(obj[i].year);
					reserved_start.setMonth(obj[i].month-1);
					reserved_start.setDate(obj[i].day);
					reserved_start.setHours(obj[i].start_hour);
					reserved_start.setMinutes(obj[i].start_minute); 
					reserved_start.setSeconds(0);

					var reserved_end = new Date();
					reserved_end.setFullYear(reserved_start.getFullYear());
					reserved_end.setMonth(reserved_start.getMonth());
					reserved_end.setDate(reserved_start.getDate());
					reserved_end.setHours(obj[i].end_hour);
					reserved_end.setMinutes(obj[i].end_minute); 
					reserved_end.setSeconds(0);
					//予約されている日付のデータ
					var date_reserved = {
						start: reserved_start,
						end: reserved_end,
					}
					console.log( date_select.start <= date_reserved.end && date_select.end >= date_reserved.start );

					if(date_select.start <= date_reserved.end && date_select.end >= date_reserved.start){
						console.log(obj[i] + "と被ってます・・・")
						POST_OK = false;
						//console.log(POST_OK);
					}
				}
			}
		};
		request.send(null);
		console.log(POST_OK);
		//return POST_OK;
        resolve(POST_OK);
    })

	//console.log(click_date); //クリックしたところの日付　
	//console.log(click_time); //時刻のみ　例えば「9」
	//POSTしてよければtrue
	var POST_OK = 0;
	//YMDと会議室を指定して情報をGET
	// リクエスト先URL
	var url = "https://sheetdb.io/api/v1/h1suyadjlg423/search?room=" + room + "&year=" + click_date.getFullYear() 
			+ "&month=" + (click_date.getMonth()+1) + "&day=" + click_date.getDate();
	//console.log(url);
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.onreadystatechange = function (obj) {
    	if (request.readyState != 4) {
        	// リクエスト中
			//console.log("もらってきます！");
    	} else if (request.status != 200) {
        	// 失敗
			console.log(request.status);
			console.log("もらえませんでした・・・");
    	} else {
        	// 取得成功
			console.log(request.responseText);
			var json = request.responseText;
			var obj = JSON.parse(json);

			var select_start = new Date();
			select_start.setFullYear(click_date.getFullYear());
			select_start.setMonth(click_date.getMonth());
			select_start.setDate(click_date.getDate());
			select_start.setHours(click_time);
			select_start.setMinutes(0); 
			select_start.setSeconds(0);

			var select_end = new Date();
			select_end.setFullYear(select_start.getFullYear());
			select_end.setMonth(select_start.getMonth());
			select_end.setDate(select_start.getDate());
			select_end.setHours(select_start.getHours() + 3);
			select_end.setMinutes(0); 
			select_end.setSeconds(0);
			var date_select = {
				start: select_start,
				end: select_end,
			}
			console.log("被り確認");
			console.log(date_select.start);
			console.log(date_select.end);
			for(var i=0;i<obj.length;i++){
				console.log(i + "番目");
				
				var reserved_start = new Date();
				reserved_start.setFullYear(obj[i].year);
				reserved_start.setMonth(obj[i].month-1);
				reserved_start.setDate(obj[i].day);
				reserved_start.setHours(obj[i].start_hour);
				reserved_start.setMinutes(obj[i].start_minute); 
				reserved_start.setSeconds(0);

				var reserved_end = new Date();
				reserved_end.setFullYear(reserved_start.getFullYear());
				reserved_end.setMonth(reserved_start.getMonth());
				reserved_end.setDate(reserved_start.getDate());
				reserved_end.setHours(obj[i].end_hour);
				reserved_end.setMinutes(obj[i].end_minute); 
				reserved_end.setSeconds(0);
				//予約されている日付のデータ
				var date_reserved = {
					start: reserved_start,
					end: reserved_end,
				}
				
				//console.log(date_reserved.start);
				//console.log(date_reserved.end);
				console.log( date_select.start <= date_reserved.end && date_select.end >= date_reserved.start );
				//console.log( date_select.start <= date_reserved.end);
				//console.log( date_select.end >= date_reserved.start);

				if(date_select.start <= date_reserved.end && date_select.end >= date_reserved.start){
					console.log(obj[i] + "と被ってます・・・")
					POST_OK = 1;
					console.log(POST_OK);
					return false;
				}
				/*
				if(i+1 == obj.length){
					POST_OK=2;
					console.log(POST_OK);
					return false;				
				}
				*/
			}
			
		}
	};
	request.send(null);
	/*
	setTimeout(() => {
		console.log("return " + POST_OK);
		return false;
	  }, 3000)
	  */
	console.log(POST_OK);
	return POST_OK;
}

//予約を行う（POSTする）
function postReservation(click_date, click_time){
	/*
	curl -X POST -H "Content-Type: application/json" https://sheetdb.io/api/v1/9nqj04481ql3u -d 
	"{\"data\":[{ \"id\": \"100\", \"room\": \"A\", \"year\": \"2020\", \"month\": \"9\", \"day\": \"1\"
	, \"start_hour\": \"14\", \"start_minute\": \"0\", \"end_hour\": \"17\", \"end_minute\": \"20\" }]}"
	*/
	//var data = '{"data":[{"id":"500","room":"A","year":"2021","month":"1","day":"1","start_hour":"14","start_minute":"0","end_hour":"17","end_minute":"20"}]}';
	//var data = '';

	checkDuplication(click_date,click_time)
	.then((response) =>{
		//POST処理
		console.log("最終的な結果は "+response);
		console.log("最終結果をもとにここでPOSTする");
	}
	)


	//var flag = checkDuplication(click_date, click_time);
	if(false){
		var postdata = '{"data":[{"id":"yanagitest","room":"' + room + '","year":"' + click_date.getFullYear() + '","month":"' + (click_date.getMonth()+1) + 
		'","day":"' + click_date.getDate() + '","start_hour":"' + click_time + '","start_minute":"0","end_hour":"' + (parseInt(click_time)+1) + '","end_minute":"0"}]}';
		console.log(postdata);
		var url = "https://sheetdb.io/api/v1/h1suyadjlg423"; // リクエスト先URL
		var data = postdata; // 送信データ ('param=value&...')
		var request = new XMLHttpRequest();
		request.open('POST', url);
		console.log(request);
		
		request.onreadystatechange = function () {
			if (request.readyState != 4) {
				// リクエスト中
			} else if (request.status != 201) {
				// 失敗
				console.log(request);
				console.log("送信できませんでした・・・");
			} else {
				// 送信成功
				// var result = request.responseText;
				console.log("送信できました！");	
				reflectReservation();
			}
		};
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(data);
	}else{
		console.log("その時間帯は既に会議が存在しています！");
		//alert("その時間帯は既に会議が存在しています！");
	}
	
}

var head = document.getElementsByTagName('head')
var script = document.createElement('script')
//ここで任意のjQueryを読み込ませる
script.setAttribute('src', 'https://code.jquery.com/jquery-1.12.4.min.js')
script.setAttribute('type', 'text/javascript')
script.addEventListener('load', function() {

	// ここにjQueryの記述をする
	
	//monthlyカレンダーの選択
	$('body').on('click', 'table #button', function() {
		//初期状態では今日の年月を使用している
		//変更があった際は、変更した後で年月を指定して表示している
		var eventHTML = event.target.innerHTML;

		if(eventHTML.length > 2)
			;
		else{
			nowday = parseInt(eventHTML);
			now_select_date.setFullYear(nowyear);
			now_select_date.setMonth(nowmonth-1);
			now_select_date.setDate(eventHTML);
			weekly_change(now_select_date);
			//alert(nowyear + "年" + nowmonth + "月" + eventHTML + "日" + 'がクリックされました！');
			//alert(eventHTML + "日" + 'がクリックされました！');
			
			//console.log("year:" + nowyear + "month:" + nowmonth + "day:" + eventHTML);
			
			
			$('.weekly td').css('background-color', 'white');
			$('.weekly td').text(function(){return "";});
			//changeBackColor();
			reflectReservation();
		}
	})

	//weeklyカレンダーのクリックアクション
	$('body').on('click', '.weekly td', function() {
			
		var eventHTML = event.target.innerHTML;
		var eventID = event.target.id; //day_0とかが入っている
		
		var eventClass = $(this).closest('tr').attr("class"); //time_9とかが入ってる
		
		var click_day = parseInt(eventID.replace( "day_" , "" )); //数字のみ抜き出し
		//sconsole.log("day:" + click_day);
		
		var click_time = eventClass.replace( "time_" , "" ); //数字のみ抜き出し
		//console.log("time:" + click_time);

		//console.log(now_select_date); //現在表示されている日付の最後の日付+1日目
		//ここでの表示に必要なので日付を作る
		click_date = new Date();
		click_date.setFullYear(now_select_date.getFullYear());
		click_date.setMonth(now_select_date.getMonth());
		click_date.setDate(now_select_date.getDate());
		click_date.setDate(click_date.getDate()- 7 + click_day);
		//console.log(click_date);
		
		
		var result = confirm(click_date.getFullYear() + "年 " + (click_date.getMonth()+1) + "月 " + click_date.getDate() + "日 " + click_time + '時 00分 から会議を' + '予約しますか？');
		
		if(result){													//trueの処理			
			if(eventHTML.length > 2){
				//alert(click_date.getFullYear() + "年" + (click_date.getMonth()+1) + "月" + click_date.getDate() + "日" + click_time + '時がクリックされました！');
			}else{
				//alert(click_date.getFullYear() + "年" + (click_date.getMonth()+1) + "月" + click_date.getDate() + "日" + click_time + '時がクリックされました！');
				
			}
			console.log(click_date.getFullYear() + "年" + (click_date.getMonth()+1) + "月" + click_date.getDate() + "日" + click_time + '時がクリックされました！');
			postReservation(click_date, click_time);	
		}else{
			console.log('予約に失敗しました');
		}
		
	})

})
document.head.appendChild(script)