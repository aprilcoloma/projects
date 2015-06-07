
var doc              = document,
	calDate 	 	 = new Date(),
	calCounter       = 0,

	currentMonth, firstDate, year, firstDayOfMonth, firstDay, dayIndex, totalDays, calNavLink,

	monthLabels      = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 
						'October', 'November', 'December'],
	dayName          = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	tableBody        = doc.getElementById('tbl-body'),
	calendarHeader   = doc.getElementById( 'month-year' );




var createCalendar = function() {
	currentMonth     = calDate.getMonth() + calCounter; // 0 - 11 (5)
	year             = calDate.getFullYear(); // 2015

	// change it back to january, jump to the next year
	if ( currentMonth > monthLabels.length-1 ) {
		currentMonth = 0;
		year++;
		console.log('current month: ' + currentMonth);
	}

	firstDate        = monthLabels[currentMonth] + " " + 1 + " " + year; // June 1 2015 
	firstDayOfMonth  = new Date(firstDate).toDateString(); // Mon Jun 01 2015,
	firstDay		 = firstDayOfMonth.substring(0,3); // Mon
	dayIndex		 = dayName.indexOf(firstDay); // 1 = Mon
	totalDays   	 = new Date(year, currentMonth+1, 0).getDate();
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
	
};


// next or previous calendar
var changeCalendar = {	

	showNextCalendar: function() {
		calCounter++; // go to the next month contents

		if ( currentMonth+1 > monthLabels.length - 1 ) {
			this.resetCalendar();
		} else {
			currentMonth++;
			createCalendar(); // create contents again
		}
	},

	showPreviousCalendar: function() {
		calCounter--; // go to the previous month contents
		console.log(calCounter);
		createCalendar(); // create contents again
	},

	resetCalendar: function() {
		calDate = new Date(year+1, 0);
		calCounter = 0;

		console.log( ' current calendar counter: ' + calCounter );
		var monthsAwayUntilNextYear = monthLabels.length - currentMonth;
		var temp = (monthLabels.length-1) + currentMonth;
		var triggerReset = monthsAwayUntilNextYear + currentMonth;


		// if ( triggerReset === monthLabels.length ) {
		// 	currentMonth = 0;
		// }

		console.log( 'total months in a year: ' + monthLabels.length );
		console.log( 'how many months away from next year: ' + ( monthsAwayUntilNextYear ) );
		console.log( 'so far how many months we consumed: ' + currentMonth );
		// console.log( temp );

		tableBody.innerHTML = null; // empty the table
		// calDate = new Date(2016, 0);
		createCalendar();
		
		console.log(calDate);
		
	}

};



// initialize the calendar
window.addEventListener('load', function() {
	createCalendar();

	// calendar navigation
	var calNav = doc.getElementById('cal-navigation'),
		prevNav = doc.getElementById('prev-nav'),
		nextNav = doc.getElementById('next-nav');

	calNav.addEventListener('click', function(e) {
		calNavLink = e.target.id;

		tableBody.innerHTML = null; // empty the table

		if ( calNavLink === 'next-nav' ) {
			changeCalendar.showNextCalendar();
		} else {
			changeCalendar.showPreviousCalendar();
		}


	},false);
});










