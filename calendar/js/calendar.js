
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


		// days counter (to be compared against the total days)
		var count = 1;

		// create rows for the weeks (approximately 6 rows)
		for (var i = 0; i < 6; i++) {

			var tr = doc.createElement('tr');

			// create cells for the days
			for (var j = 0; j < 7; j++) {
				var td = doc.createElement('td');

				// if days are less than our total days and our rows are greater than zero, or cell is greater that our current day, 
				// (start displaying on the first day of the month, cells before the first day should be left blank)
				if ( count <= totalDays && (i > 0 || j >= dayIndex) ) {
					td.innerHTML = count;
					count++;	
				}

				// add the rows to our table body
				tr.appendChild(td);
				
			}

			// display the days
			tableBody.appendChild(tr);
		}
		

	
	};

	getCalendar();







