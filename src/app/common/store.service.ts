import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, timer } from "rxjs";
import { tap, map, shareReplay, retryWhen, delayWhen } from "rxjs/operators";
import { Course } from "../model/course";
import { createHttpObservable } from "./util";

@Injectable({
  providedIn: 'root'
})
export class Store {
 

  private subject = new BehaviorSubject<Course[]>([]);// sempre pega o ultimo 
  courses$: Observable<Course[]> = this.subject.asObservable();


  init() {
    const http$ = createHttpObservable('/api/courses');

    http$
        .pipe(
            tap(() => console.log("HTTP request executed")),
            map(res => Object.values(res["payload"]) )
        ).subscribe( courses => this.subject.next(courses));
  }

  selectAdvancedCourses(): Observable<Course[]> {
    return this.filterByCategory('ADVANCED')
  }

  selectBeginnerCourses(): Observable<Course[]> {
    return this.filterByCategory('BEGINNER')
  }

  filterByCategory(category: string) {
    return this.courses$
    .pipe(
        map(courses => courses
            .filter(course => course.category == category))
    );
  }

}