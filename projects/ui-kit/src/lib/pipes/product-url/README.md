You've got a pipe which transforms a given value (productId) into a URL string that is coming as a value of an injection token.

Pipes in Angular can be tested 2 ways:

1. Using TestHost strategy;
2. Using the Pipe class instance (similar to service) and calling the `transform()` method;

For this task we will be using the 2nd approach which is in most cases the most convenient and simple way. 

## Task 1 - Create Testing plan

Please, have a look at the implementation of the `transform` method. Try to spot how the behavior of the `transform` changes when we provide different arguments for it. Based on this information, create a testing plan. The testing plan can be represented as a simple comments or a list of `it.todo`.

## Task 2 - Implement Test Cases

Inside each test case follow the next action items:

*ACTION ITEMS*
- Using the `TestBed.configureTestingModule({ ... })` add the `ProductUrlPipe` class to providers array.
- Do the same for a token `PRODUCT_BASE_URL`. Use the `useValue: ...` dependency provider to provide the string which makes sence for the particular use case.
- Using the `TestBed.inject()`, resolve the instance of the Pipe from DI;
- Call method `transform` with a params that correspond your scenario and save the result in variable/const;
- Use `expect()` allong with corresponding matchers to check if the result is what you expect in this scenario.

*HINTS & RECCOMENDATIONS:*
- Try to adhere the following structure in each of your unit tests:
```
  // SETUP (optional)
  // ACTION
  // ASSERTION / VALIDATION
```
- Matchers that you probably need are `toBe()`, `toThrow()`;

### Task 3 (together)

Refactor tests using the `setup` function and show benefits of it.

### Task 4 (HOME WORK/or if there is time)

Apply the `setup` function approach to the `tax-calculator` service.
