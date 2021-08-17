/**
 * Author: shanxiaohan
 * Time: 2021/08/17 (40min)
 */
const fs = require('fs');

const isValidLine = (item) => {
  if(!item || typeof item !== 'string') return false;
  const validReg = new RegExp(/^(\w+\s*\w+;){2}(draw|win|loss)$/);
  return validReg.test(item);
}

const statusMap = {
  'win': {
    point: 3,
    match: 'loss',
  },
  'draw': {
    point: 1,
    match: 'draw',
  },
  'loss': {
    point: 0,
    match: 'win',
  }
};

class Team {
  constructor(name) {
    this.name = name;
    this.MP = 0;
    this.W = 0;
    this.D = 0;
    this.L = 0;
    this.P = 0;
  }

  updateScore(status) {
    this.MP += 1;
    this.W += status === 'win' ? 1 : 0;
    this.L += status === 'loss' ? 1 : 0;
    this.D += status === 'draw' ? 1 : 0;
    this.P += statusMap[status].point || 0;
  }

  format(length) {
    const { name, MP, W, D, L, P } = this;
    return `${name.padEnd(length, ' ')}  |  ${MP} | ${W} | ${D} | ${L} | ${P}\n`;
  }
}

fs.readFile('./input.txt', (err, data) => {
  if(err) {
    throw err;
  }
  data = data.toString();
  if(!data) return;
  const lines = data.split('\n');
  let map = {};
  let outputData = '';

  lines.forEach(item => {
    if(!isValidLine(item)) return;
    let [team1, team2, status] = item.split(';');
    if(!map[team1]) {
      map[team1] = new Team(team1);
    }
    if(!map[team2]) {
      map[team2] = new Team(team2);
    }
    map[team1].updateScore(status);
    map[team2].updateScore(statusMap[status].match);
  });
  // align first column
  let maxKeyLength = 0;
  const sortedKeys = Object.keys(map).sort((a, b) => {
    maxKeyLength = Math.max(maxKeyLength, a.length, b.length);
    return map[a].P < map[b].P
  });
  outputData += `${'Team'.padEnd(maxKeyLength, ' ')}  | MP | W | D | L | P\n`;

  sortedKeys.forEach(key => {
    outputData += map[key].format(maxKeyLength);
  });

  fs.writeFile('./output.txt', outputData, (err) => {
    if(err) {
      throw err;
    }
  });
});