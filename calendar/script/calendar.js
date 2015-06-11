
var doc              = document,
    calDate          = new Date(),
    calCounter       = 0,

    currentMonth, firstDate, year, firstDayOfMonth, firstDay, dayIndex, totalDays, calNavLink, eventList, eventDate, events, calendarDate, eventListItem, eventListDate,
    td, count, today, dd, mm, yyyy, c,

    monthLabels      = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 
                        'October', 'November', 'December'],

    dayName          = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dateToday        = doc.getElementById('date-today'),
    eventWrapper     = doc.getElementById('event-wrapper'),
    tableBody        = doc.getElementById('tbl-body'),
    calendarHeader   = doc.getElementById( 'month-year' );




var createCalendar = function() {
    currentMonth     = calDate.getMonth() + calCounter; // 0 - 11 (5)
    year             = calDate.getFullYear(); // 2015

    // change it back to january, jump to the next year
    if ( currentMonth > monthLabels.length-1 ) {
        currentMonth = 0;
        year++;
    }

    firstDate        = monthLabels[currentMonth] + " " + 1 + " " + year; // June 1 2015 
    firstDayOfMonth  = new Date(firstDate).toDateString(); // Mon Jun 01 2015,
    firstDay         = firstDayOfMonth.substring(0,3); // Mon
    dayIndex         = dayName.indexOf(firstDay); // 1 = Mon
    totalDays        = new Date(year, currentMonth+1, 0).getDate() + "";
    calNavLink       = '';

        
    // display the month and the year
    calendarHeader.innerHTML =  monthLabels[currentMonth] + " " + year;

    // days counter (to be compared against the total days)
    count = 1;

    // create rows for the weeks (approximately 6 rows)
    for (var i = 0; i < 6; i++) {

        var tr = doc.createElement('tr');

        // create cells for the days
        for (var j = 0; j < 7; j++) {
            td = doc.createElement('td');

            // if days are less than our total days and our rows are greater than zero, or cell is greater that our current day, 
            // (start displaying on the first day of the month, cells before the first day should be left blank)
            if ( count <= totalDays && (i > 0 || j >= dayIndex) ) {

                var dateWrapper = doc.createElement( 'span' );

                today = new Date();
                dd = today.getDate() + "";
                mm = today.getMonth();
                yyyy = today.getFullYear();

                dateWrapper.classList.add('day');
                dateWrapper.innerHTML = count;
                td.appendChild(dateWrapper);


                // loop our events first
                for (var k = 0; k < eventList.length; k++ ) {
                    eventListItem = eventList[k].events;
                    eventListDate = eventList[k].date;


                    calendarDate = monthLabels[currentMonth] + " " + ( count ) + ", "+ year;

                    var eventCounter = doc.createElement('span');

                    eventCounter.classList.add( 'event' );

                    // match the dates from our events with our calendar dates
                    if ( eventListDate === calendarDate ) {

                        var list = doc.createElement( 'ul');

                        for ( var eventItem = 0; eventItem < eventListItem.length; eventItem++ ) { 
                            eventCounter.innerHTML = eventListItem.length;

                            td.classList.add('with-event');


                            if ( td.className === 'with-event') {

                                if ( monthLabels[mm] + " " + dateWrapper.innerHTML + ", " + yyyy === monthLabels[mm] + " " + dd + ", " + yyyy ) {

                                    eventWrapper.innerHTML = null;
                             
                                    var listItem = doc.createElement( 'li'),
                                        descriptionWrapper = doc.createElement('p'),
                                        dateWrapper1 = doc.createElement('p');

                                    descriptionWrapper.innerHTML = eventListItem[eventItem].description;
                                    dateWrapper1.innerHTML = eventListItem[eventItem].calTime;
                                    dateWrapper1.classList.add( 'time-wrapper' );

                                    listItem.appendChild( descriptionWrapper );
                                    listItem.insertBefore( dateWrapper1, descriptionWrapper.nextSibling );

                                   
                                    list.appendChild( listItem );
                                    eventWrapper.appendChild( list );


                                } else {
                                    eventRevealer();
                                }
                            }

                        }

                        td.insertBefore( eventCounter, dateWrapper.nextSibling );

                    }

                }

                count++;


                if ( dateWrapper.innerHTML === dd && mm === currentMonth && yyyy === year ) {
                    td.classList.add('today');
                }


                // Calendar Events
                dateToday.innerHTML = dayName[today.getDay()] + ", " + monthLabels[mm] + " " + dd;



            } else {
                td.innerHTML = '&nbsp';
                td.classList.add('empty-cell');
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
        currentMonth--;

        if ( currentMonth < 0 ) {
            currentMonth = monthLabels.length-1;
            this.setToPreviousCalendar();
        } else {
            createCalendar(); // create contents again  
        }

        
    },

    resetCalendar: function() {

        // add a year to our current year
        calDate = new Date(year+1, 0);

        // reset our calendar counter
        calCounter = 0;

        tableBody.innerHTML = null; // empty the table
        createCalendar();
    },

    setToPreviousCalendar: function() {

        // substract a year from our current year, and set the month to december
        calDate = new Date(year-1, 11);

        // reset our calendar counter
        calCounter = 0;
        tableBody.innerHTML = null; // empty the table
        createCalendar();
    }

};


var listEvents = function() {

};

var eventRevealer = function() {

    var newDateToMatch = dateToday.innerHTML = monthLabels[mm] + " " + c + ", " + yyyy;


    td.addEventListener( 'click', function(e) {
        var eventDay = parseInt(e.currentTarget.innerHTML.substring(18, 20)),
            eventCompleteDate = monthLabels[currentMonth] + " " + eventDay + ", " + yyyy;

        for (var m = 0; m < eventList.length; m++ ) {

            var eventDateToMatch = eventList[m].date;

            if ( eventDateToMatch === eventCompleteDate ) {

                eventWrapper.innerHTML = null;

                var eventUL = doc.createElement( 'ul' ),
                    eventULItem;

                for ( var o = 0; o < eventList[m].events.length; o++ ) {
                    eventULItem = doc.createElement('li');

                    var titleWrapper = doc.createElement('p'),
                        descWrapper = doc.createElement('p'),
                        timeWrapper = doc.createElement('p');

                    timeWrapper.classList.add( 'time-wrapper' );
                    descWrapper.innerHTML = eventList[m].events[o].description;
                    timeWrapper.innerHTML = eventList[m].events[o].calTime;

                    eventULItem.appendChild( descWrapper );
                    eventULItem.appendChild( timeWrapper, descWrapper.nextSibling );
    
                    eventUL.appendChild( eventULItem );

                }

                eventWrapper.appendChild( eventUL );

            }


        }
    });

};




// initialize the calendar
window.addEventListener('load', function() {

    // display the current month
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


    }, false);

});










