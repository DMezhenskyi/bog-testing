You've got a service that calculates VAT taxes for a given amount of money by calling the `calculateVAT` method. Your goal is to make sure that the service method properly calculates VAT.

## Task 1

- In the test case, create an instance of the service class.
- Call the `calculateVAT` method with certain params and assign it to some variable/const.
- Verify that the result value is the one you expect by using Jest matchers like `toBe,` `toThrow,` etc.

### Expected inputs and outputs

1. If provided: `100` of the amount and country code `ge` -> output should be `18`;
2. If provided: `100` of amount, country code `ge`, and `isB2B` is `true` -> output should be `0`
3. If provided: `100` of amount, country code `ir` -> should be thrown error that contains a string `isn't supported`
4. If provided: `-100` of amount, country code `ge` -> should be thrown error that contains a string `can not be a negative number`

## Task 2

Try to add a country with a key `ir` to the object of the supported countries. This will cause failed tests because the country now exists in the list of supported countries. This is a good example of how tight coupling can break tests even though the logic of the method wasn't changed. Try to avoid such situations.

The best solution would be to extract the list of countries in a separate injection token and inject it into the service. Those are the steps to perform:

- Create a separate injection token with type `Countries`;
- Configure it to be injected into the root injector using `providedIn: 'root'`;
- From the token factory function, return the object you extracted from the `TaxCalculatorService` service;
- Inject the created injection token via constructor using `@Inject()` decorator;

At this point, your tests should fail because now, when you create a service instance, you have to provide in the constructor an object of supported countries. In the real application, this object will be resolved from Angular Dependency Injection, but in tests, the DI wasn't involved (yet), so the value has to be provided manually. This is a great chance to provide a mocked version of the supported countries, which will be used ONLY in your tests. Provide to a service constructor something like: `{ ge: { name: 'Georgia', vat: 18 } }`. It should recover your tests.

Additionally, it makes your tests much more stable because now, in tests, you don't work with countries that are coming from the real injection token, but you used the mocked one, so you can be sure that changes in the COUNTRIES injection token won't impact your tests.

## Task 3

Try to refactor the `TaxCalculatorService` with the modern `inject()` function instead of `@Inject(...)` decorator. It should break your test, and it is expected. This is because the `inject` function relies on Angular Dependency Injection and has to be executed in a special _constructor context_, which is not currently the case. The easiest way to resolve objects for tests from DI is using the `TestBed` helper and its method `inject,` so use it instead of manual class instantiation, `e.g., new TaxCalculatorService(...)`.

### Task 3.1

If you successfully resolved service from the Angular DI, you broke the countries mocking which we did in the `Task 2`. This is because we now completely rely on Angular DI, and DI picked up the real injection tokens from the actual countries instead of mocked ones.

Think about how you could provide the mock list of countries for the tests using the Angular DI. HINT: `TestBed` has a method `configureTestingModule({})`, which works like a `app.module.ts` in real apps where you can provide providers and many other things.

### Task 3.2

If you found a way to provide mock countries list using `TestBed.configureTestingModule({})`, you might end up with multiple calls of `configureTestingModule.` Refactor it to reduce the amount of repetitive strings. HINT: use the Jest's `beforeEach` hook.
