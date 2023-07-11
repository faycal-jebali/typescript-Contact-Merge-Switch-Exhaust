import { of } from 'rxjs';
import {
  concatMap,
  delay,
  mergeMap,
  switchMap,
  exhaustMap,
  takeLast,
  take,
} from 'rxjs/operators';

//emit delay value
const source = of(500, 2000, 1000);
// map value from source into inner observable, when complete emit result and move to next
const example = source.pipe(
  delay(5000),
  takeLast(2),
  concatMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
);
//output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
const subscribe = example.subscribe((val) =>
  console.log(`With concatMap: ${val}`)
);

// showing the difference between concatMap and mergeMap
const mergeMapExample = source
  .pipe(
    // just so we can log this after the first example has run
    delay(5000),
    takeLast(2),
    mergeMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe((val) => console.log(`With mergeMap: ${val}`));

// showing the difference between concatMap and mergeMap
const switchMapExample = source
  .pipe(
    // just so we can log this after the first example has run
    delay(5000),
    takeLast(2),
    switchMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe((val) => console.log(`With switchMap: ${val}`));

// showing the difference between concatMap and mergeMap
const exhaustMapExample = source
  .pipe(
    // just so we can log this after the first example has run
    delay(5000),
    take(1),
    exhaustMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe((val) => console.log(`With exhaustMap: ${val}`));
