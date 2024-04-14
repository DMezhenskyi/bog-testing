import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CoursesService } from '../courses.service';
import { CartService } from '../../cart/cart.service';
import { Course } from '../courses.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-single-course',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCourseComponent {
  #activatedRoute = inject(ActivatedRoute);
  #courseService = inject(CoursesService);
  #cartService = inject(CartService);

  course$ = this.#activatedRoute.params.pipe(
    map((params) => params['id']),
    switchMap((id) => this.#courseService.findCourse(id))
  );

  addToCart(course: Course) {
    this.#cartService.add(course);
  }
}
