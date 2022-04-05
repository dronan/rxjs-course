import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export enum RxJsLoggingLevel { TRACE, DEBUG, INFO, ERROR }

let rxRjLoggingLevel = RxJsLoggingLevel.INFO;

export function setRxRjLogginLevel(level: RxJsLoggingLevel) {
  rxRjLoggingLevel = level;
}

export const debug = 
        (level: number, message: string ) => 
            (source: Observable<any>) => 
              source.pipe(
                  tap( val => {

                    if (level >= rxRjLoggingLevel) {
                      console.log(message + ':', val)  

                    }

                  })
)