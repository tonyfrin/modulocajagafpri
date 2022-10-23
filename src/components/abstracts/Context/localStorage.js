function getItem(itemName, initialValue) {
  const localStorageItem = window.localStorage.getItem(itemName);
  let parsedItem;
  
  if (!localStorageItem) {
    window.localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  return parsedItem;
}
  
const saveItem = (itemName, newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    window.localStorage.setItem(itemName, stringifiedItem);
}

export {getItem, saveItem}; 