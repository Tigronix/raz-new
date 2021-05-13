function* objToArr(data) {
  for (let prop of Object.keys(data))
    yield data[prop];
}

export default objToArr;