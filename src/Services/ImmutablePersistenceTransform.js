// See 'stores/' README.md for answers to any questions here.
// NOTE - Reverse lines 13 & 16 if the store isn't getting updated.

import R from 'ramda';
import Immutable from 'seamless-immutable';

const isImmutable = R.has('asMutable');
const convertToJS = (state) => state.asMutable({ deep: true });
const fromImmutable = R.when(isImmutable, convertToJS);
const toImmutable = (raw) => Immutable(raw);

export default {
  in: (raw) => toImmutable(raw),
  out: (state) => {
    state.mergeDeep = R.identity;
    return fromImmutable(state);
  }
};
