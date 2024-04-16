import { TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import { CoursesService } from '../courses.service';
import { of, throwError } from 'rxjs';
import { NetworkStatus } from '../../../core/models';
import { By } from '@angular/platform-browser';
import { Course } from '../courses.model';
import { provideRouter } from '@angular/router';
import { CartService } from '../../cart/cart.service';

describe('CourseListComponent', () => {
  it(`should show loading view if status loading`, () => {
    const { coursesService, fixture, debugEl } = setup();
    jest.spyOn(coursesService, 'getCourses').mockReturnValue(
      of<NetworkStatus>({
        status: 'loading',
      })
    );
    // initial change detection
    fixture.detectChanges();
    const loadingView = debugEl.query(
      By.css('[data-testingId="loading-view"]')
    );

    expect(loadingView).not.toBeNull();
    expect(loadingView.nativeElement.textContent).toContain('Loading');
  });
  it(`should show error view if courses could not be fetched`, () => {
    const { fixture, debugEl, coursesService } = setup();
    jest.spyOn(coursesService, 'getCourses').mockReturnValue(
      throwError(() => ({
        status: 'error',
        error: 'Internal Server Error',
      }))
    );
    // initial change detection
    fixture.detectChanges();

    const errorView = debugEl.query(By.css('[data-testingId="error-view"]'));

    expect(errorView).not.toBeNull();
    expect(errorView.nativeElement.textContent).toContain('Could not load');
  });
  it(`should render course cards if response successful`, () => {
    const { fixture, debugEl, testingCourses, coursesService } = setup();
    jest.spyOn(coursesService, 'getCourses').mockReturnValue(
      of({
        status: 'success',
        data: testingCourses,
      })
    );
    fixture.detectChanges();

    const cards = debugEl.queryAll(By.css('[data-testingId="card"]'));

    expect(cards.length).toBe(2);
    expect(cards[0].nativeElement.textContent).toContain(
      testingCourses[0].name
    );
    expect(cards[1].nativeElement.textContent).toContain(
      testingCourses[1].name
    );
  });
  it(`should add proper item to the cart`, () => {
    const { fixture, debugEl, cartService, testingCourses, coursesService } =
      setup();
    const courseToAdd = testingCourses[0];
    jest.spyOn(coursesService, 'getCourses').mockReturnValue(
      of({
        status: 'success',
        data: [courseToAdd],
      })
    );
    fixture.detectChanges();

    const cardAddButton = debugEl.query(
      By.css('[data-testingId="add-to-cart"]')
    );
    cardAddButton.triggerEventHandler('click');

    expect(cartService.add).toHaveBeenCalledWith(courseToAdd);
  });
  it(`should have proper link to details page`, () => {
    const { fixture, debugEl, coursesService, testingCourses } = setup();
    const courseToNavigate = testingCourses[0];
    jest.spyOn(coursesService, 'getCourses').mockReturnValue(
      of({
        status: 'success',
        data: [courseToNavigate],
      })
    );

    fixture.detectChanges();
    const detailsButton = debugEl.query(
      By.css('[data-testingId="details-link"]')
    );

    expect(detailsButton.attributes['href']).toBe(
      `/course/${courseToNavigate.id}`
    );
  });
});

function setup() {
  const coursesServiceSpy: Partial<CoursesService> = {
    getCourses: jest.fn(),
  };
  const cartServiceSpy: Partial<CartService> = {
    add: jest.fn(),
  };
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      {
        provide: CoursesService,
        useValue: coursesServiceSpy,
      },
      {
        provide: CartService,
        useValue: cartServiceSpy,
      },
    ],
  });
  const fixture = TestBed.createComponent(CourseListComponent);
  const debugEl = fixture.debugElement;
  const coursesService = TestBed.inject(CoursesService);
  const cartService = TestBed.inject(CartService);

  const testingCourses: Course[] = [
    {
      id: 1,
      name: 'Testing Course',
      price: 100,
      image: 'https://example.com/image.jpg',
      description: 'Course Testing Description',
      link: 'https://example.com/course',
    },
    {
      id: 2,
      name: 'Testing Course 2',
      price: 100,
      image: 'https://example.com/image2.jpg',
      description: 'Course Testing Description 2',
      link: 'https://example.com/course2',
    },
  ];

  return { fixture, debugEl, coursesService, testingCourses, cartService };
}

