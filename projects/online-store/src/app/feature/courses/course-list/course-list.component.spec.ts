import { TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import { CoursesService } from '../courses.service';
import { Course } from '../courses.model';
import { provideRouter } from '@angular/router';
import { CartService } from '../../cart/cart.service';

describe('CourseListComponent', () => {
  
  it(`should show loading view if status loading`, () => {
    const { fixture, debugEl, coursesService } = setup();
  });
  it.todo(`should show error view if courses could not be fetched`);
  it.todo(`should render course cards if response successful`);
  it.todo(`should add proper item to the cart`);
  it.todo(`should have proper link to details page`);
  
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