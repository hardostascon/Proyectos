import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
// Removed invalid @import statement. Add it to a CSS or SCSS file instead.
@Component({
  selector: 'app-dialog-nuevo-usuario',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule],
  template: `
  <!--<div style="width: 100%; height: 50px; margin-top: 1%; text-align: center; font-family: 'Segoe UI', sans-serif;" class="text-dark bg-light rounded">-->
  <div style="width: 100%; margin-top: 1%; text-align: center; font-family: 'Segoe UI', sans-serif; margin-bottom: 20px;" class="text-dark bg-light rounded">
  <h1 mat-dialog-title class="font-weight-bold">Nuevo Usuario</h1>
</div>
<br>
  <div mat-dialog-content class="dialog-content">
  <div class="container" style="margin-top: 5% ; font-family: 'Segoe UI', sans-serif;" >
    <mat-form-field appearance="fill" class="w-full">
      <mat-label style="font-family: 'Segoe UI', sans-serif;">Nombre completo</mat-label>
      <input matInput [(ngModel)]="usuario.usuario_nombrecompleto" />
    </mat-form-field>
  </div>
  <div class="container" style="margin-top: 5%">
    <mat-form-field appearance="fill" class="w-full">
      <mat-label style="font-family: 'Segoe UI', sans-serif;">Email</mat-label>
      <input matInput [(ngModel)]="usuario.usuario_email" />
    </mat-form-field>
  </div>
  <div class="container" style="margin-top: 5%">
    <mat-form-field appearance="fill" class="w-full">
      <mat-label style="font-family: 'Segoe UI', sans-serif;">Contraseña</mat-label>
      <input matInput type="password" [(ngModel)]="usuario.usuario_contrasena" />
    </mat-form-field>
  </div>

  <div mat-dialog-actions align="end" style="margin-left: 5%">
    <button mat-button (click)="cancelar()" class="boton-negro" >Cancelar</button>
    <button mat-raised-button color="primary" class="boton-negro"  (click)="guardar()">Guardar</button>
  </div>`,

 
  //templateUrl: './dialog-nuevo-usuario.component.html',
  styleUrl: './dialog-nuevo-usuario.component.css'
})
export class DialogNuevoUsuarioComponent {
  usuario = {
    usuario_nombrecompleto: '',
    usuario_email: '',
    usuario_contrasena: ''
  };

  constructor(private dialogRef: MatDialogRef<DialogNuevoUsuarioComponent>) {}

  cancelar() {
    this.dialogRef.close();
  }

  guardar() {
    this.dialogRef.close(this.usuario); // Devuelve el usuario al componente principal
  }

}
 