
var doc              = document,
	calDate 	 	 = new Date(),
	calCounter       = 0,
	monthLabels      = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	dayName          = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	tableBody        = doc.getElementById('tbl-body');
	

var createCalendar = function() {
	var calendarHeader   = doc.getElementById('month-year'),
		
		currentMonth     = calDate.getMonth() + calCounter, // 0 - 11 (5)
		year             = calDate.getFullYear(), // 2015	 
		firstDate        = monthLabels[currentMonth] + " " + 1 + " " + year, // June 1 2015,
		firstDayOfMonth  = new Date(firstDate).toDateString(), // Mon Jun 01 2015,
		firstDay		 = firstDayOfMonth.substring(0,3), // Mon
		dayIndex		 = dayName.indexOf(firstDay), // 1 = Mon
		totalDays   	 = new Date(year, currentMonth+1, 0).getDate(),
		calNavLink       = '';
		

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

	// calendar navigation
	var calNav = doc.getElementById('cal-navigation'),
		prevNav = doc.getElementById('prev-nav'),
		nextNav = doc.getElementById('next-nav');

	calNav.addEventListener('click', function(e) {
		calNavLink = e.target.getAttribute("id");

		if ( calNavLink === 'next-nav' ) {
			showNextCalendar();
		}

    },false);

		
};

var showNextCalendar = function() {
	calCounter++; // go to the next month contents
	tableBody.innerHTML = null; // empty the table
	createCalendar(); // create contents again
}

createCalendar();








