'use strict';

//Global variables
// var currentUser = localStorage.Current;

/**
 * this renders one card and returns the index for that card
 *
 */
function renderCard(aCardTopicIndex) {
  //locate container div document.getElementById CardDeck
  //use helper funct. add element to build out HTML with

  var card = CardTopic.list[aCardTopicIndex];

  var cardContainer = addElement(undefined, 'div', undefined, 'card-container');
  console.log(cardContainer);

  var front = addElement(cardContainer, 'div', undefined, 'front');
  // TODO Add card.topicIcon to background as watermark.

  addElement(front, 'h2', card.topicName);
  console.log(front);

  var trophyNum = card.cardSkillsComplete();
  var trophyIconSize;
  if (trophyNum === 1) {
    trophyIconSize = '2x';
  } else if (trophyNum === 2) {
    trophyIconSize = '3x';
  } else if (trophyNum >= 3) {
    trophyIconSize = '5x';
  }

  if (trophyNum) {
    var trophyIcon = `fa fa-trophy fa-${trophyIconSize}`;
    addElement(addElement(front, 'p'), 'i', undefined, trophyIcon).style = 'color:teal';
  } else {
    addElement(front, 'h2', `Yo, yo, yo, yo, baby-${currentUser}, yeah, you come here, gimme a wish, better adult fast so your life gonna get rich!`).style = 'font-size:35px;padding:0 50px';
  }

  for (var i = 0; i < trophyNum; i++) {
    addElement(front, 'i', undefined, 'fa fa-star fa-3x').style = 'color:#d79133';
  }

  var msg1;
  var msg2;
  if (trophyNum === 1) {
    msg1 = 'Oooh, baby, baby!';
    msg2 = '1 down, 2 to go!  Get up on this!';
  } else if (trophyNum === 2) {
    msg1 = 'You really got it going!';
    msg2 = `Just one more skill to master ${card.topicName}!`;
  } else if (trophyNum >= 3) {
    msg1 = `${currentUser}, way to push it!`; // TODO
    msg2 = `You earned a trophy for your killer ${card.topicName} skills!`;
  }
  addElement(front, 'h2', msg1);
  addElement(front, 'p', msg2);

  addElement(front, 'i', undefined, 'card-0');
  return cardContainer;
}

function renderTrophyDeck() {
  var container = document.getElementById('CardDeck');
  console.log(container);

  for (var i = 0; i < CardTopic.count(); i++) {
    container.appendChild(renderCard(i));
  }
}

function populatecurrentUserSpans() {
  var elements = document.getElementsByClassName('currentUser');
  console.log('populate names...');
  console.log(elements.length);
  for (var i = 0; i < elements.length; i++) {
    elements[i].textContent = currentUser;
    console.log(elements[i]);
  }
}

/**
 * Function to divide the total skills completed by
 * the total amount of topics to complete in order to generate the data
 * for our status bar
 *
 * @returns percent complete across all topics
 */
function createStatusBarData() {
  var result = (CardTopic.totalSkillsComplete() / CardTopic.skillCount());
  result = Math.round(result * 100);
  return result;
}

function renderStatusChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  Chart.defaults.global.legend.display = false;
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
      labels: [],
      datasets: [{
        label: '',
        backgroundColor: 'rgb(0,179,179)',
        data: [createStatusBarData()]
      }]
    },

    // Configuration options go here
    options: {
      tooltips: { enabled: false },
      hover: {mode: null},
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 20,
            fontStyle: 'bold',
            fontFamily: '\'Varela Round\', sans-serif',
            fontColor: '#111',
            min: 0,
            max: 100, // Your absolute max value
            callback: function (value) {
              return ((value / 100) * 100).toFixed(0) + '%'; // convert it to percentage
            },
          },
        }, ],
      },
    }
  });
}

function renderStatTitle() {
  var statTitle = document.getElementById('StatTitle');
  while (statTitle.firstChild) {
    statTitle.removeChild(statTitle.firstChild);
  }
  var statTitle = addElement(statTitle, 'h2', `${currentUser}'s Adulting Status: ${createStatusBarData()}%`);
}

//Global variables
document.getElementById('headerUserName').textContent = `Adulting 101 - ${currentUser}'s Trophies!`;
populatecurrentUserSpans();
renderTrophyDeck();
renderStatTitle();
renderStatusChart();
