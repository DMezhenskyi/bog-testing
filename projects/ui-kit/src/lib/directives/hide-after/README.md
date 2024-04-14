You've got a directive `hide-after`. This is a structural directive that removes a content after some period of time defined as a directive input. You can think of it as an ngIF directive but with some delay.

## Task 1 (together)

Try to identify scenarios that are handled by the directive / create a testing plan:

## Task 2

Use the `TestHost` strategy and restore in the TestHost the scenarios that you need to implement test cases you defined in Task 1.

## Task 3

Implement test cases to cover your testing plan defined in Task 1

NOTES:

- Pay attention that the directive uses async operations like `setInterval`. It might require the "time manipulation" in your tests. Consider using the `fakeAsync` + `tick/flush` functions for that purposes.
