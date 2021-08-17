/**
 * Author: shanxiaohan
 * Time: 2021/08/17 (35min)
 */
 const input = [
  {id:1, name: 'i1'},
  {id:2, name:'i2', parentId: 1},
  {id:4, name:'i4', parentId: 3},
  {id:3, name:'i3', parentId: 2},
  {id:8, name:'i8', parentId: 3}
];

// 检查目标类型
const checkTargetType = (data, type='Object') => {
  return Object.prototype.toString.call(data) === `[object ${type}]`;
}

// 合理输入对象
const checkValidItem = (item) => {
  if(!item || !checkTargetType(item)) {
    throw new TypeError('输入数组每项为 Object 类型！')
  }
  const { id, name, parentId } = item;
  if(!checkTargetType(id, 'Number')) {
    throw new TypeError('数组每项必须包含 Number 类型的 id 属性！')
  }
  if(!checkTargetType(name, 'String')) {
    throw new TypeError('数组每项必须包含 String 类型的 name 属性！')
  }
  if(!!parentId && !checkTargetType(parentId, 'Number')) {
    throw new TypeError('数组每项的 parentId 属性必须为 Number 类型！')
  }
  return true;
}

function main(list) {
  if(!checkTargetType(list, 'Array')) {
    throw new TypeError('输入必须为数组！')
  }
  const res = [];

  const map = list.reduce((map, item) => {
    checkValidItem(item);
    if(map.has(item.id)) {
      throw new Error('数组中 id 不可重复！')
    }
    map.set(item.id, item);
    return map;
  }, new Map());

  list.forEach(item => {
    const { parentId } = item;
    if(parentId == null) {
      res.push(item);
      return;
    }
    let parent = map.get(parentId);
   
    if(parent) {
      parent.children = parent.children || [];
      parent.children.push(item);
    } else {
      throw new Error('存在非法的 parentId！');
    }
  })
  return res;
}

try {
  const output = main(input);
  console.log(JSON.stringify(output));
} catch (error) {
  console.error(error)
}