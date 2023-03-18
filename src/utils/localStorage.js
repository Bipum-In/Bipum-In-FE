const Storage = {
  setUserName(name) {
    this.removeLocalStorage('userName');
    this.setlocalStorage('userName', name);
  },

  removeUserName() {
    this.removeLocalStorage('userName');
  },

  getUserName() {
    return window.localStorage.getItem('userName');
  },

  getLocalStorageJSON(key) {
    const parseToJSON = window.localStorage.getItem(key);
    return JSON.parse(parseToJSON);
  },

  setLocalStorageJSON(key, data) {
    const stringToJSON = JSON.stringify(data);
    return window.localStorage.setItem(key, stringToJSON);
  },

  setlocalStorage(key, value) {
    return window.localStorage.setItem(key, value);
  },

  removeLocalStorage(key) {
    return window.localStorage.removeItem(key);
  },

  clearLocalStorage() {
    return window.localStorage.clear();
  },
};

export default Storage;
