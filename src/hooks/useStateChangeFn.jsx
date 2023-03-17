export default function useSetStateChange(list, type, setState, callback) {
  const stateChange = (e, eventTarget) => {
    const name = eventTarget;
    callback(e);
    list.forEach((listName, index) => {
      listName === name && setState(type[index]);
    });
  };

  return stateChange;
}
