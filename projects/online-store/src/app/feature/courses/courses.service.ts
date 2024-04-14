import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Course } from './courses.model';
import { NetworkErrorStatus, NetworkStatus } from '../../core/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  #http = inject(HttpClient);

  getCourses(): Observable<NetworkStatus<Course[]>> {
    return this.#http
      .get<Course[]>(`${environment.api}/api/courses`)
      .pipe(
        map(courses => ({ status: 'success', data: courses } as const)),
        catchError((err: HttpErrorResponse) => 
          throwError(() => ({ status: 'error', error: err.message } as const))
        ),
        startWith({ status: 'loading' } as const)
      );
  }
  findCourse(id: string): Observable<NetworkStatus<Course>> {
    return this.#http.get<Course>(`${environment.api}/api/courses/${id}`)
      .pipe(
        map((course) => ({ status: 'success', data: course } as const)),
        catchError((err: HttpErrorResponse) => of({
            status: 'error',
            error: err.message,
          } as NetworkErrorStatus)
        ),
        startWith({ status: 'loading' } as const)
      );
  }
}
