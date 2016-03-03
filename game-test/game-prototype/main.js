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
  Atk: 15,
  Def: 13,
  Speed: 11,
}
var enemy = {
  Hp: 120,
  Atk: 18,
  Def: 10,
  Speed: 9,
}
var at = function(){
  enemy.Hp = enemy.Hp - 10;
  enemyHp.innerText = "HP " + enemy.Hp;

}
















// leave
