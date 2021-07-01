import {COUNTER_CHANGE} from '../types';

export function changeCount(count) {
  return {
    type: COUNTER_CHANGE,
    payload: count,
  };
}
