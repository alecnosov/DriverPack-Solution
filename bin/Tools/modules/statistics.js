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

var cid = getUserId();

var constantParams = "v=" + v + "&tid=" + tid + "&cid=" + cid + "&t=" + t + "&ec=" + ec + "&ea=" + ea + "&el=" + el;

var count = 0;

var report = {
 "drpStartCount": {
	"userIdDimension" : "&cd1=",
    "drpStartsCountMeasure": "&cm1="
  },
 "drpInstall": {
	"userIdDimension" : "&cd1=",
    "drpInstallationTimeMeasure": "&cm2="
  },
 "driversInstallationCount": {
	"driverDimension" : "&cd2=",
    "totalInstallCountMeasure": "&cm3=",
    "failureInstallCountMeasure": "&cm4="
  },
 "softInstallationCount": {
	"softDimension" : "&cd3=",
    "totalInstallCountMeasure": "&cm5=",
    "failureInstallCountMeasure": "&cm6="
  },
 "funcInstallationCount": {
	"funcDimension" : "&cd4=",
    "funcCallCountMeasure": "&cm7="
  },
 "drpExitCount": {
	"userIdDimension" : "&cd1=",
    "drpExitCountMeasure": "&cm8="
  },
 "hardware": {
	"name" : "&cd5=",
    "data" : "&cd6=",
	"count" : "&cm9="
  },
 "drpErrors" : {
	"name" : "&cd7=",
	"count" : "&cm10="
  },
 "buttonPress" : {
	"name" : "&cd8=",
	"count" : "&cm11="
  },
 "diagnosticFunc" : {
	"name" : "&cd9=",
	"count" : "&cm12="
  }



};


/*===============================================================*/
 /* Можно вызов организовать по ID элемента. Это работает */
 
 /*
  
  	$('#testId').click(function(){
		drpExitCount();
	});
	
*/
/*=====================================================================*/

//Отчет "Использование функции "Диагностика компьютера""
function diagnosticFunc(name){
	var params = constantParams + report.diagnosticFunc.name + name + report.diagnosticFunc.count + 1;
	sendRequest(params);
}

//Отчет "Цели: нажатие на кнопку"
function buttonPress(name){
	var params = constantParams + report.buttonPress.name + name + report.buttonPress.count + 1;
	sendRequest(params);
}

//Отчет "Ошибки"
function drpErrors(name){
	var params = constantParams + report.drpErrors.name + name + report.drpErrors.count + 1;
	sendRequest(params);
}

//Отчет "Данные аппаратного обеспечения"
function hardware(name, data){
	var params = constantParams + report.hardware.name + name + report.hardware.data + data + report.hardware.count + 1;
	sendRequest(params);
}

//Отчет Событие «закрытие программы»
function drpExitCount(){
	var params = constantParams + report.drpExitCount.userIdDimension + cid + report.drpExitCount.drpExitCountMeasure + 1;
	sendRequest(params);
}

//Отчет Использование функций диагностики компьютера
//func - название функции
function funcInstallationCount(func){
	var params = constantParams + report.funcInstallationCount.funcDimension + func + report.funcInstallationCount.funcCallCountMeasure + 1;
	sendRequest(params);
}

//Отчет Количество установок софта
//soft - название софта
//failure = 1 - неудачная установка. Если софт установился failure = 0
function softInstallationCount(soft, failure){
	var params = constantParams + report.softInstallationCount.softDimension + soft + 
									report.softInstallationCount.totalInstallCountMeasure + 1 +
									report.softInstallationCount.failureInstallCountMeasure + failure;
	sendRequest(params);
}

//Отчет Количество установок драйвера
//driver - название драйвера
//failure = 1 - неудачная установка. Если драйвер установился failure = 0
function driversInstallationCount(driver, failure){
	var params = constantParams + report.driversInstallationCount.driverDimension + driver + 
									report.driversInstallationCount.totalInstallCountMeasure + 1 +
									report.driversInstallationCount.failureInstallCountMeasure + failure;
	sendRequest(params);
}

//Отчет Время установки DRP
//interval - время установки в минутах
function drpInstall(interval){
		var params = constantParams + report.drpInstall.userIdDimension + cid + report.drpInstall.drpInstallationTimeMeasure + interval;
		sendRequest(params);
}

//Отчет Количество запусков DRP
function drpStartCount(){
	if(count == 0){
		count++;
		var params = constantParams + report.drpStartCount.userIdDimension + cid + report.drpStartCount.drpStartsCountMeasure + 1;
		sendRequest(params);
	}
}


//Отправка запроса
function sendRequest(params){
	try{
		sendXMLHttpRequest(params);
	}
	catch(e){
		sendAjaxRequest(params);
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




