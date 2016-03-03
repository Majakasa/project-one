window.onload = function() {

var setUp = function(){
  enemyHp.innerText = "HP " + enemy.Hp;
  playerHp.innerText = "HP " + player.Hp;
  combatLog.innerText = "An Enemy has appeared! Choose an action!"
  console.log("setup complete");
}

setUp();
}
enemyHp = document.querySelector('#enemyHp');
playerHp = document.querySelector('#playerHp');
combatLog = document.querySelector('.combatLog');
spellButton = document.querySelector('.spell');
attackButton = document.querySelector('.attack');


var player = {
  Hp: 100,
  Atk: 20,
  Def: 12,
  Speed: 11,
  Mana: 70,
};
var enemy = {
  Hp: 120,
  Atk: 18,
  Def: 15,
  Speed: 9,
  Mana: 50,
};
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
}

var cleanUp = function(){
  combatLog.innerText = ""
}


var enemyAtk = function(){
  player.Hp = player.Hp - (enemy.Atk - player.Def);
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText =  " Enemy Attacks for " + (enemy.Atk - player.Def) + " damage!"
}
var playerAtk = function(){
  enemy.Hp = enemy.Hp - (player.Atk - enemy.Def);
  enemyHp.innerText = "Hp " + enemy.Hp;
  combatLog.innerText += " You Attack for " + (player.Atk - enemy.Def) + " damage!" + " "
  console.log(lastMove);
}
var enemyDefUp = function(){
  enemy.Def = enemy.Def + 3;
  combatLog.innerText = "Enemy Def rose by 3!"
}
var enemyFireball = function(){
  enemy.Mana = enemy.Mana - 5;
  player.Hp = player.Hp - enemy.Atk;
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy cast Fireball! " + enemy.Atk + " damage!"
}
var playerFireball = function(){
  player.Mana = player.Mana - 5;
  enemy.Hp = enemy.Hp - player.Atk;
  enemyHp.innerText = "Hp " + enemy.Hp;
  combatLog.innerText = "player cast Fireball! " + player.Atk + " damage!"
}
var enemyPrepare = function(){
  combatLog.innerText = "Enemy is preparing an attack!"
}
var enemyHardHit = function(){
  player.Hp = player.Hp - enemy.Atk * 3;
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy deals a crushing blow for " + enemy.Atk * 3 + " damage!"
  lastMove = "enemyHardHit"
}


attackButton.addEventListener('click', function(){
  cleanUp();
  enemyMove();
  playerAtk();
});
spellButton.addEventListener('click', function(){
  cleanUp();
  enemyMove();
  playerFireball();
});


// damages bad guy and updates hp
// var test = function(){
//   enemy.Hp = enemy.Hp - 10;
//   enemyHp.innerText = "HP " + enemy.Hp;
//
// }
















// leave
