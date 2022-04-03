import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    beginnersCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;
    
    constructor() {
        
    }
    
    ngOnInit() {
        
        const http$ = createHttpObservable('/api/courses');
        
        const courses$: Observable<Course[]> = http$.pipe(
            tap( (tese) => console.log('tap execution', tese)),
            map( res => res['payload'] ),
            tap( (oi) => console.log('post map execution', oi)), //log... mostra em tempo real os dados sendo tratados
            shareReplay() //evita repetir a chamada multiplas vezes
            );
            
        this.beginnersCourses$ = courses$.pipe(
            map( (courses: any) => courses.filter(
                course => course.category == 'BEGINNER'
            ))
        )
         
        this.advancedCourses$ = courses$.pipe(
            map( (courses: any) => courses.filter(
                course => course.category == 'ADVANCED'
            ))
        )


        // courses$.subscribe( 
        //         courses => {
        //             this.beginnersCourses = 
                
        //             this.advancedCourses = courses.filter(
        //                 course => course.category == 'ADVANCED'
        //             )

        //         },
        //         noop,
        //         () => { console.log('complete')}
        //         )
                
            }
            
        }
        