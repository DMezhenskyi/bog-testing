## Task 1 - Create Testing plan

*ACTION ITEMS*

- run command: `npm run build --project ui-kit`
- run command: `npm run start --project ui-kit-demoapp`
- Open the Demo App in the browser and navigate to a page `/chip`
- Please have a look at the chip component and pay attention to the states and label values it can have. Based on this information, create a testing plan. The testing plan can be represented as simple comments or a list of `it.todo`.

## Task 2 - Configure the TestBed

*ACTION ITEMS*

- Create a `setup` function somewhere outside the test suite.
- Inside the `setup` function, create an instance of the component you are going to test using `TestBed.createComponent(...)`;
- result of `TestBed.createComponent(...)` assign to a constant `fixture`;
- The `fixture` has a reference to the component that was just created. Get access to the `componentRef` from the `fixture` and assign it to a const `componentRef`;
- Do the same for the `debugElement`.
- return `fixture`, `componentRef`, and the `debugElement` from the `setup` function as part of the setup object.
- call the `setup` function in one of your test cases and destructure `fixture` and `debugElement` from the setup object. If everything is properly done, you should not see any errors.

## Task 2.1 - Explore `fixture` and `debugElement` together.

## Task 3 - Testing component inputs (from the testing plan).

*HINTS & RECOMMENDATIONS:*
- To setup component inputs, prefer a method `setInput('inputName', value)` which comes from the `componentRef`. Avoid assigning input values via `componentInstance.prop = value`
- Don't forget to trigger `fixture.detectChages()` each time when you change property/input/etc which supposed to cause changes in the component view.
- To query elements in the component template use `debugElement.query(  ...  )` and `By.css('__CSS_SELECTOR__')` helper;
- Matchers that you probably need are `toBe()`, `toBeTruthy()`, `toContain(string)`;
- To read a text of a certain DOM node, use: `someDebugEl.nativeElement.textContent`.

## Task 4 (together) How to make tests less fragile.

## Task 5 (try self / together) Testing component outputs

*HINTS & RECOMMENDATIONS:*
- To simulate an event (e.g, a click), you can use either `debugElement.triggerEventHandler('click')` or using the nativeElement: `debugElement.nativeElement.click()`;
- EventEmitters are extensions of the RxJS subject, so you can subscribe to it as a regular observable, get emitted value, and use it in your `expect()` function.

## Task 6 (together) - Introducing the TestHost approach / if have time.
