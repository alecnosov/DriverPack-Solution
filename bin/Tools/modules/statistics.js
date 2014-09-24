//alert("START");

var paramsPath = "c:/4/reports.txt"; //путь к файлу с параметрами запросов 
var userPath  = "c:/4/user.txt"; //путь к файлу с идентификатором пользователя

var address = "http://www.google-analytics.com/collect"; //URL для отправки запроса по Measurement Protocol
var v = "1";
var tid = "UA-55108042-1"; //"UA-54491896-1"; 

var t = "event";
var ec = "Category";
var ea = "Virtual";
var el = "Completed";

var count = 0;

/*===============================================================*/
 /* Можно вызов организовать по ID элемента. Это работает */
 
 /*
  
  	$('#testId').click(function(){
		drpExitCount()ж
	});
	
*/
/*=====================================================================*/

//Отчет Событие «закрытие программы»
function drpExitCount(){
	var cid = getUserId();
	var cm8 = 1;
	var params = "v=" + v + "&tid=" + tid + "&cid=" + cid + "&t=" + t + "&ec=" + ec + "&ea=" + ea + "&el=" + el + "&cd1=" + cid + "&cm8=" + cm8;
	try{
		sendXMLHttpRequest(params);
	}
	catch(e){
		sendAjaxRequest(params);
	}
}

//Отчет Использование функций диагностики компьютера
//func - название функции
function funcInstallationCount(func){
	var cid = getUserId();
	var cd4 = func;
	var cm7 = 1;
	var params = "v=" + v + "&tid=" + tid + "&cid=" + cid + "&t=" + t + "&ec=" + ec + "&ea=" + ea + "&el=" + el + "&cd4=" + cd4 + "&cm7=" + cm7;
	try{
		sendXMLHttpRequest(params);
	}
	catch(e){
		sendAjaxRequest(params);
	}
}

//Отчет Количество установок софта
//soft - название софта
//failure = 1 - неудачная установка. Если софт установился failure = 0
function softInstallationCount(soft, failure){
	var cid = getUserId();
	var cd3 = soft;
	var cm5 = 1;
	var cm6 = failure;
	var params = "v=" + v + "&tid=" + tid + "&cid=" + cid + "&t=" + t + "&ec=" + ec + "&ea=" + ea + "&el=" + el + "&cd3=" + cd3 + "&cm5=" + cm5 + "&cm6=" + cm6;
	try{
		sendXMLHttpRequest(params);
	}
	catch(e){
		sendAjaxRequest(params);
	}
}

//Отчет Количество установок драйвера
//driver - название драйвера
//failure = 1 - неудачная установка. Если драйвер установился failure = 0
function driversInstallationCount(driver, failure){
	var cid = getUserId();
	var cd2 = driver;
	var cm3 = 1;
	var cm4 = failure;
	var params = "v=" + v + "&tid=" + tid + "&cid=" + cid + "&t=" + t + "&ec=" + ec + "&ea=" + ea + "&el=" + el + "&cd2=" + cd2 + "&cm3=" + cm3 + "&cm4=" + cm4;
	try{
		sendXMLHttpRequest(params);
	}
	catch(e){
		sendAjaxRequest(params);
	}
}

//Отчет Время установки DRP
//interval - время установки в минутах
function drpInstall(interval){
	var cid = getUserId();
	var cm2 = interval;
	var params = "v=" + v + "&tid=" + tid + "&cid=" + cid + "&t=" + t + "&ec=" + ec + "&ea=" + ea + "&el=" + el + "&cd1=" + cid + "&cm2=" + cm2;
	try{
		sendXMLHttpRequest(params);
	}
	catch(e){
		sendAjaxRequest(params);
	}
}

//Отчет Количество запусков DRP
function drpStartCount(){
	if(count == 0){
		var cid = getUserId();
		var cm1 = 1; 
		var params = "v=" + v + "&tid=" + tid + "&cid=" + cid + "&t=" + t + "&ec=" + ec + "&ea=" + ea + "&el=" + el + "&cd1=" + cid + "&cm1=" + cm1;
		try{
			count++;
			sendXMLHttpRequest(params);
			sendFromFile();
		}
		catch(e){
			count++;
			sendAjaxRequest(params);
			sendFromFile();
		}
	}
}

 // Данная функция создаёт кроссбраузерный объект XMLHTTP 
function getXmlHttp() {
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } 
	catch (e) {
		try {
		  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch (E) {
		  xmlhttp = false;
		}
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
 
//Отправка 	XMLHttp запроса
function sendXMLHttpRequest(params){
	try{
		var xmlhttp = getXmlHttp();
		xmlhttp.open("POST", address, false);
		xmlhttp.setRequestHeader("Content-Type", "text/html");
		xmlhttp.send(params);
		var data = xmlhttp.responseText;
		alert("xmlhttp.responseText = " + data);
	}
	catch(e){
		saveRequestParams(params);
	}
}

//Отправка Ajax запроса
function sendAjaxRequest(params){
	$.ajax({
			type: 'POST',
            url: address,
            crossDomain: true,
            data: params,
            dataType: 'text',
            success: function(responseData)
            {
                alert("response = " + responseData);
            },
            error: function(errorThrown)
            {
				saveRequestParams(params);
                alert("error = " + errorThrown);
            }
        });
}

//Сохранение параметров запроса в файл
function saveRequestParams(params){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (fso.FileExists(paramsPath)){
		var file = fso.OpenTextFile(paramsPath, 8);
		var data=file.WriteLine(params);
		file.Close();
	}
	else{
		var file = fso.CreateTextFile(paramsPath, true);
		var data = file.WriteLine(params);
		indexfile.Close();
	}
}

//Сохранение идентификатора пользователя в файл
function saveUserId(userId){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (!fso.FileExists(userPath)){
		var file = fso.CreateTextFile(userPath, true);
		var data = file.WriteLine(userId);
		file.Close();
	}
}
 
//Получение идентификатора пользователя из файла
function getUserId(){
	var userId;
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (fso.FileExists(userPath)){
		var file = fso.OpenTextFile(userPath);
		userId = file.ReadLine();
        file.Close();
	}
	else{
		userId = generateUUID();
		saveUserId(userId);
	}
	return userId;
}

//Подсчет количества строк (параметров) сохраненных в файле
function getFileLines(filepath){
  var fso = new ActiveXObject("Scripting.FileSystemObject");
  var file = fso.GetFile(filepath);
  var size = file.Size; // Объем файла
  file = fso.OpenTextFile(filepath);
  file.Skip(size); // Перемещаем указатель в конец файла
  var lines = file.Line-1; // Количество строк
  file.Close();
  return lines;
}

//отсылка параметров из файла
function sendFromFile(){
	var fso = new ActiveXObject("Scripting.FileSystemObject"); // Создаем объект
	if (fso.FileExists(paramsPath)){
		var params;
		var file = fso.OpenTextFile(paramsPath, 1, false);
		var lines = getFileLines(paramsPath); 
 		var i = 0;
		while (i<lines)
		{
			params = file.ReadLine(); // Чтение строк файла
			try{
				sendXMLHttpRequest(params);
			}
			catch(e){
				sendAjaxRequest(params);
			}
			i++;
		}
		file.Close();
		deleteFile();
	}
}

function deleteFile(){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	fso.DeleteFile(paramsPath, true);
}

//Генерация идентификатора пользователя
function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};




