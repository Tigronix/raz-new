const selectValidation = (arr) => {
  const isArr = arr.length === 0;
  const newArr = [];

  if(isArr){
    return arr
  }

  arr.map((item) => {
    return newArr.push(item)
  });
  
  return newArr
};

export default selectValidation;