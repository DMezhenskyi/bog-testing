You've got a group of util functions that perform different functionality: trim strings, coerce data, etc
You aim to cover those functions with unit tests (as many as you can).

### Challenges

This kind of function does not require any specific setup. However, try to play with test suits (describe) by grouping test cases. Explore different test matchers that Jest provides. Cover use cases that throw errors (e.g., in `trim-str.ts`).

TIP: code that is supposed to throw an error has to be executed in the callback of the `expect` function. E.g `expect(() => {...}).__matcher__`
