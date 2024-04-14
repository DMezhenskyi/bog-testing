import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Observable, Subject, catchError, merge, of, startWith, switchMap } from 'rxjs';
import { Course } from '../courses.model';
import { CoursesService } from '../courses.service';
import { CartService } from '../../cart/cart.service';
import { NetworkStatus } from '../../../core/models';

@Component({
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, RouterModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit {
  courses$!: Observable<NetworkStatus<Course[]>>;

  #coursesService = inject(CoursesService);
  #card = inject(CartService);

  ngOnInit() {
    this.courses$ = this.#coursesService.getCourses().pipe(
      catchError(err => of(err))
    );
  }

  addToCard(course: Course) {
    this.#card.add(course);
  }
}
