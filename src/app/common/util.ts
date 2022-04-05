import { Observable } from "rxjs";

export function createHttpObservable (url: string) {
  return new Observable<any>( observer => {

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, {signal}).then( response => {
      if (!response.ok) {
        observer.error('request failed'+ response.status)
        //throw new Error(response.statusText);
      }
      return response.json();
    })
    .then ( body => {
      observer.next(body);
      observer.complete();
    })
    .catch( err => {
      observer.error(err)
    })
    // observer.complete();

    return () => controller.abort();
    

  })
}