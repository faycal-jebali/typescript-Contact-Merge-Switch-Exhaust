import { of, timer } from 'rxjs';
import {
  concatMap,
  delay,
  mergeMap,
  switchMap,
  exhaustMap,
  takeLast,
  take,
  flatMap,
  map,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

//emit delay value
const source = of(500, 2000, 1000);

// ##########################################################
// map value from source into inner observable, when complete emit result and move to next
const example = source.pipe(
  // delay(5000),
  takeLast(2),
  concatMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
);
//output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
const subscribe = example.subscribe((val) =>
  console.log(`With concatMap: ${val}`)
);

// ##########################################################

// showing the difference between concatMap and mergeMap
const mergeMapExample = source
  .pipe(
    // just so we can log this after the first example has run
    // delay(5000),
    takeLast(2),
    mergeMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe((val) => console.log(`With mergeMap: ${val}`));

// ##########################################################

// showing the difference between concatMap and mergeMap
const switchMapExample = source
  .pipe(
    // just so we can log this after the first example has run
    // delay(5000),
    takeLast(2),
    switchMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe((val) => console.log(`With switchMap: ${val}`));

// ##########################################################

// showing the difference between concatMap and mergeMap
const exhaustMapExample = source
  .pipe(
    // just so we can log this after the first example has run
    // delay(5000),
    take(1),
    exhaustMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe((val) => console.log(`With exhaustMap: ${val}`));

// ##########################################################
const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';
const API_ALL_URL = 'https://jsonplaceholder.typicode.com/todos/';
const timer$ = timer(0, 1000);

timer$
  .pipe(
    take(0),
    /*
     * Using mergeMap for example, but generally for GET requests
     * you will prefer switchMap.
     * Also, if you do not need the parameter like
     * below you could use mergeMapTo instead.
     * ex. mergeMapTo(ajax.getJSON(API_URL))
     */
    mergeMap(() => ajax.getJSON(API_URL))
  )
  // { userId: 1, id: 1, ...}
  .subscribe((data) => console.log('TODO 1 : ', data));

// ##########################################################
const lisIds$ = of(1, 2, 6);

lisIds$
  .pipe(
    // take(3),
    /*
     * Using mergeMap for example, but generally for GET requests
     * you will prefer switchMap.
     * Also, if you do not need the parameter like
     * below you could use mergeMapTo instead.
     * ex. mergeMapTo(ajax.getJSON(API_URL))
     */
    flatMap((id) =>
      ajax.getJSON(`${API_ALL_URL}/${id}`).pipe(map((item) => item))
    )
  )
  // { userId: 1, id: 1, ...}
  .subscribe((data: any) => console.log(`TODO ID ${data?.id}: `, data));
