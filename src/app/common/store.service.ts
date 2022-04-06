import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, timer } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";
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

  saveCourse(courseId: number, changes): Observable<any> {
    const courses = this.subject.getValue();
    const courseIndex = courses.findIndex( course => course.id == courseId );     
    const newCourses = courses.slice(0); // copia o array de cursos para uma nova variavel
    newCourses[courseIndex] = { // encontra o index na nova, recupera a da antiga, e troca o valor dos dados
      ...courses[courseIndex], ...changes
    }
    this.subject.next(newCourses); // atualiza o cache

    return fromPromise( 
        fetch(`/api/courses/${courseId}`, 
          {
            method: 'PUT', 
            body: JSON.stringify(changes),
            headers: {
              'content-type': 'application/json'
            }
          }
        )
    )

  }
 
}