# NOTES
Reducers transform the global state by handling actions.

## The reducers are created from _"redux-sauce"_
### Methods:
  - createReducer: This will take 1) an initial state and 2) an action handler function.
  - createTypes: This will create a list of types from a template string.

## Immutability is maintained by [_"seamless-immutable"_]("https://github.com/rtfeldman/seamless-immutable")
##### Documentation is great with this.
##### Check it out for more info.
##### Think of it as a front end mongoose to Mongo DB.

### Methods:
  - Immutable(_data here_)
  - Immutable._merge_
  - Immutable.(_data here_)._flatMap_ : This is the same as applying a regular JS "map" method to some sort of array.
  - Immutable.(_data here_)._asObject_(() => ): This will convert any array of data into an object of data.

### ImmutablePersistenceTransform

[R.identity](http://ramdajs.com/docs/#identity)
 * It essentially is doing nothing. But _redux-persist_ needs it to have some sort of object.

[R.when](http://ramdajs.com/docs/#when)
* Theres a 2 step process in using this method.
* 1) create two function.
  * The first will be a conditional and must return TRUE or FALSE.
  * The second will execute with argument 'X' if the conditional is TRUE.
  * Assign R.has(fn1, fn2) to a fn3.
* 2) Call fn3 passing in the argument 'X'.
  * Argument 'X'gets evaluated as either T or F based on fn1.
  * If it's true, then fn2 is called with argument 'X'.
  * Otherwise if F, then fn3 returns 'X'.

  `module.exports = _curry3(function when(pred, whenTrueFn, x) {

    return pred(x) ? whenTrueFn(x) : x;

  });`

[R.has](http://ramdajs.com/docs/#has)
* Returns whether or not an object has an own property with the specified name.
`s -> { s: x } -> Boolean`


[state.asMutable({ deep: true })](https://github.com/rtfeldman/seamless-immutable#asmutable)
* Returns a mutable copy of the data called on.  For a copy of a nested data structure, then this argument of { deep: true } should be used.
