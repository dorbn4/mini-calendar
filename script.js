window.onload = () => {
  createCalHeatMap(data, 'calHeatMapDiv', 2021, 6);
};


// sample data
const data = [
  {day: 1, value: 2},
  {day: 2, value: 55},
  {day: 3, value: 0},
  {day: 4, value: 15},
  {day: 5, value: 15},
  {day: 6, value: 25},
  {day: 7, value: 45},
  {day: 8, value: 51},
  {day: 9, value: 50},
  {day: 10, value: 15},
  {day: 11, value: 2},
  {day: 12, value: 55},
  {day: 13, value: 0},
  {day: 14, value: 15},
  {day: 15, value: 15},
  {day: 16, value: 25},
  {day: 17, value: 45},
  {day: 18, value: 51},
  {day: 19, value: 50},
  {day: 20, value: 15},
  {day: 21, value: 2},
  {day: 22, value: 55},
  {day: 23, value: 0},
  {day: 24, value: 15},
  {day: 25, value: 15},
  {day: 26, value: 25},
  {day: 27, value: 45},
  {day: 28, value: 51},
  {day: 29, value: 50},
  {day: 30, value: 15},
  {day: 31, value: 2},
  {day: 32, value: 55},
  {day: 33, value: 0},
  {day: 34, value: 15},
  {day: 35, value: 15},
  {day: 36, value: 25},
  {day: 37, value: -5},
  {day: 38, value: 51},
  {day: 39, value: 50},
  {day: 40, value: 15},
  {day: 41, value: 2},
  {day: 42, value: 55},
  {day: 43, value: 0},
  {day: 44, value: 15},
  {day: 45, value: 15},
  {day: 46, value: 25},
  {day: 47, value: 45},
  {day: 48, value: 51},
  {day: 49, value: 50},
  {day: 50, value: 15}, 
  {day: 51, value: 2},
  {day: 52, value: 55},
  {day: 53, value: -10},
  {day: 54, value: 15},
  {day: 55, value: 15},
  {day: 56, value: 25},
  {day: 57, value: 45},
  {day: 58, value: 51},
  {day: 59, value: 50},
  {day: 60, value: 15},
  {day: 61, value: 2},
  {day: 62, value: 55},
  {day: 63, value: 0},
  {day: 64, value: 15},
  {day: 65, value: 15},
  {day: 66, value: 25},
  {day: 67, value: 45},
  {day: 68, value: 51},
  {day: 69, value: 58},
  {day: 70, value: 15}, 
  {day: 71, value: 2},
  {day: 72, value: 55},
  {day: 73, value: -50},
  {day: 74, value: 15},
  {day: 75, value: 15},
  {day: 76, value: 25},
  {day: 77, value: 45},
  {day: 78, value: 51},
  {day: 79, value: 50},
  {day: 80, value: -15},
  {day: 81, value: 2},
  {day: 82, value: 55},
  {day: 83, value: 0},
  {day: 84, value: 15},
  {day: 85, value: 15},
  {day: 86, value: 25},
  {day: 87, value: 45},
  {day: 88, value: 51},
  {day: 89, value: 43},
  {day: 90, value: 15},
];


function createCalHeatMap(data, elemId, year, weekStart = 0) {
  const target = document.getElementById(elemId);
        target.className = 'heatMapDiv';

  const firstDay = new Date(year, 0, 1).getDay();

  console.log('  firstDay', firstDay);


  let week;
  if (weekStart === 0) {
    week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  } else if (weekStart === 1) {     
    week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  } else {
    week = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];
  }


  let added = 0;
  if (weekStart === 1) {
    added = -1;


  } else if (weekStart === 6) {
    added = 1;
  }


  const skipDays = firstDay + added;


  const daysInYear = getDaysInYear(year); 
  const obj = monthStartDay(year); // days per month

  
  // create table
  const table = document.createElement('table');
  const tbody = table.createTBody();
  const getKeyByValue = (obj, value) => Object.keys(obj).find(key => Math.floor(obj[key][0] / 7) === value);


  // add header
  const header = tbody.insertRow();
        header.classList.add('header');
        header.insertCell();

  for (let i = 0; i < 53; i++) {
    const x = getKeyByValue(obj, i);
    const span = document.createElement('span');
          span.textContent = (x === undefined) ? '' : x;
          span.setAttribute('month', x);
          span.addEventListener('mouseenter', showOutline);
          span.addEventListener('mouseleave', hideOutline);

    const headerCell = header.insertCell();
          if (x !== undefined) headerCell.appendChild(span);
  }

  
  let yearDay = 0;

  // add rows
  for (let weekDay = 0; weekDay < 7; weekDay++) {
    const row = tbody.insertRow();

    // axis
    let text;
    if (weekDay === 1) {
      text = week[1];
    } else if (weekDay === 3) {
      text = week[3];
    } else if (weekDay === 5) {
      text = week[5];
    } else {
      text = '';
    }
  
    const span = document.createElement('span');
          span.textContent = text;       
    const axis = document.createElement('div');
          axis.className = 'axis';
          axis.appendChild(span);
    const axisCell = row.insertCell();
          if (text !== '') axisCell.appendChild(axis);

              
    yearDay = weekDay + 1;      
       

    for (let weekOfYear = 0; weekOfYear < 53; weekOfYear++) {
      const div = document.createElement('div');
            div.className = 'day'; 
      const cell = row.insertCell();
            cell.appendChild(div);

        
      // get correct day of year 
      const day = yearDay - skipDays;
      if (weekOfYear === 0 && weekDay < skipDays) {
        div.classList.add('empty');
      } else if (day > daysInYear) {
        div.classList.add('empty');
      } else {
        // div.textContent = day;
        div.setAttribute('day', day);
      }
      
      yearDay = yearDay + 7;
    }
  }

  target.appendChild(table);


  // add months
  for (let i = 0; i < daysInYear; i++) {

    // get month
    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let month = 0;
    let found = false;
    while(found === false && month < months.length) {
      if (i >= obj[months[month]][0] && i < obj[months[month]][0] + obj[months[month]][1]) found = true;
      month++;
    }

    // set month
    table.querySelector(`td div[day="${i+1}"]`).setAttribute('month', months[month]);
  }


  // get min, max
  const max = data.reduce((acc, val) => acc > val.value ? acc : val.value);
  const min = data.reduce((acc, val) => acc < val.value ? acc : val.value);

  const posStep = Math.ceil(max / 3);
  const negStep = Math.abs(Math.ceil(min / 3));


  // fill data
  data.forEach(e => { 
    let color = '238, 238, 238';
    let y = 3;
    if (e.value > 0) {
      // pos
      y = e.value / posStep;
      color = '32, 164, 100';

    } else if (e.value < 0) {
      // neg
      y = Math.abs(e.value / negStep);
      color = '221, 80, 68';

    } 

    let opacity = 1;
    if (y < 1) {
      opacity = 0.33;
    } else if (y < 2) {
      opacity = 0.66;
    } 

    
    table.querySelector(`td div[day="${e.day}"]`).style.background = `rgba(${color}, ${opacity})`;
    table.querySelector(`td div[day="${e.day}"]`).setAttribute('title', name + ' ' + e.value);
  });


  // add footer
  const legendDiv = document.createElement('div');
        legendDiv.classList.add('legendDiv');
        table.after(legendDiv);

  const legend = document.createElement('div');
        legend.className = 'legend';
        
    const less = document.createElement('span');
          less.textContent = 'Less';

    const neg3 = document.createElement('div');
          neg3.style.background = `rgba(221, 80, 68, 1)`;

    const neg2 = document.createElement('div');
          neg2.style.background = `rgba(221, 80, 68, 0.66)`;

    const neg1 = document.createElement('div');
          neg1.style.background = `rgba(221, 80, 68, 0.33)`;

    const even = document.createElement('div');
          even.style.background = `rgba(238, 238, 238, 1)`;
          
    const pos1 = document.createElement('div');
          pos1.style.background = `rgba(32, 164, 100, 0.33)`;
    
    const pos2 = document.createElement('div');
          pos2.style.background = `rgba(32, 164, 100, 0.66)`;
    
    const pos3 = document.createElement('div');
          pos3.style.background = `rgba(32, 164, 100, 1)`;
                
    const more = document.createElement('span');
          more.textContent = 'More';


    legend.appendChild(less);
    legend.appendChild(neg3);
    legend.appendChild(neg2);
    legend.appendChild(neg1);
    legend.appendChild(even);
    legend.appendChild(pos1);
    legend.appendChild(pos2);
    legend.appendChild(pos3);
    legend.appendChild(more);
    
  legendDiv.appendChild(legend);
}


function showOutline() {
  document.querySelectorAll(`.heatMapDiv table tbody tr td div[month="${this.getAttribute('month')}"]`).forEach(e => {
    e.classList.add('highlight');
  });
}


function hideOutline() {
  document.querySelectorAll(`.heatMapDiv table tbody tr td div`).forEach(e => {
    e.classList.remove('highlight');
  });
}


function getDaysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}


function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}


function monthStartDay(year) {
  const days = (month, year) => new Date(year, month, 0).getDate(); 
  const jan = days(1, year);
  const feb = days(2, year);
  const mar = days(3, year);
  const apr = days(4, year);
  const may = days(5, year);
  const jun = days(6, year);
  const jul = days(7, year);
  const aug = days(8, year);
  const sep = days(9, year);
  const oct = days(10, year);
  const nov = days(11, year);
  const dec = days(12, year);
  
  return {
    jan: [0, jan],
    feb: [jan, feb], 
    mar: [jan + feb, mar],
    apr: [jan + feb + mar, apr],
    may: [jan + feb + mar + apr, may],
    jun: [jan + feb + mar + apr + may, jun],
    jul: [jan + feb + mar + apr + may + jun, jul],
    aug: [jan + feb + mar + apr + may + jun + jul, aug],
    sep: [jan + feb + mar + apr + may + jun + jul + aug, sep],
    oct: [jan + feb + mar + apr + may + jun + jul + aug + sep, oct], 
    nov: [jan + feb + mar + apr + may + jun + jul + aug + sep + oct, nov], 
    dec: [jan + feb + mar + apr + may + jun + jul + aug + sep + oct + nov, dec]
  };
} 