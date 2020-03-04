import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useStream = <T, A>(stream$: Observable<T>, initial: A) => {
  const [value, setValue] = useState<T | A>(initial);

  useEffect(() => {
    const subscription = stream$.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, []);

  return value;
};
