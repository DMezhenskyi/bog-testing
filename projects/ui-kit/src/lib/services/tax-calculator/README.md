You've got a service `TaxCalculatorService` that calculates VAT tax for a given amount of money by calling the `calculateVAT` method. Your goal is to make sure that the service method properly calculates VAT.

## Task 1 (Together) - Create Testing plan

Please, have a look at the implementation of the `calculateVAT` method. Try to spot how the behavior of the `calculateVAT` changes when we provide different arguments for the method. Based on this information, create a testing plan. The testing plan can be represented as a simple comments or a list of `it.todo`.

## Task 2 - Implement Test Cases

Implement unit tests for each of the scenarios in your testing plan.

*ACTION ITEMS*
- You have to create an instance of the `TaxCalculatorService`.
- Call its method `calculateVAT` with a params that correspond your scenario and save the result in variable/const;
- Use `expect()` allong with corresponding matchers to check if the result is what you expect in this scenario.

*HINTS & RECCOMENDATIONS:*
- Try to adhere the following structure in each of your unit tests:
```
  // SETUP (optional)
  // ACTION
  // ASSERTION / VALIDATION
```
- Consider excluding the repetitive "setup" logic into the `beforeEach` hook;
- Matchers that you probably need are `toBe()`, `toThrow()`;
- The code which supposed to throw an error, should be executed in the callback functon of the assertion function e.g.
`expect(() => { ...code-which-throws-error... }).toThrow()`
- To distinguish which error is thrown, you can provide an error message you expect in the `toThrow()` matcher. Example: `toThrow('...expected error msg...')`. Also, alternatively, you can use a RegExp and provide only the sub-string that the error message should contain like `toThrow(/ invalid /i)`. Using RegExp will make your test less fragile.

## Task 3

Try to add to country list a country, key of which one you used in the test "country isn't supported". This will cause failed tests because the country now exists in the list of supported countries. This is a good example of how tight coupling can break tests even though the logic of the method wasn't changed. Try to avoid such situations.

The best solution would be to extract the list of countries in a separate injection token and inject it into the service.


*ACTION ITEMS*

- Create a separate injection token and extract the hardcoded countries object there:

```typescript
export const COUNTRIES = new InjectionToken<Country>('countries', {
  providedIn: 'root',
  factory: () =>
    Object.freeze({
      ...
    }),
});
```

- Inject the created injection token via constructor using `@Inject(COUNTRIES) ...` decorator and adjust code if needed;

----

At this point, your tests should fail because now, when you create a service instance, you have to provide in the constructor an object of supported countries. In the real application, this object will be resolved from Angular Dependency Injection, but in tests, the DI wasn't involved (yet), so the value has to be provided manually. This is a great chance to provide a mocked version of the supported countries, which will be used ONLY in your tests. Provide to a service constructor something like: `{ ge: { name: 'Georgia', vat: 18 } }`. It should recover your tests.

Additionally, it makes your tests much more stable because now, in tests, you don't work with countries that are coming by default from the injection token, but you used the mocked one, so you can be sure that changes in the COUNTRIES injection token won't impact your tests.

## Task 4

Try to refactor the `TaxCalculatorService` with the modern `inject()` function instead of `@Inject(...)` decorator. It should break your test, and it is expected. This is because the `inject()` function relies on Angular Dependency Injection and has to be executed in a special _constructor context_, which is not currently the case. The easiest way to resolve objects for tests from DI is using the `TestBed.inject(YourService)` instead of manual class instantiation like `new TaxCalculatorService(...)`.

### Task 5.1

If you successfully resolved service from the Angular DI, you broke the countries mocking which we did in the `Task 2`. This is because we now completely rely on Angular DI, and DI picked up the real injection tokens from the actual countries instead of mocked ones.

Think about how you could provide the mock list of countries for the tests using the Angular DI. HINT: `TestBed` has a method `configureTestingModule({})`, which works like a `app.module.ts` in real apps where you can provide providers and many other things.
There you can override the value for the the `COUNTRIES` token like:

```typescript
TestBed.configureTestingModule({
  providers: [{ provide: COUNTRIES, useValue: { /* Mocked countries list */ } }]
})
 ```

*HINT:*

Becuase you have to mock countries before each unit test, consider configuring of the Testing Module inside the `beforeEach` hook.
