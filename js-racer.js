"use strict"
start(+process.argv[2],+process.argv[3])

function start(totalPlayer,jalur) {
  if (totalPlayer < 2) {
    console.log(`minimal 2 player, klo sendiri bukan balapan donk`);
  } else if(totalPlayer > 11){
    console.log(`maksimal 10 player, klo kebanykan rusuh nanti`);
  }

  if (jalur < 10) {
    console.log('jalur harus lebih dari 10 meter');
  }

  let players = []
  const kamus = 'abcdefghij'
  for (let i = 0; i < totalPlayer; i++) {
    players.push([kamus[i],0])
  }
  
  let powerUp = 7
  let obstacle = 4
  printBoard(players,jalur,powerUp,obstacle)
  sleep (900)
  clearScreen()
  let flag = true
  while (flag) {
    for (let i = 0; i < players.length; i++) {
      advance(players[i],jalur)

      clearScreen()
      printBoard(players,jalur,powerUp,obstacle)
      sleep (900)
      if (players[1] === powerUp) {
        players[1] += 4
        clearScreen()
        printBoard(players,jalur,powerUp,obstacle)
        sleep (900)
      }

      if (players[1] === obstacle) {
        players[1] -= 2
        clearScreen()
        printBoard(players,jalur,powerUp,obstacle)
        sleep (900)
      }

      if (finished(players[i],jalur)) {
        console.log(winner(players[i],jalur));
        flag = false
        break;
      }
    }
  }
}

function diceRoll () {
  return Math.ceil(Math.random()*4)
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (players,jalur,powerUp,obstacle) {
  
  if (diceRoll() % 3 === 0) {
    console.log(`Yoo guess who the winner ??`);
  } else if(diceRoll() % 1 === 0) {
    console.log(`This Race Sponsored By Indomie`);
  } else if(diceRoll() % 2 === 0){
    console.log(`ceritanya ini papan iklan`);
  }
  for (let i = 0; i < players.length; i++) {
    console.log(printLine(players[i][0],players[i][1],jalur,powerUp,obstacle)); 
  }
}


function printLine (players,pos,jalur,powerUp,obstacle) {
  let result = '|'
  for (let i = 0; i <= jalur-1; i++) {
    if (i === powerUp){
      result += `P|`
    }
    if (i === obstacle) {
      result += `X|`
    }
    if(i === pos){
      result += `${players}|`
    }else{
      result += ` |`
    }
  }
  return result
}

function advance (player,jalur) {
  player[1] += diceRoll()
    if (player[1] >= jalur) {
      player[1] = jalur-1
    }
  return player[1]
}

function finished (players,jalur) {
if (players[1] === jalur-1) {
  return true
}else{
  return false
}
}

function winner (players,jalur) {
return `The Winner From This ${jalur*10} Meter Race is ${players[0]}`
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

