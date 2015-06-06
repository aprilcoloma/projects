
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

		for (var i = 0; i < 6; i++) {
			if (i == dayIndex ) {
				break;
			}

			var td = doc.createElement('td'),
				tr = doc.createElement('tr');

			td.innerHTML = "";
			tr.appendChild(td);
		}

		tableBody.appendChild(tr);


		





	};

	getCalendar();







