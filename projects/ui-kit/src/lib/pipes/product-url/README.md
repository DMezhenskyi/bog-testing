You've got a pipe which transforms a given value (productId) into a URL string that is coming as a value of an injection token.

Pipes in Angular can be tested 2 ways:

1. Using TestHost strategy;
2. Using class instance (similar to service);

For this task we will be using the 2nd approach which is in most cases the most convenient and simple way. The general idea very simple:

- get an instance of the Pipe class;
- call the method `transform` with corresponding params and record the result in some variable/const;
- verify the the result is what you expect by using Jest test matchers.

### Task 1 - Test setup

- Using `TestBed`, resolve the instance of the Pipe from DI. NOTE: the pipe should be added to providers;
- Likewise for the previous lesson, configure the mocked `PRODUCT_BASE_URL` and use value like e.g `https://test.com`;

### Task 2 - Writing Tests

Implement the following 4 tests:

1. In case the `baseUrl` isn't provided - the Error has to be thrown text of which one should contain a string 'URL was not provided';
2. In case the `id` isn't provided - the Error has to be thrown text of which one should contain a string 'Invalid product id';
3. If `id` and `baseUrl` are provided, the transform method should return
   a proper string: e.g if `productId` is `1` the transformed value has to be `https://test.com/product/1`
4. If the `baseUrl` is provided with forward slash e.g `https://test.com/` the forward slash has to be trimmed, so the value will be still `https://test.com/product/1` and not `https://test.com//product/1`

NOTE: Make sure that for some tests you have to configure the value of `PRODUCT_BASE_URL` differently. One of the solutions, would be calling the `TestBed.configureTestingModule({...})` in each test case (instead of `beforeEach` hook). It might require a lot of repetitive code but no worries, we will fix it later.

### Task 3 (together)

Refactor tests using the `setup` function and show benefits of it.

### Task 4 (HOME WORK/or if there is time)

Apply the `setup` function approach to the `tax-calculator` service.
