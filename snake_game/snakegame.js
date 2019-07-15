/* JAVASCRIPT for the HTML assignment 5 */

var read = 19;
var id = null;
var mf = 200;
var canvas = document.querySelector(".canvas");
var snake = document.querySelector(".snake");
var posx = 0;
var posy = 0;
var size = 25;
var direction = null;
var score = 0;
var key = 39;

function randomize()
  {
      const read = 19;
      var x = Math.floor(Math.random() * read);
      x *= 25;
      var y = Math.floor(Math.random() * read);
      y *= 25;
      var food = document.getElementById("food");
      food.style.left = x + "px";
      food.style.top = y + "px";
  }

function moveSnake()
{
    if(posx > 475 || posx < 0 || posy < 0 || posy > 475)
    {
      clearInterval(id);
      alert("Game Over, Score: " + score);
      return;
    }
  canvas = document.querySelector(".canvas");
  var food = document.getElementById("food");
  var food_left = parseInt(food.style.left);
  var food_top = parseInt(food.style.top);
  if(direction == 'right')
  {
    posx += size;
  }
  else if(direction == 'left')
  {
    posx -= size;
  }
  else if(direction == 'top')
  {
    posy -= size;
  }
  else if(direction == 'down')
  {
    posy += size;
  }
  // console.log(food_left, food_top);
  console.log(posx, posy);
  var childNodes = canvas.querySelectorAll('.snake');
  if(posx == food_left && posy == food_top)
  {
    score += 1;
    scorer();
    randomize();
  }
  else
  {
    var firstElem = canvas.querySelector(".snake");
    var lastElem = childNodes[childNodes.length-1];
    lastElem.remove();
    //childNodes = canvas.querySelectorAll('.snake');
  }
  var newElem = document.createElement('div');
  newElem.setAttribute('class', 'snake');
  if(childNodes.length == 1)
  {
    canvas.insertAdjacentElement("afterbegin", newElem);
  }
  else
  {
    canvas.insertBefore(newElem, childNodes[0]);
  }
  newElem.style.left = posx + "px";
  newElem.style.top = posy + "px";
  //firstElem = canvas.querySelector('.snake');
  //childNodes[0].style.backgroundColor = 'green';
  // clearInterval(id);
  collision();
}

function getDirection(event)
{
  if(event.keyCode == 13 || event.keyCode == 39 && (key!=37))
  {
    key=39;
    return "right";
  }
  else if(event.keyCode == 40 && key!=38)
  {
    key=40;
    return "down";
  }
  else if(event.keyCode == 37 && key!=39)
  {
    key=37;
    return "left";
  }
  else if(event.keyCode == 38 && key!=40)
  {
    key=38;
    return "top";
  }
  return direction;
}

function whichButton(event)
{
  event.preventDefault();
  direction = getDirection(event);
  if(!id)
  {
    id = setInterval(moveSnake, 200);
  }
}
function scorer()
{
  document.getElementById("score").innerHTML = "Score is "+score;
}
randomize();

function collision()
{
  var childNodes = canvas.querySelectorAll('.snake');
  var firstElem = canvas.querySelector(".snake");
  for (var i = 1; i < childNodes.length; i++)
  {
    if (firstElem.style.top == childNodes[i].style.top && firstElem.style.left == childNodes[i].style.left)
    {
      clearInterval(id);
      alert("Game Over, Score: " + score);
      return;
    }
  }
}
