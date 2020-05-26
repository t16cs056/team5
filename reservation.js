
function reflectReservation2(){
	//呼び出されたら予約情報を取得する
	console.log("予約情報の取得");
	var url = "https://sheetdb.io/api/v1/h1suyadjlg423?sheet=Sheet2"; // リクエスト先URL
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

			var date1 = {
				start: new Date("2015/05/10 11:00"),
				end  : new Date("2015/05/10 11:30")
				// start: new Date("201/05/10 12:00:00"),
				// end  : new Date("2015/05/10 12:30:00")
				// start: new Date("201/05/10 12:30:00"),
				// end  : new Date("2015/05/10 13:00:00")
				// start: new Date("201/05/10 12:00"),
				// end  : new Date("2015/05/10 13:00")
				// start: new Date("201/05/10 12:00:00"),
				// end  : new Date("2015/05/10 13:00:00")
			};

			// var reserved_start = new Date();
			// var reserved_end = new Date();
		
			// var date_reserved = {
			// 	start: reserved_start,
			// 	end: reserved_end,
			// }
			// console.log(reserved_start);
			
			const reserved_start = obj.start_time;
			const reserved_end = obj.end_time;

			// for(var i=0;i<obj.length;i++){
			// 	//var POST_OK = 0;

				if(date1.start >= reserved_end && date1.end <= reserved_start){
						console.log("予約できます");
				}else{
					console.log("予約できません");
				}
				
			//}

		}
	};
	request.send(null);
}


	


