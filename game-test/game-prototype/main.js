window.onload = function() {

var setUp = function(){
  enemyHp.innerText = "HP " + enemy.Hp;
  playerHp.innerText = "HP " + player.Hp;
  playerMana.innerText = "HP " + player.Mana;
  enemyMana.innerText = "HP " + enemy.Mana;
  combatLog.innerText = "An Enemy has appeared! \n Choose an action!"
  console.log("setup complete");
}

setUp();
}

var enemyHp = document.querySelector('#enemyHp');
var playerHp = document.querySelector('#playerHp');
var playerMana = document.querySelector('#playerMana');
var enemyMana = document.querySelector('#enemyMana');
var combatLog = document.querySelector('.combatLog');
var spellButton = document.querySelector('.fireball');
var attackButton = document.querySelector('.attack');
var healButton = document.querySelector('.heal');
var protectButton = document.querySelector('.protect');
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
// var highDef = function(){
//   if(enemyMove < 0){
//
//
//   }
// }


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


var enemyLastMove = undefined;
var playerLastMove = undefined;

var random = function(){
  return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

var enemyMove = function(){

  if(enemyLastMove === "enemyPrepare"){
    enemyHardHit();
    enemyLastMove = "HardHit"
  }
    else if(random() >= 5){
    enemyAtk();
    enemyLastMove = "enemyAtk"
    console.log("Atk");
    }
    else if(random() == 4) {
      enemyDefUp();
      enemyLastMove = "enemyDefUp"
      console.log("Def up");
    }
    else if(random() == 3) {
      enemyFireball();
      enemyLastMove = "enemyFireball"
      console.log("fireball");
    }
    else if(random() == 2) {
       enemyPrepare();
       enemyLastMove = "enemyPrepare"
    }
    else if(random() == 1) {
      combatLog.innerText = "Enemy is waiting"
      enemyLastMove = "waiting"
    }
  HpCheck();
  console.log(player.Def);
}

var cleanUp = function(){
  combatLog.innerText = " "
}
var protectCheck = function(){
  if(playerLastMove == "playerProtect"){
    player.Def = player.Def - 100;
  }
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
  if(player.Hp > 100){
    player.Hp = 100;
  }
  if(enemy.Hp > 120){
    enemy.Hp = 120;
  }
  enemy.innerText = "Hp " + enemy.Hp;
  playerHp.innerText = "Hp " + player.Hp;
}


var enemyAtk = function(){
  player.Hp = player.Hp - (enemy.Atk - player.Def);
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = " Enemy Attacks for " + (enemy.Atk - player.Def) + " damage!"
  console.log(enemyLastMove);
}
var playerAtk = function(){
  enemy.Hp = enemy.Hp - (player.Atk - enemy.Def);
  enemyHp.innerText = "Hp " + enemy.Hp;
  combatLog.innerText += "\n You Attack for " + (player.Atk - enemy.Def) + " damage!"
  playerLastMove = "playerAtk";
}
var playerProtect = function(){
  if(player.Mana < 8){
    combatLog.innerText = "Not enough mana";
  }
  else {
  player.Mana = player.Mana - 8;
  player.Def = player.Def + 100;
  playerMana.innerText = "Mana " + player.Mana;
  combatLog.innerText += "player is protected!"
  playerLastMove = "playerProtect"
  console.log(player.Def);
  }

  console.log(enemyLastMove);
  console.log(player.Def);
}

var enemyDefUp = function(){
  enemy.Def = enemy.Def + 3;
  combatLog.innerText = "Enemy Def rose by 3!"

  console.log(enemyLastMove);
}
var playerAtkUp = function(){
  player.Atk = player.Atk + 3;
  combatLog.innerText = "Player Atk rose by 3!"
  playerLastMove = "playerAtkUp"
  console.log(enemyLastMove);
}
var enemyFireball = function(){
  if(enemy.Mana < 15){
    combatLog.innerText = "Enemy Fireball fizzled";
  }
  else {
  enemy.Mana = enemy.Mana - 15;
  player.Hp = player.Hp - enemy.Atk;
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy cast Fireball! " + enemy.Atk + " damage!"
  console.log(enemyLastMove);
  }
}
var playerFireball = function(){
  if(player.Mana < 15){
    combatLog.innerText = "Not enough mana";
  }
  else {
  player.Mana = player.Mana - 15;
  enemy.Hp = enemy.Hp - player.Atk;
  enemyHp.innerText = "Hp " + enemy.Hp;
  playerMana.innerText = "Mana " + player.Mana;
  combatLog.innerText += "\n Player cast Fireball! " + player.Atk + " damage!"
  playerLastMove = "playerFireball";
  }
}
var enemyPrepare = function(){
  combatLog.innerText = "Enemy is preparing an attack!"
  console.log(enemyLastMove);
}
var enemyHardHit = function(){
  player.Hp = player.Hp - (player.Def - (enemy.Atk * 3))
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy deals a crushing blow for " + (player.Def - (enemy.Atk * 3))  + " damage!"
  enemyLastMove = "enemyHardHit"
  console.log(enemyLastMove);
}
var playerHeal = function(){
  if(player.Mana < 7){
    combatLog.innerText = "Not enough mana";
  }
  else {
  player.Mana = player.Mana - 7;
  player.Hp = player.Hp + 20;
  playerMana.innerText = "Mana " + player.Mana;
  combatLog.innerText += "\n You recover 20Hp!"
  // if(player.Hp > 100){
  //   player.Hp = 100;
  // }
  // playerHp.innerText = "Hp " + player.Hp;
  playerLastMove = "playerHeal";
  }
}
var playerSlow = function(){
  enemy.Speed = enemy.Speed - 3;
  combatLog.innerText = "Enemy Speed lowered by 3!"
  playerLastMove = "playerSlow"
  console.log(enemyLastMove);
}

attackButton.addEventListener('click', function(){
  cleanUp();
  slowEnemyAttack();
  playerAtk();
  HpCheck();
});
protectButton.addEventListener('click', function(){
  cleanUp();
  slowEnemyAttack();
  playerProtect();
  HpCheck();
  protectCheck();
});
slowButton.addEventListener('click', function(){
  cleanUp();
  slowEnemyAttack();
  playerSlow();
  HpCheck();
});
healButton.addEventListener('click', function(){
  cleanUp();
  slowEnemyAttack();
  playerHeal();
  HpCheck();
});
spellButton.addEventListener('click', function(){
  cleanUp();
  slowEnemyAttack();
  playerFireball();
  HpCheck();
});
attackUpButton.addEventListener('click', function(){
  cleanUp();
  slowEnemyAttack();
  playerAtkUp();
  HpCheck();
});



// damages bad guy and updates hp
// var test = function(){
//   enemy.Hp = enemy.Hp - 10;
//   enemyHp.innerText = "HP " + enemy.Hp;
//
// }
















// leave
