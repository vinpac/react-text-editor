/* eslint-disable no-restricted-syntax */

import has from 'has';
import isobject from 'isobject';

export function rangeEach(length, fn) {
  let i = 0;
  for (; i < length; i += 1) {
    if (fn(i, i) === false) {
      break;
    }
  }
}

export function rangeMap(length, fn) {
  const arr = [];
  rangeEach(length, (i) => arr.push(fn(i, i)));
  return arr;
}

export function forEach(obj, fn) {
  if (Array.isArray(obj) || typeof obj === 'string') {
    let i = 0;
    const len = obj.length;

    for (; i < len; i += 1) {
      if (fn(obj[i], i) === false) {
        break;
      }
    }
  } else {
    let i = 0;
    for (const key in obj) {
      if (has(obj, key)) {
        i += 1;
        if (fn(obj[key], key, i) === false) {
          break;
        }
      }
    }
  }
}

export function map(obj, fn) {
  if (Array.isArray(obj)) {
    return obj.map(fn);
  }

  const mapped = [];
  let i = 0;
  forEach(obj, (value, key) => {
    i += 1;
    mapped.push(fn ? fn(value, key, i) : value);
  });
  return mapped;
}


export function findOne(obj, fn) {
  let item = false;
  forEach(obj, (...args) => {
    item = fn(...args);
    return !item;
  });
  return item;
}

export function flattenObject(obj, remove = [], separator = '.') {
  const flattenedObject = {};
  const crawl = (el, key) => {
    if ((isobject(el) || Array.isArray(el)) && remove.indexOf(key) === -1) {
      forEach(el, (child, childKey) => {
        crawl(child, `${key}${childKey && separator}${childKey}`);
      });
    } else {
      flattenedObject[key] = el;
    }
  };
  if (isobject(obj)) {
    forEach(obj, crawl);
  }
  return flattenedObject;
}

