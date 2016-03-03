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
playerHp = document.querySelector('#playerHp')
combatLog = document.querySelector('.combatLog')

var player = {
  Hp: 100,
  Atk: 20,
  Def: 12,
  Spell: 20,
  Speed: 11,
  Mana: 70,
}
var enemy = {
  Hp: 120,
  Atk: 18,
  Def: 15,
  Spell: 10,
  Speed: 9,
  Mana: 50,
}

var moveChoice = function(){
  Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}
var enemyAtk = function(){
  player.Hp = player.Hp - (enemy.Atk - player.Def);
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy Attacks for " + (enemy.Atk - player.Def) + " damage!"
}
var playerAtk = function(){
  enemy.Hp = enemy.Hp - (player.Atk - enemy.Def);
  enemyHp.innerText = "Hp " + enemy.Hp;
  combatLog.innerText = "You Attack for " + (player.Atk - enemy.Def) + " damage!"
}
var enemyDefUp = function(){
  enemy.Def = enemy.Def + 3;

}

var enemyFireball = function(){
  player.Hp = player.Hp - enemy.Spell;
  playerHp.innerText = "Hp " + player.Hp;
  combatLog.innerText = "Enemy cast Fireball! " + enemy.Spell + " damage!"



}
// damages bad guy and updates hp
// var test = function(){
//   enemy.Hp = enemy.Hp - 10;
//   enemyHp.innerText = "HP " + enemy.Hp;
//
// }
















// leave
