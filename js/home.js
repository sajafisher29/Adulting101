'use strict';

//Global variables
var userName='';
var currentUser = localStorage.Current;
console.log(localStorage.Current);

//User login and interaction with local storage
var displayName = document.getElementById('userNameTitle');
displayName.textContent = `${currentUser}'s Adulting 101 Adventure`;

/**
 * this renders one card and returns the index for that card
 *
 */
function renderCard(aCardTopicIndex) {
  //locate container div document.getElementById CardDeck
  //use helper funct. add element to build out HTML with

  var card = CardTopic.list[aCardTopicIndex];

  var flipContainer = addElement(undefined, 'div', undefined, 'flip-container');
  console.log(flipContainer);

  flipContainer.onclick = function () {
    console.log('I was clicked');
    this.classList.toggle('flipped');
  };

  // TODO add ontouchstart and add dynamically changing flipCard number
  var flipCard = addElement(flipContainer, 'div', undefined, 'flip-card-0');

  var front = addElement(flipCard, 'div', undefined, 'front');
  addElement(front, 'h2', card.topicName);
  addElement(addElement(front, 'p'), 'i', undefined, card.topicIcon).style = 'color:white; font-size: 200px';
  console.log(front);
  addElement(front, 'i', undefined, 'card-0');

  var back = addElement(flipCard, 'div', undefined, 'back');
  var waterMark = addElement(back, 'i', undefined, card.topicIcon).style = 'color:lightgray; font-size: 300px';

  addElement(back, 'h3', card.topicName);

  // For loop creating each of the rows on the back side of the card from the skill list (card.topicSkillList)

  var taskList = addElement(back, 'ul');
  for (var i = 0; i < card.topicSkillList.length; i++) {

    var skill = card.topicSkillList[i];
    var li = addElement(taskList, 'li');
    // var label = addElement(li, 'label');

    var checkBox = addElement(li, 'input');
    checkBox.type = 'checkbox';
    checkBox.id = `${card.cardTopicIndex}.${i}`;
    checkBox.checked = skill.completed;
    checkBox.addEventListener('change', handleSkillChange);

    var a = addElement(li, 'a', skill.skillName);
    a.href = skill.link;
    a.target = '_blank';
  }
  return flipContainer;
}

function handleSkillChange(event) {
  var id = event.target.id;
  var fullSkillId = id.split('.');
  CardTopic.updateSkill(fullSkillId[0], fullSkillId[1], event.target.checked);
  console.log('handleskillchange', fullSkillId, event.target.checked);
}

function renderDeck() {
  var container = document.getElementById('CardDeck');

  for (var i = 0; i < CardTopic.list.length; i++) {
    container.appendChild(renderCard(i));
  }
}


//Global variables
renderDeck();