import { Observable, OperatorFunction, debounceTime, filter } from "rxjs";

export function customOperador<T>(
    filterFn: (value: T) => boolean,
    debounceTimeFn: number,
): OperatorFunction<T, T> 
{
    return (source:Observable<T>)=>source.pipe(
        filter(filterFn),
        debounceTime(debounceTimeFn),    
    )
}
