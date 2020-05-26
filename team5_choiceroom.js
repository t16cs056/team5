function choiceroom(btnNo){
  
  link = "会議室" +btnNo + "の予約画面";
  href = "team5_calendar.html?name=" + btnNo;
  
  ret = confirm(link + "へ飛びます。宜しいですか？");
  if (ret == true){
    location.href = href;
  }
}