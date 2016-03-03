window.onload = function() {

var setUp = function(){
  enemyHp.innerText = "HP " + enemy.Hp;
  playerHp.innerText = "HP " + player.Hp;
  combatLog.innerText = "An Enemy has appeared! Choose an action!"
  console.log("setup complete");
}

setUp();
}

var enemyHp = document.querySelector('#enemyHp');
var playerHp = document.querySelector('#playerHp');
var combatLog = document.querySelector('.combatLog');
var spellButton = document.querySelector('.fireball');
var attackButton = document.querySelector('.attack');
var healButton = document.querySelector('.heal');
var defendButton = document.querySelector('.defend');
var slowButton = document.querySelector('.slow');
var attackUpButton = document.querySelector('.attackUp');


// // document.querySelector('.battleWrap').addEventListener("click", function(e) {
// //   if(e.target && e.target.nodeName == "BUTTON") {
// //     if(attackButton){
// //       console.log("t");
// //     }
// //     else{
// //       console.log("u");
// //     }
//
//
// 	// }
//
// });


var player = {
  Hp: 100,
  Atk: 20,
  Def: 12,
  Speed: 11,
  Mana: 70,
  First: undefined,
};
var enemy = {
  Hp: 120,
  Atk: 18,
  Def: 15,
  Speed: 9,
  Mana: 50,
  First: undefined,
};
var playerAtkAfter;
var timer;
function slowEnemyAttack() {
  timer = window.setTimeout(enemyMove, 2000);
}
var slowPlayerAttack = function(){
  timer = window.setTimeout(playerAtk, 2000);
}


var prority = function(){
  if(player.Speed > enemy.Speed){
    player.First = true;
    enemy.First = false;
  }
  else{
    enemy.First = true;
    player.First = false;
  }
}
if(player.First){
    slowEnemyAttack();
}else{

}


var lastMove = undefined;
var random = function(){
  return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}
var enemyMove = function(){

  random()
  if(lastMove === "enemyPrepare"){
    enemyHardHit();
    lastMove = "HardHit"
  }
    else if(random() >= 5){
    enemyAtk();
    lastMove = "enemyAtk"
    console.log("Atk");
    }
    else if(random() == 4) {
      enemyDefUp();
      lastMove = "enemyDefUp"
      console.log("Def up");
    }
    else if(random() == 3) {
      enemyFireball();
      lastMove = "enemyFireball"
      console.log("fireball");
    }
    else if(random() == 2) {
       enemyPrepare();
       lastMove = "enemyPrepare"
    }
    else if(random() == 1) {
      combatLog.innerText = "Enemy is waiting"
      lastMove = "waiting"
    }
  HpCheck();
  console.log("end");
}

var cleanUp = function(){
  combatLog.innerText = " "
}
var HpCheck = function(){
  if(player.Hp <= 0){
    combatLog.innerText = "\n \n You have died..."
    playerHp.innerText = 0
    console.log("you died")
  }
  if(enemy.Hp <= 0){
    combatLog.innerText = "\n \n You won!"
    enemyHp.innerText = 0
  }
}


var enemyAtk = function(){
  player.Hp = player.Hp - (enemy.Atk - player.Def);
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = " Enemy Attacks for " + (enemy.Atk - player.Def) + " damage!"
  console.log(lastMove);
}
var playerAtk = function(){
  enemy.Hp = enemy.Hp - (player.Atk - enemy.Def);
  enemyHp.innerText = "Hp " + enemy.Hp;
  combatLog.innerText += "\n You Attack for " + (player.Atk - enemy.Def) + " damage!"
}
var playerDefend = function(){
  player.Def = player.Def + 3;
  combatLog.innerText = "Enemy Def rose by 3!"
  console.log(lastMove);
}

var enemyDefUp = function(){
  enemy.Def = enemy.Def + 3;
  combatLog.innerText = "Enemy Def rose by 3!"
  console.log(lastMove);
}
var enemyFireball = function(){
  enemy.Mana = enemy.Mana - 15;
  player.Hp = player.Hp - enemy.Atk;
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy cast Fireball! " + enemy.Atk + " damage!"
  console.log(lastMove);
}
var playerFireball = function(){
  player.Mana = player.Mana - 15;
  enemy.Hp = enemy.Hp - player.Atk;
  enemyHp.innerText = "Hp " + enemy.Hp;
  combatLog.innerText = "\n Player cast Fireball! " + player.Atk + " damage!"
}
var enemyPrepare = function(){
  combatLog.innerText = "Enemy is preparing an attack!"
  console.log(lastMove);
}
var enemyHardHit = function(){
  player.Hp = player.Hp - enemy.Atk * 3;
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy deals a crushing blow for " + enemy.Atk * 3 + " damage!"
  lastMove = "enemyHardHit"
  console.log(lastMove);
}
var heal = function(){
  player.Hp = player.Hp + 20;
  combatLog.innerText = "\n You recover 20Hp!"
  if(player.Hp > 100){
    player.Hp = 100;
  }
  playerHp.innerText = "Hp " + player.Hp;
}


attackButton.addEventListener('click', function(){
  cleanUp();
  prority();
  slowEnemyAttack();
  playerAtk();
  HpCheck();
});
healButton.addEventListener('click', function(){
  cleanUp();
  prority();
  slowEnemyAttack();
  heal();
  HpCheck();

});
spellButton.addEventListener('click', function(){
  cleanUp();
  slowEnemyAttack();
  playerFireball();
  HpCheck();
});


// damages bad guy and updates hp
// var test = function(){
//   enemy.Hp = enemy.Hp - 10;
//   enemyHp.innerText = "HP " + enemy.Hp;
//
// }
















// leave
