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
    enemyLastMove = "HardHit";
  }
    else if(random() >= 5){
    enemyAtk();
    enemyLastMove = "enemyAtk";
    console.log("Atk");
    }
    else if(random() == 4) {
      enemyDefUp();
      enemyLastMove = "enemyDefUp";
      console.log("Def up");
    }
    else if(random() == 3) {
      enemyFireball();
      enemyLastMove = "enemyFireball";
      console.log("fireball");
    }
    else if(random() == 2) {
       enemyPrepare();
       enemyLastMove = "enemyPrepare";
    }
    else if(random() == 1) {
      combatLog.innerText = "Enemy is waiting";
      enemyLastMove = "waiting";
    }
    else{
    enemyAtk();
    enemyLastMove = "enemyAtk";
    console.log("Atk");
    }

  HpCheck();
  console.log("enemy moved");
}

var cleanUp = function(){
  combatLog.innerText = " ";
}
var checkProtect = function(){
  if(playerLastMove == "playerProtect"){
    player.Def = player.Def - 100;
    console.log(player.Def);
  }
}
var protectCheck = function(){
  timer = window.setTimeout(checkProtect, 2100);
}

var HpCheck = function(){
  if(player.Hp <= 0){
    combatLog.innerText = "\n \n You have died...";
    playerHp.innerText = 0;
    console.log("you died");
  }
  if(enemy.Hp <= 0){
    combatLog.innerText = "\n \n You won!";
    enemyHp.innerText = 0;
  }
  if(player.Hp > 100){
    player.Hp = 100;
    playerHp.innerText = "Hp " + player.Hp;
  }
  if(enemy.Hp > 120){
    enemy.Hp = 120;
    enemyHp.innerText = "Hp " + enemy.Hp;
  }
  if(enemy.Hp <= 60){
    enemy.attack = enemy.attack + 5;
    enemy.Mana = enemy.Mana + 15;
    enemy.Speed = enemy.Speed + 5;
    combatLog.innerText += " Enemy is enraged!";
  }
}
var negativeCheck = function(e){
  if(e < 0){
    e = 1;
  }
  return e;
}

var enemyAtk = function(){
  if(playerLastMove == "playerProtect"){
    playerHp.innerText = "Hp " + player.Hp;
    combatLog.innerText = " Enemy Attacks for " + 0 + " damage!";
  }
  else{
  player.Hp = player.Hp - (enemy.Atk - player.Def)
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = " Enemy Attacks for " + (enemy.Atk - player.Def) + " damage!";
  console.log(enemyLastMove);
  }
}
var playerAtk = function(){
  enemy.Hp -= negativeCheck((player.Atk - enemy.Def));
  enemyHp.innerText = "Hp " + enemy.Hp;
  combatLog.innerText += "\n You Attack for " + negativeCheck(player.Atk - enemy.Def) + " damage!";
  playerLastMove = "playerAtk";
}
var playerProtect = function(){
  player.Mana = player.Mana - 8;
  player.Def = player.Def + 100;
  playerMana.innerText = "Mana " + player.Mana;
  combatLog.innerText += "player is protected!";
  playerLastMove = "playerProtect";
  console.log(enemyLastMove);
}

var enemyDefUp = function(){
  enemy.Def = enemy.Def + 3;
  combatLog.innerText = "Enemy Def rose by 3!";

  console.log(enemyLastMove);
}
var playerAtkUp = function(){
  player.Atk = player.Atk + 3;
  combatLog.innerText = "Player Atk rose by 3!";
  playerLastMove = "playerAtkUp";
  console.log(enemyLastMove);
}
var enemyFireball = function(){
  if(enemy.Mana < 15){
    combatLog.innerText = "Enemy Fireball fizzled";
  }
  else {
  enemy.Mana = enemy.Mana - 15;
  enemyMana.innerText = "Mana " + enemy.Mana;
  player.Hp = player.Hp - enemy.Atk;
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy cast Fireball! " + enemy.Atk + " damage!";
  console.log(enemyLastMove);
  }
}
var playerFireball = function(){
  player.Mana = player.Mana - 15;
  enemy.Hp = enemy.Hp - player.Atk;
  enemyHp.innerText = "Hp " + enemy.Hp;
  playerMana.innerText = "Mana " + player.Mana;
  combatLog.innerText += "\n Player cast Fireball! " + player.Atk + " damage!";
  playerLastMove = "playerFireball";
}

var enemyPrepare = function(){
  combatLog.innerText = "Enemy is preparing an attack!";
  console.log(enemyLastMove);
}
var enemyHardHit = function(){
  if(playerLastMove == "playerProtect"){
    playerHp.innerText = "Hp " + player.Hp;
    combatLog.innerText = " Enemy Attacks for " + 0 + " damage!";
  }
  else{
  player.Hp = player.Hp - ((enemy.Atk * 3) - player.Def)
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy deals a crushing blow for " + ((enemy.Atk * 3) - player.Def)  + " damage!";
  enemyLastMove = "enemyHardHit";
  console.log(enemyLastMove);
  }
}
var playerHeal = function(){

  player.Mana = player.Mana - 7;
  player.Hp = player.Hp + 20;
  playerMana.innerText = "Mana " + player.Mana;
  combatLog.innerText += "\n You recover 20Hp!"
  playerLastMove = "playerHeal";

}
var playerSlow = function(){
  enemy.Speed = enemy.Speed - 3;
  combatLog.innerText = "Enemy Speed lowered by 3!";
  playerLastMove = "playerSlow";
  console.log(enemyLastMove);
}

var enemyEnrageCheck = function(){
  if(enemy.Hp <= 60){
    enemy.attack = enemy.attack + 5;
    enemy.Mana = enemy.Mana + 15;
    enemy.Speed = enemy.Speed + 5;
  }
}



attackButton.addEventListener('click', function(){
  cleanUp();
  slowEnemyAttack();
  playerAtk();
  HpCheck();
});
protectButton.addEventListener('click', function(){
  cleanUp();
  if(player.Mana < 8){
    combatLog.innerText = "Not enough mana";
  }
  else {
  slowEnemyAttack();
  playerProtect();
  HpCheck();
  protectCheck();
  }
});
slowButton.addEventListener('click', function(){
  cleanUp();
  slowEnemyAttack();
  playerSlow();
  HpCheck();
});
healButton.addEventListener('click', function(){
  cleanUp();
  if(player.Mana < 7){
    combatLog.innerText = "Not enough mana";
  }
  else {
  slowEnemyAttack();
  playerHeal();
  HpCheck();
  }
});
spellButton.addEventListener('click', function(){
  cleanUp();
  if(player.Mana < 15){
    combatLog.innerText = "Not enough mana";
  }
  else {
  slowEnemyAttack();
  playerFireball();
  HpCheck();
  }
});
attackUpButton.addEventListener('click', function(){
  cleanUp();
  slowEnemyAttack();
  playerAtkUp();
  HpCheck();
});




















// leave
