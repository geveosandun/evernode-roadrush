const getMaxValue = (receivedValues) => {
  if (!Array.isArray(receivedValues) || receivedValues.length === 0) {
    return null;
  }

  return receivedValues.reduce((maxObj, currentObj) => {
    if (currentObj.value > maxObj.value) {
      return currentObj;
    } else {
      return maxObj;
    }
  }, receivedValues[0]);
};


const getMinValue = (receivedValues) => {
  if (!Array.isArray(receivedValues) || receivedValues.length === 0) {
    return null;
  }

  return receivedValues.reduce((minObj, currentObj) => {
    if (currentObj.value < minObj.value) {
      return currentObj;
    } else {
      return minObj;
    }
  }, receivedValues[0]);
}

const getSingleUUID = (receivedValues) => {
  if (!Array.isArray(receivedValues) || receivedValues.length === 0) {
    return null;
  }

  receivedValues.sort((a, b) => {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;
    return 0;
  })

  return receivedValues[0];
}

export default { getMaxValue, getMinValue, getSingleUUID };