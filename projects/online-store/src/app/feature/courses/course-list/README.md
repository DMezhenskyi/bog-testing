You've got a smart `CourseListComponent`. 'Smart Component' means that the component "knows" how to get the data using services it depends on. Your goal is to test this component.

## Task 1 (together) - Create Testing plan

*ACTION ITEMS*

- run command: `npm run build --project ui-kit`
- run command: `npm run start --project online-store`
- run command: `npm run test --project online-store` to run tests for that project
- Open the Demo App in the browser `https://localhost:4200`
- Please have a look at the component and pay attention to the behaviours it has. Based on this information, create a testing plan. The testing plan can be represented as simple comments or a list of `it.todo`.

## Task 2 (together) - Configure the TestBed
To configure the test bed, use the approach with `setup() {...}` function using your knowledge. The main challenge in this component are dependencies which we have to properly mock.


*ACTION ITEMS*

- Inside the `setup` function, create an instance of the component you are going to test using `TestBed.createComponent(...)` and assign it to `fixture` constant;
- Extract the debugEl from the created fixture.
- return fixture and debugElement as properties of the setup object.
- Provide missing providers for rounter: `TestBed.configureTestingModule({ providers: [provideRouter([])] })`;
- Provide the Mocked versions of component dependencies used by `CourseListComponent`. Namely, those are: `CoursesService` & `CartService`. Use `jest.fn()` to implement methods for the mock. Use `configureTestingModule` to override the real service implementations with mocks.
- inject back the mocked courses service `const coursesService = TestBed.inject(CoursesService);` and add it to the setup object like `{..., coursesService, ...}`
- do the same for the `CartService`;
- Since we mock the `CoursesService`, we won't be able to receive the real data from the server. That's why, we need to have some mocked data for our tests. That should be an array of type `Course[]` and contain a few "dummy" coureses.
- define this dummy courses in the `setup` functon and add them to the setup object.
- call the `setup` function somewhere in one of the tests.

## Task 3 - Testing scenarious defined before.

*HINTS & RECOMMENDATIONS:*
- right after the `setup` function call in unit test body, configure the spy to return a specific value. It has to be done before the spied method is called by component you test.
- Don't forget about calling `fixture.detectChanges()` because in tests change detections isn't triggered automatically.
- To simulate the error for the RxJS observable, use ```throwError(...)``` operator. The value for that operator has to be `() => ({ status: 'error', error: 'WHATEVER TEXT YOU WANT' })`
