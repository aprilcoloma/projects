
var doc              = document,
	calDate 	 	 = new Date(),
	monthLabels      = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	dayName          = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	currentMonth     = calDate.getMonth(), // 0 - 11 (5)
	year             = calDate.getFullYear(), // 2015	 
	firstDate        = monthLabels[currentMonth] + " " + 1 + " " + year, // June 1 2015,
	firstDayOfMonth  = new Date(firstDate).toDateString(), // Mon Jun 01 2015,
	firstDay		 = firstDayOfMonth.substring(0,3), // Mon
	dayIndex		 = dayName.indexOf(firstDay), // 1 = Mon
	totalDays   	 = new Date(year, currentMonth+1, 0).getDate();



	var getCalendar = function() {
		var calendarHeader = doc.getElementById('month-year'),
			tableBody      = doc.getElementById('tbl-body');
			

		// display the month and the year
		calendarHeader.innerHTML =  monthLabels[currentMonth] + " " + year;


		// create first row

		var count = 1;

		for (var i = 0; i < 6; i++) {
			var tr = doc.createElement('tr');


			for (var j = 0; j < 7; j++) {
				var td = doc.createElement('td');

				if ( count <= totalDays && (i > 0 || j >= dayIndex) ) {
					td.innerHTML = count;
					count++;	
				}

				tr.appendChild(td);
				
			}

			tableBody.appendChild(tr);
		}
		


		// var count = 1;

		
		// for ( var d = 0; d <= 6; d++) {

		// 	if ( d === dayIndex ) {
		// 		break;
		// 	}

		// 	var td = doc.createElement('td');
		// 	td.innerHTML = "blank";
		// 	tr.appendChild(td);
		// }

		// tableBody.appendChild(tr);



		// var count = 1;
		// for (var e = 0; e <= 6; e++) {
		// 	var td1 = doc.createElement('td');
		// 	td1.innerHTML = count;
		// 	count++;
		// 	tr.appendChild(td1);
		// }

		// tableBody.appendChild(tr);
		// // create 2nd row
		

		// // rest of the rows.
		// for (var r = 3; r <= 6; r++) {
		// 	tr = doc.createElement('tr');

		// 	for ( var c = 0; c<=6; c++) {
		// 		if (count > totalDays) {
		// 			tableBody.appendChild(tr);
		// 			return tableBody;
		// 		}

		// 		var td = doc.createElement('td');

		// 		td.innerHTML = count;
		// 		count++;
		// 		tr.appendChild(td);

		// 	}

		// 	tableBody.appendChild(tr);
		// }
		





	};

	getCalendar();







