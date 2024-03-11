function pAll(promises) {
  return new Promise((resolve, reject) => {
    let promiseCount = 0;
    const results = new Array(promises.length)

    if (promises.length === 0) {
      resolve([])
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        results[index] = value
        promiseCount++
        if (promiseCount === promises.length) {
          resolve(results)
        }
      }).catch(error => {
        reject(error)
      })
    })
  })
}


function pAllPlus(promises) {
  if (!(Object.prototype.toString.call(promises) === '[object Array]' || promises[Symbol.iterator] === 'function')) {
    return new Promise.reject('promises must be interable')
  }
  return new Promise((resolve, reject) => {
    let promiseCount = 0;
    const results = new Array(promises.length)

    if (promises.length === 0) {
      resolve([])
    }
    promises.forEach((promise, index) => {
      if (!Object.prototype.toString.call(promise) === '[object Promise]') {
        reject('unExpected promise type at index: ' + index)
      }
      promise.then((value) => {
        results[index] = value
        promiseCount++
        if (promiseCount === promises.length) {
          resolve(results)
        }
      }).catch(error => {
        reject(error)
      })
    })
  })
}


function pRacePlus(promises) {
  if (!(Object.prototype.toString.call(promises) === '[object Array]' || promises[Symbol.iterator] === 'function')) {
    return new Promise.reject('promises must be interable')
  }
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([])
    }
    promises.forEach((promise, index) => {
      if (!Object.prototype.toString.call(promise) === '[object Promise]') {
        reject('unExpected promise type at index: ' + index)
      }
      promise.then((value) => {
        resolve(value)
      }).catch(error => {
        reject(error)
      })
    })
  })
}

Array.prototype.customerFlat = function () {
  let result = []
  for (let item in this) {
    if (Array.isArray(item)) {
      result = result.concat(item.customerFlat())
    } else {
      result.push(item)
    }
  }
  return result;
}

function customerFlat(arr) {
  if (!Array.isArray(item)) {
    throw new Error('参数不是数组')
  }
  let result = []
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    const item = arr[i]
    if (Array.isArray(item)) {
      result = result.concat(customerFlat(item))
    } else {
      result.push(item)
    }
  }
  return result;
}


Function.prototype.customCall = function (context, args = []) {
  if (Object.prototype.toString.call(this) !== '[object Function]') {
    throw new Error('被调用对象必须是函数类型')
  }
  if (!Array.isArray(args)) {
    throw new Error('第二个参数必须是数组')
  }
  context = context || globalThis
  let fn = Symbol('key')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}

Function.prototype.customApply = function (context) {
  if (Object.prototype.toString.call(context) !== '[object Function]') {
    throw new Error('被调用对象不是函数类型')
  }
  if (!Array.isArray(args)) {
    throw new Error('第二个参数必须是数组')
  }
  context = context || globalThis;
  let fn = Symbol('key');
  context[fn] = this;
  const result = context[fn](...args)
  delete context[fn];
  return result;
}

Function.prototype.customBind = function (context, ...args) {
  if (Object.prototype.toString.call(context) !== '[object Function]') {
    throw new Error('被调用对象不是函数类型')
  }
  context = context || globalThis
  const fn = Symbol('key');
  context[fn] = this;
  return function fn(...args2) {
    if (this instanceof fn) {
      return new context[fn]([...args, ...args2])
    }
    return context[fn](...args, ...args2)
  }
}

Function.prototype.customBind = function (context, ...args) {
  // 确保 context 是一个对象，如果不是则使用 globalThis  
  if (typeof context !== 'object' || context === null) {
    context = globalThis;
  }

  const self = this; // 保存原函数  

  // 返回一个新函数  
  return function boundFunction(...innerArgs) {
    // 如果使用 new 关键字调用，则作为构造函数调用原函数  
    if (this instanceof boundFunction) {
      return new self(...args, ...innerArgs);
    }
    // 否则，调用原函数并固定 this 为 context  
    return self.apply(context, args.concat(innerArgs));
  };
};