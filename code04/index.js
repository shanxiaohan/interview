/**
 * Author: shanxiaohan
 * Time: 2021/08/17 (80min)
 */
function getDominoesChain(list) {
  const dominoeStatus = {};
  let remainCount = 0;
  list.forEach(([val1, val2]) => {
    dominoeStatus[val1] = dominoeStatus[val1] || {};
    dominoeStatus[val2] = dominoeStatus[val2] || {};
    dominoeStatus[val1][val2] = (dominoeStatus[val1][val2] || 0) + 1;
    dominoeStatus[val2][val1] = (dominoeStatus[val2][val1] || 0) + 1;
    remainCount += 1;
  });
  for(let key of Object.keys(dominoeStatus)) {
    const res = dfs([key], dominoeStatus, remainCount);
    if(res.length > 0) {
      return res;
    }
  }
  return [];
}

function dfs(path, dominoeStatus, remainCount) {
  const last = path[path.length-1];
  if(remainCount == 0) {
    return path[0] == last ? [...path] : [];
  }
  for(let next of Object.keys(dominoeStatus[last])) {
    if(dominoeStatus[last][next] <= 0) {
      continue;
    }
    path.push(next);
    dominoeStatus[last][next] -= 1;
    dominoeStatus[next][last] -= 1;
    remainCount -= 1;
    const res = dfs(path, dominoeStatus, remainCount);
    if(res.length > 0) {
      return res;
    } else {
      path.pop();
      dominoeStatus[last][next] += 1;
      dominoeStatus[next][last] += 1;
      remainCount += 1;
    }
  }
  return []
}

function format(list) {
  const res = [];
  for(let i = 0; i < list.length-1; i++) {
    res.push([list[i], list[i+1]]);
  }
  return res;
}

const dominoesList = [[1,2], [5,3], [3,1], [1,2], [2,4], [1,6], [2,3], [3,4], [5,6]];

const result = getDominoesChain(dominoesList);
if(result && result.length) {
  console.log(format(result));
} else {
  console.log('InValid Dominoes Chain')
}
