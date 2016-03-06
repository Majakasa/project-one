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
var bleh = document.querySelector('.bleh');
var playerHpBar = document.querySelector('.nope');
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
var dracky = document.querySelector('#enemy');


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



var playerPercentDamage = function (e){
   playerPercent = Math.floor((e / 100) * 100);
  return playerPercent;
}
var playerPercentMana = function (e){
   playerPercent = Math.floor((e / 70) * 100);
  return playerPercent;
}
var enemyPercentDamage = function (e){
    var enemyPercent = Math.floor((e / 120) * 100);
 return enemyPercent;
}
var enemyPercentMana = function (e){
    var enemyPercent = Math.floor((e / 50) * 100);
 return enemyPercent;
}





// var prority = function(){
//   if(player.Speed > enemy.Speed){
//     player.First = true;
//     enemy.First = false;
//   }
//   else{
//     enemy.First = true;
//     player.First = false;
//   }
// }
// if(player.First){
//     slowEnemyAttack();
// }else{
//
// }


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
  dracky.classList.remove("blinky");
  console.log("enemy moved");
}

var cleanUp = function(){
  combatLog.innerText = " ";
}
var checkProtect = function(){
  if(playerLastMove == "playerProtect"){
    player.Def -= 100;
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
    enemy.attack += 5;
    enemy.Mana +=  15;
    enemy.Speed += 5;
    combatLog.innerText += " Enemy is enraged!";
  }
}

var negativeCheck = function(e){
  if(e < 0){
    e = 1;
  }
  return e;
}

var hpBarPlayer = playerPercentDamage(enemyDamage);
var hpBarEnemy = enemyPercentDamage(playerDamage);

var ManaBarEnemy = enemyPercentMana(playerDamage);



enemyHp.style.width = enemy.Hp + "%";


var enemyAtk = function(){
  player.Hp -= enemyDamage;
  playerHp.style.width = playerHp.style.width - (hpBarPlayer + "%");
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = " Enemy Attacks for " + enemyDamage + " damage!";
  console.log(enemyLastMove);
}
var playerAtk = function(){
  enemy.Hp -= playerDamage;
  enemyHp.style.width = enemy.Hp + "%";
  enemyHp.innerText = "Hp " + enemy.Hp;
  combatLog.innerText += "\n You Attack for " + playerDamage + " damage!";

  playerLastMove = "playerAtk";
}
var playerProtect = function(){
  player.Mana -= 8;
  player.Def += 100;
  playerMana.innerText = "Mana " + player.Mana;
  combatLog.innerText += "player is protected!";
  playerLastMove = "playerProtect";
  console.log(enemyLastMove);
}
var enemyDefUp = function(){
  enemy.Def +=  3;
  combatLog.innerText = "Enemy Def rose by 3!";
  console.log(enemyLastMove);
}
var playerAtkUp = function(){
  player.Atk += 3;
  combatLog.innerText = "Player Atk rose by 3!";
  playerLastMove = "playerAtkUp";
  console.log(enemyLastMove);

}
var enemyFireball = function(){
  if(enemy.Mana < 15){
    combatLog.innerText = "Enemy Fireball fizzled";
  }
  else {
  enemy.Mana -= 15;
  enemyMana.innerText = "Mana " + enemy.Mana;
  player.Hp -= enemy.Atk;
  playerHp.style.width = player.Hp + "%";
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy cast Fireball! " + enemy.Atk + " damage!";
  console.log(enemyLastMove);
  }
}
var playerFireball = function(){
  player.Mana -= 15;
  enemy.Hp -= player.Atk;
  enemyHp.style.width = enemy.Hp + "%";
  enemyHp.innerText = "Hp " + enemy.Hp;
  playerMana.innerText = "Mana " + player.Mana;
  combatLog.innerText += "\n Player cast Fireball! " + negativeCheck(player.Atk); + " damage!";
  playerLastMove = "playerFireball";
}
var enemyPrepare = function(){
  combatLog.innerText = "Enemy is preparing an attack!";
  console.log(enemyLastMove);
}
var enemyHardHit = function(){
  player.Hp -= negativeCheck((enemy.Atk * 3) - player.Def)
  playerHp.style.width = player.Hp + "%";
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy deals a crushing blow for " + negativeCheck((enemy.Atk * 3) - player.Def)  + " damage!";
  enemyLastMove = "enemyHardHit";
  console.log(enemyLastMove);
}
var playerHeal = function(){
  player.Hp += 20;
  player.Mana -= 7;
  playerMana.innerText = "Mana " + player.Mana;
  combatLog.innerText += "\n You recover 20Hp!"
  playerLastMove = "playerHeal";
}
var playerSlow = function(){
  enemy.Speed -= 3;
  combatLog.innerText = "Enemy Speed lowered by 3!";
  playerLastMove = "playerSlow";
  console.log(enemyLastMove);
}

var enemyDamage = negativeCheck(enemy.Atk - player.Def);
var playerDamage = negativeCheck(player.Atk - enemy.Def);

function blinkyDracky() {
   dracky.style.visibility = ( dracky.style.visibility == 'visible' )? 'hidden' : 'visible';
   setTimeout("blinkyDracky();", 200);
}


attackButton.addEventListener('click', function(){
  cleanUp();
  slowEnemyAttack();
  playerAtk();
  dracky.classList.add("blinky");
  // dracky.classList.remove("blinky");
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
