import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmar-dialogo',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmar-dialogo.html'
})
export class ConfirmarDialogo {
  data = inject<{ mensaje: string }>(MAT_DIALOG_DATA);
}
