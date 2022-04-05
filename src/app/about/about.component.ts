import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject, BehaviorSubject} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        const subject = new Subject();
        // const subject = new BehaviorSubject(); // guarda o ultimo valor associado para colocar na proxima subscricao

        const serie$ = subject.asObservable();

        serie$.subscribe( (val) => console.log(`inicio do subs`, val) )

        subject.next(1);
        subject.next(2);
        subject.next(3);

        subject.complete();

        setTimeout( () => {
            serie$.subscribe( (val) => console.log(`sub pos 3s`, val) )
            subject.next(4);

        }, 3000)

    }


}






