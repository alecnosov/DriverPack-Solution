 /**
 * @name hiliteSearchTerm
 * @function
 */
function statisticsHdd_detect(){
	//Get data
	hdd_init();
	
	//hdd.length=0;	//debug

	if (hdd.length==0) {	//If the HDD is not visible
		document.getElementById('hdd_alert').innerHTML=hdd_notSupport;
	}
	else if (hdd.length>=1) {	//If the HDD is found
		var ant='';
		for (var i=0;i<hdd.length;i++) {
			var MediaType=hdd[i].MediaType;
			if (MediaType.indexOf('hard disk') != -1){
				if (MediaType.indexOf('External') != -1){
					ant=ant+'<i>'+hdd_external+'</i>: ';
				}
				ant=ant+hdd[i].RealName+'<br>';
			}
		}
		return ant;
	}
}

/**
 * Выводит предупреждение, если на жестком диске меньше 90% свободного пространства.
 * @return  document.getElementById('hddFreeSpace_alert').innerHTML
 * @requires HDD
 */
 /**
 * @name hiliteSearchTerm
 * @function
 */
function statisticsHddFreeSpace_detect(){
	//Get data
	logicalDisk_init();
	
	//logicalDisk.length=0;	//debug

	if (logicalDisk.length==0) {	//If the local disk not found
		document.getElementById('hddFreeSpace_alert').innerHTML='';
	}
	else if (logicalDisk.length>=1) {	//If the local disk is found
		var ant='';
		for (var i=0;i<logicalDisk.length;i++) {
			if ((logicalDisk[i].DriveType=='3')&&(logicalDisk[i].FreeSpace)){
				var procentag = (100-(logicalDisk[i].FreeSpace*100/logicalDisk[i].Size));
				
				//procentag=98;	//Debug
				if (procentag>90){
					ant=ant+logicalDisk[i].Name+'/ - '+ procentag.toFixed(0) + '%; ';
				}
				//break;	//Debug
			}
		}
		return ant;
	}
}
