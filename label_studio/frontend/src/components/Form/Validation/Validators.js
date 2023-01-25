import { isDefined, isEmptyString } from '../../../utils/helpers';
import './Validation.styl';


export const required = (fieldName, value) => {
  if (!isDefined(value) || isEmptyString(value)) {
    return `${fieldName} اجباری است`;
  }
};

export const matchPattern = (pattern) => (fieldName, value) => {
  pattern = (typeof pattern === 'string') ? new RegExp(pattern) : pattern;

  if (!isEmptyString(value) && value.match(pattern) === null) {
    return `${fieldName} باید طبق الگوی ${pattern} باشد`;
  }
};

export const json = (fieldName, value) => {
  const err = `${fieldName} باید در قالب JSON string باشد`;

  if (!isDefined(value) || value.trim().length === 0) return;

  if (/^(\{|\[)/.test(value) === false || /(\}|\])$/.test(value) === false) {
    return err;
  }

  try {
    JSON.parse(value);
  } catch (e) {
    return err;
  }
};

export const regexp = (fieldName, value) => {
  try {
    new RegExp(value);
  } catch (err) {
    return `${fieldName} باید یک عبارت منظم صحیح باشد`;
  }
};
