import { AbstractControl, ValidationErrors } from '@angular/forms';

export function contrasenasIguales(form: AbstractControl): ValidationErrors | null {
  const contrasena = form.get('contrasena')?.value;
  const repetir = form.get('repetir')?.value;

  return contrasena === repetir ? null : { noCoinciden: true };
}
