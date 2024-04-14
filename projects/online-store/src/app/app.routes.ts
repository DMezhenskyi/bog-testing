import { Routes } from '@angular/router';
import { CourseListComponent } from './feature/courses/course-list/course-list.component';
import { CartComponent } from './feature/cart/cart/cart.component';
import { SingleCourseComponent } from './feature/courses/single-course/single-course.component';

export const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
  },
  {
    path: 'course/:id',
    component: SingleCourseComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'signin',
    loadComponent: () => import('./feature/signin/signin.component'),
  },
];
