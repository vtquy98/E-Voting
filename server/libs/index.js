import { isArray, keys } from 'lodash/fp';

export const generatePassword = () => {
  const result = Math.floor(Math.random() * 1000000);
  return result;
};

export const createListenerCallback = (listenerName, callback) => eventName => (
  ...args
) => {
  try {
    return callback(...args);
  } catch (err) {
    console.error(
      `"${listenerName}" was failed while listen event  ${eventName}`
    );

    throw err;
  }
};

export const addEventListeners = eventEmitter => eventRegisters =>
  keys(eventRegisters).forEach(eventName => {
    let callbacks = eventRegisters[eventName];

    if (!isArray(callbacks)) {
      callbacks = [callbacks];
    }

    for (let cb of callbacks) {
      eventEmitter.on(eventName, cb(eventName));
    }
  });
