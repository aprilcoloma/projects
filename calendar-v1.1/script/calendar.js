var doc             = document,
    calDate         = new Date(),
    calCounter      = 0, 

    currentMonth, firstDate, year, firstDayOfMonth, firstDay, dayIndex, totalDays, calNavLink, eventList, eventDate, events, calendarDate, eventListItem, 
    eventListDateStart, eventListDateEnd, td, count, today, dd, mm, yyyy, c, yr, mt, dy, newConvertedDate,

    monthLabels     = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayName         = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dateToday       = doc.getElementById('date-today'),
    eventWrapper    = doc.getElementById('event-wrapper'),
    tableBody       = doc.getElementById('tbl-body'),
    calendarHeader  = doc.getElementById( 'month-year' );


var createCalendar = function() {
    currentMonth     = calDate.getMonth() + calCounter; // 0 - 11 (5)
    year             = calDate.getFullYear(); // 2015

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
    var i = 0;
    for (i; i < 6; i++) {

        var tr = doc.createElement('tr');

        // create cells for the days
        var j = 0;
        for (j; j < 7; j++) { 
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

                // loop our events
                var k = 0;
                for (; k < eventList.length; k++ ) {
                    eventListItem = eventList[k];
                    eventListDateStart = eventList[k].dateStart;
                    eventListDateEnd = eventList[k].dateEnd;

                    if ( eventListDateEnd) {
                        eventListDateEnd = eventListDateEnd;
                    } else {
                        eventListDateEnd = "";
                    }

                    var strippedDateStart = dateTools.dateStripper(eventListDateStart),
                        strippedDateEnd = dateTools.dateStripper(eventListDateEnd),
                        strippedTime = dateTools.timeStripper(eventListDateStart),
                        eventFullYear = new Date(strippedDateStart).getFullYear(),
                        eventDay = new Date(strippedDateStart).getDate(),
                        eventMonth = monthLabels[new Date(strippedDateStart).getMonth()],
                        eventDayEnd = new Date(strippedDateEnd).getDate();

                    // console.log( 'event month and year detected: ' + ( new Date(strippedDateStart).getMonth() + 1 ) + " " + eventFullYear );

                    var monthStringify = (currentMonth + 1) + "";

                    if ( monthStringify.length < 2 ) {
                        monthStringify = "0" + monthStringify;
                    }

                    var calendarDate = year + "-" + monthStringify + "-" + count,
                        eventRange = eventDayEnd - eventDay,
                        calendarMonth = new Date(strippedDateStart).getMonth() + 1;

                    var count2;

                    if ( (count + "").length < 2 ) {
                        count2 = "0" + count;
                    }

                    var eventCounter = doc.createElement('span');
                    eventCounter.classList.add( 'event' );

                    var eventCalendarMonth = new Date(strippedDateStart).getMonth() + 1;

                    if ( eventCalendarMonth === ( currentMonth + 1 ) && eventFullYear === year && eventDay === count || count > eventDay && count <= eventDayEnd && eventCalendarMonth === ( currentMonth + 1 ) && eventFullYear === year ) {
                        
                        td.classList.add('with-event');

                        td.setAttribute('date-start', strippedDateStart);

                        if ( eventListDateEnd) {
                            td.setAttribute('date-end', strippedDateEnd);
                            td.setAttribute('day-range', eventRange);
                            
                        } else {
                            eventListDateEnd = "";
                        }

                        if ( td.className === 'with-event' ) {

                            td.click( eventRevealer() );
                            var eventIndicator = doc.createElement('span');

                            eventIndicator.classList.add('event-indicator');
                            td.insertBefore( eventIndicator, dateWrapper.nextSibling );

                            // if 'with-event' class is present, and event day is today, display the events
                            var eventListWrapper = doc.createElement('ul'),
                                elementListItem = doc.createElement('li');

                            eventWrapper.innerHTML = null;

                            if ( strippedDateStart === yyyy + "-" + monthStringify + "-" + dd ) {
                                var descriptionWrapper = doc.createElement('p'),
                                    listDateWrapper = doc.createElement('p');

                                descriptionWrapper.innerHTML = eventList[k].description;
                                elementListItem.appendChild(descriptionWrapper);

                            } else {
                                eventWrapper.innerHTML = "No event today.";
                            }

                            eventListWrapper.appendChild(elementListItem);
                            eventWrapper.appendChild(eventListWrapper);

                        }
                    }

                }

                

                // add days
                count++;

                // mark today
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


var dateTools = {
    dateStripper: function(dt) {
        dt = dt.substring(0, 10);
        return dt;
    },
    timeStripper: function(t) {
        t = t.substring(11);
        return t;
    },
    dayStripper: function(dy) {
        dy = dy.substring(5,7);
        return dy;
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


var eventRevealer = function() {

    td.addEventListener('click', function(e) {
        var getDateStart = e.currentTarget.getAttribute('date-start'),
            getDateEnd = e.currentTarget.getAttribute('date-end');

        // get data from our event list
        var eventItem;
        for (eventItem = 0; eventItem < eventList.length; eventItem++) {
            var dateStart = dateTools.dateStripper(eventList[eventItem].dateStart);

            if ( dateStart === getDateStart ) {
                console.log( eventList[eventItem].title );
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
