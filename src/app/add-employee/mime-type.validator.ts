import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

export const mimeTypeValidator = (control: AbstractControl): Observable<{[key: string]: any}> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObserver = new Observable(observer => {
    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      let isValid = false;
      arr.forEach(item => {
        header += item.toString(16);
      });
      switch (header) {
        case "89504e47":
          isValid = true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if (isValid) {
        observer.next(null);
      } else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  })

  return frObserver;
}
