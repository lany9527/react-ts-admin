function deepClone(source, cloneMap = new Map()) {
  const sourceType = Object.prototype.toString.call(source)

  if(sourceType !== '[object Object]' || source === null) {
    return source
  }
  if(cloneMap.has(source)) {
    return cloneMap.get(source)
  }
  let target
  switch(sourceType) {
    case '[object Object]':
    target = {}
    break;
    case '[object Array]':
    target = []
    break;
    case '[object Date]':
    target = new Date(source)
    break;
    case '[object RegExp]':
    target = new RegExp(source.source, source.flags)
    break;
    default:
    target = {}
    break
  }
  cloneMap.set(source,target)

  for(const key in source) {
    if(Object.hasOwnProperty.call(source,key)) {
      if(typeof source[key] === 'object' && source[key] !== null) {
        target[key] = deepClone(source[key], cloneMap)
      } else {
        target[key] = source[key]
      }
    }
  }

  const symbolKeys = Object.getOwnPropertySymbols(source)
  for(const symKey of symbolKeys) {
    target[symKey] = deepClone(source[symKey], cloneMap)
  }
  return target
}
const sym = Symbol('Symbol')
const obj = {
  name: 'test',
  [sym]: 'symppp',
  regExp: /abc/gi,
  date: new Date(),
  
}
console.log(deepClone(obj))