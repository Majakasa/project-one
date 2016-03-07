window.onload = function() {

var setUp = function(){
  enemyHpNum.innerText = "HP " + enemy.Hp;
  hpDispay.innerText = "HP " + player.Hp;
  manaDisplay.innerText = "HP " + player.Mana;
  enemyManaNum.innerText = "HP " + enemy.Mana;
  combatLog.innerText = "An Enemy has appeared! \n Choose an action!"
  console.log("setup complete");
}

setUp();
}
var hardHitSound = document.querySelector('#hard')
var boost = document.querySelector('#boost')
var protect = document.querySelector('#protect')
var fireBallSound = document.querySelector('#fireBall');
var hitSound = document.querySelector('#hit');
var healSound = document.querySelector('#heal');
var fanfare = document.querySelector('#fanfare');
var battleTheme = document.querySelector('#battleTheme');

var enemyHpNum = document.querySelector('.enemyHpNum');
var enemyManaNum = document.querySelector('.enemyManaNum');
var hpDispay = document.querySelector('.hp');
var manaDisplay = document.querySelector('.mana');

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
  Hp: 70,
  Atk: 15,
  Def: 7,
  Speed: 11,
  Mana: 70,
  First: undefined,
};
var enemy = {
  Hp: 100,
  Atk: 13,
  Def: 10,
  Speed: 9,
  Mana: 50,
  First: undefined,
};
var playerAtkAfter;
var timer;
function slowEnemyAttack() {
  timer = window.setTimeout(enemyMove, 2500);
}
var slowPlayerAttack = function(){
  timer = window.setTimeout(playerAtk, 2000);
}


var playerPercentDamage = function (e){
   playerPercent = Math.floor((e / player.Hp) * 100);
  return playerPercent;
}
var playerPercentMana = function (e){
   playerPercent = Math.floor((e / player.Mana) * 100);
  return playerPercent;
}
var enemyPercentDamage = function (e){
    var enemyPercent = Math.floor((e / enemy.Hp) * 100);
 return enemyPercent;
}
var enemyPercentMana = function (e){
    var enemyPercent = Math.floor((e / enemy.Mana) * 100);
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
  return Math.floor(Math.random() * (12 - 1 + 1)) + 1;
}

var enemyMove = function(){
  random();
var randomNum = random();
console.log(randomNum)
  if(enemyLastMove === "enemyPrepare"){
    enemyHardHit();
    enemyLastMove = "HardHit";
  }
    else if(randomNum >= 10){
    enemyAtk();
    enemyLastMove = "enemyAtk";
    console.log("Atk");
    }
    else if(randomNum == 9) {
      enemyDefUp();
      enemyLastMove = "enemyDefUp";
      console.log("Def up");
    }
    else if(randomNum >= 7) {
      enemyFireball();
      enemyLastMove = "enemyFireball";
      console.log("fireball");
    }
    else if(randomNum >= 4) {
       enemyPrepare();
       enemyLastMove = "enemyPrepare";
    }
    else if(randomNum == 3) {
      combatLog.innerText = "Enemy is observing you carefully...";
      enemyLastMove = "waiting";
    }
    else{
    enemyAtk();
    enemyLastMove = "enemyAtk";
    console.log("Atk");
    }

  HpCheck();
  protectCheck();
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
    hpDispay.innerText = 0;
    endGame();
    battleTheme.pause();
  }
  if(enemy.Hp <= 0){
    combatLog.innerText = "\n \n You won!";
    enemyHpNum.innerText = 0;
    dracky.style.backgroundImage = "url()";
    endGame();
    battleTheme.pause();
    fanfare.play();
  }
  if(player.Hp > 70){
    player.Hp = 70;
    hpDispay.innerText = "Hp " + player.Hp;
  }
  if(enemy.Hp > 100){
    enemy.Hp = 100;
    enemyHpNum.innerText = "Hp " + enemy.Hp;
  }
  if(enemy.Hp <= 40){
    enemy.attack += 5;
    enemy.Mana +=  15;
    enemy.Speed += 5;
  }
}
var negativeCheck = function(e){
  if(e < 0){
    e = 1;
  }
  return e;
}

// var hpBarPlayer = playerPercentDamage(enemyDamage);
// var hpBarEnemy = enemyPercentDamage(playerDamage);
// var ManaBarEnemy = enemyPercentMana(playerDamage);


var enemyAtk = function(){
  if(random() == 6){
    player.Hp -= negativeCheck(enemy.Atk * 2 - player.Def);
    playerHp.style.width = player.Hp + "%";
    hpDispay.innerText = "Hp " + player.Hp;
    combatLog.innerText += "\n Enemy crits for " + negativeCheck(enemy.Atk * 2 - player.Def); + " damage!!!";
    hardHitSound.play();
  }else if(random() == 1){
      combatLog.innerText += "\n Enemy attack missed!"
  }
  else{

  player.Hp -= negativeCheck(enemy.Atk - player.Def);
  playerHp.style.width = player.Hp + "%";
  hpDispay.innerText = "Hp " + player.Hp;
  combatLog.innerText += "\n Enemy Attacks for " + negativeCheck(enemy.Atk - player.Def); + " damage!";
  hitSound.play();
  console.log(enemyLastMove);
  }
}
var playerAtk = function(){
  if(random() == 6){
    enemy.Hp -= negativeCheck(player.Atk * 2 - enemy.Def);
    enemyHp.style.width = enemy.Hp + "%";
    enemyHpNum.innerText = "Hp " + enemy.Hp;
    combatLog.innerText = " Critical hit for " + negativeCheck(player.Atk * 2 - enemy.Def); + " damage!!!";
    hardHitSound.play();
    dracky.classList.add("blinky");
  }
  else if(random() == 1){
      combatLog.innerText = " Your attack missed!"
  }
  else{
  enemy.Hp -= negativeCheck(player.Atk - enemy.Def);
  enemyHp.style.width = enemy.Hp + "%";
  enemyHpNum.innerText = "Hp " + enemy.Hp;
  combatLog.innerText = " You Attack for " + negativeCheck(player.Atk - enemy.Def) + " damage!";
  hitSound.play();
  dracky.classList.add("blinky");
  playerLastMove = "playerAtk";
  }
  HpCheck();
}
var playerProtect = function(){
  player.Mana -= 8;
  player.Def += 100;
  manaDisplay.innerText = "Mana " + player.Mana;
  playerMana.style.width = player.Mana + "%";
  combatLog.innerText = "Player is protected!";
  protect.play();

  playerLastMove = "playerProtect";
  console.log(enemyLastMove);
}
var enemyDefUp = function(){
  enemy.Def +=  3;
  combatLog.innerText += "\n Enemy Def rose by 3!";
  boost.play();
  console.log(enemyLastMove);
}
var playerAtkUp = function(){
  player.Atk += 3;
  combatLog.innerText = "Player Atk rose by 3!";
  boost.play();
  playerLastMove = "playerAtkUp";
  console.log(enemyLastMove);

}
var enemyFireball = function(){
  if(enemy.Mana < 15){
    combatLog.innerText += "\n Enemy Fireball fizzled";
  }
  else {
  enemy.Mana -= 15;
  enemyMana.style.width = enemy.Mana + "%";
  enemyManaNum.innerText = "Mana " + enemy.Mana;
  player.Hp -= enemy.Atk;
  playerHp.style.width = player.Hp + "%";
  hpDispay.innerText = "Hp " + player.Hp;
  combatLog.innerText += "\n Enemy cast Fireball! " + enemy.Atk + " damage!";
  fireBallSound.play();
  console.log(enemyLastMove);
  }
}
var playerFireball = function(){
  player.Mana -= 15;
  enemy.Hp -= player.Atk;
  enemyHp.style.width = enemy.Hp + "%";
  enemyHpNum.innerText = "Hp " + enemy.Hp;
  manaDisplay.innerText = "Mana " + player.Mana;
  playerMana.style.width = player.Mana + "%";
  combatLog.innerText += " Player cast Fireball! " + negativeCheck(player.Atk); + " damage!";
  fireBallSound.play();
  dracky.classList.add("blinky");
  HpCheck();
  playerLastMove = " playerFireball";
}
var enemyPrepare = function(){
  combatLog.innerText += "\n Enemy is preparing an attack!";
  console.log(enemyLastMove);
}
var enemyHardHit = function(){
  player.Hp -= negativeCheck((enemy.Atk * 3) - player.Def)
  playerHp.style.width = player.Hp + "%";
  hpDispay.innerText = "Hp " + player.Hp;
  combatLog.innerText += "\n Enemy deals a crushing blow for " + negativeCheck((enemy.Atk * 3) - player.Def)  + " damage!";
  hardHitSound.play();

  console.log(player.Def );
  enemyLastMove = "enemyHardHit";
  console.log(enemyLastMove);
}
var playerHeal = function(){
  player.Hp += 20;
  player.Mana -= 7;
  playerHp.style.width = player.Hp + "%";
  playerMana.style.width = player.Mana + "%";
  combatLog.innerText += " You recover 20Hp!"
  manaDisplay.innerText = "Mana " + player.Mana;
  hpDispay.innerText = "Hp " + player.Hp;
  healSound.play();
  HpCheck();
  playerLastMove = "playerHeal";
}
var playerSlow = function(){
  enemy.Speed -= 3;
  combatLog.innerText += "\n Enemy Speed lowered by 3!";
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
  playerAtk();
  slowEnemyAttack();
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

  }
});
slowButton.addEventListener('click', function(){
  cleanUp();
  playerSlow();
  slowEnemyAttack();
  HpCheck();
});
healButton.addEventListener('click', function(){
  cleanUp();
  if(player.Mana < 7){
    combatLog.innerText = "Not enough mana";
  }
  else {
  manaDisplay.innerText = "Mana " + player.Mana;
  playerHeal();
  slowEnemyAttack();
  HpCheck();
  }
});
spellButton.addEventListener('click', function(){
  cleanUp();
  if(player.Mana < 15){
    combatLog.innerText = "Not enough mana";
  }
  else {
  playerFireball();
  slowEnemyAttack();
  HpCheck();
  }
});
attackUpButton.addEventListener('click', function(){
  cleanUp();
  playerAtkUp();
  slowEnemyAttack();
  HpCheck();
});

var endGame = function(){
  spellButton.disabled = true;
  attackButton.disabled = true;
  healButton.disabled = true;
  protectButton.disabled = true;
  slowButton .disabled = true;
  attackUpButton .disabled = true;
}


















// leave
