You've got a complex component `CourseListComponent` that does the following things:
1. Fetches the data (courses) using the service `CoursesService.getCourses()`:
- if this method returns an object with status 'loading', the user should see the template for the loading;
- if the getCourses method throws an error, the user should see the error template;
- if the method returns an object with status "success" - the data from the server should be rendered.
2. if a user clicks the "Add to Cart" button, this course should be added to the application cart.

You can see it in action if you open the Demo App in the browser `https://localhost:4200`.

In the `course-list.component.spec.ts` you will find the testing plan for those scenarious and your goal is to implement tests.

NOTE: please try to implement tests without midifying the `course-list.component.ts` itself.

*GUIDANCE FOR TEST SETUP:*
1. The main challenge here is to mock the component dependencies (`CoursesService` & `CartService`) and instead of the real implementation, you should provide mocks. Those can be represented as simple JS objects which partially implement the interface of the original services but the real methods implementation should be replaced with Jest spies which can be created by using `jest.fn()` method. So, your mock could look like this:

```typescript
   const coursesServiceSpy: Partial<CoursesService> = {
    getCourses: jest.fn(),
  };
```
2. Using `TestBed.configureTestingModule({})` replace the real implementation of services with their mocks and add other dependency providers if needed.

*GUIDANCE FOR TEST IMPLEMENTATION:*
- right after you call `setup()` function in unit test body, configure the spy to return a specific value that depends on your testing scenario. Spy must be cofigured before the spied method is called by component.

Example for the first test case:

```typescript
    jest.spyOn(coursesService, 'getCourses').mockReturnValue(
      of<NetworkStatus>({
        status: 'loading',
      })
```

- Don't forget about calling `fixture.detectChanges()` because in tests change detections isn't triggered automatically.
- To simulate the error in `CoursesService.getCourses`, use ```throwError(...)``` operator. 
Example:

```typescript
    jest.spyOn(coursesService, 'getCourses').mockReturnValue(
      throwError(() => ({
        status: 'error',
        error: 'Internal Server Error',
      }))
    );
```
- Test Matchers you would probably need: `toBe`, `toHaveBeenCalledWith`, `toContain`