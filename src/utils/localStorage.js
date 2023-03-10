const Storage = {
  setUserName(name) {
    removeLocalStorage('userName');
    setlocalStorage('userName', name);
  },

  removeUserName() {
    removeLocalStorage('userName');
  },

  getUserName() {
    return window.localStorage.getItem('userName');
  },
};

function setlocalStorage(key, value) {
  return window.localStorage.setItem(key, value);
}

function removeLocalStorage(key) {
  return window.localStorage.removeItem(key);
}

export default Storage;
