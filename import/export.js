export let myVar = 942;
export let func1 = () => {
  console.log('Hello from function 1');
}

export let func2 = () => {
  console.log('Hello from function 2');
}

// old
// module.exports.myVar = myVariable;
// module.exports.func1 = func1;
// module.exports.func2 = func2;

// new
// module.exports = {
//   myVar: myVariable,
//   func1: func1,
//   func2: func2
// };
