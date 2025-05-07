import { Component,OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table' ;
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import * as bcrypt from 'bcryptjs';
import { HttpClientModule } from '@angular/common/http'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

interface Usuario{
   _id?: string;
   usuario_nombrecompleto: string;
   usuario_email: string;
   usuario_contrasena: string;

}

@Component({ 
  selector: 'app-root',
  imports: [RouterOutlet,MatTableModule,FormsModule, MatFormFieldModule,HttpClientModule,MatInputModule,MatPaginatorModule,CommonModule,MatSortModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['usuario_nombrecompleto', 'usuario_email','acciones'];
 // dataSource: Usuario[] = [];
 dataSource = new MatTableDataSource<Usuario>();
  nuevoUsuario: Usuario = {
    usuario_nombrecompleto: '',
    usuario_email: '',
    usuario_contrasena: ''
};
@ViewChild(MatSort) sort!: MatSort;
 constructor(private http: HttpClient) { }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
 ngOnInit() {
    this.cargarUsuarios();
  }
  cargarUsuarios() {
      this.http.get<Usuario[]>('http://localhost:3000/usuarios').subscribe((data) => {
        console.log(data);
        this.dataSource.data = data;
        //this.dataSource.sort = this.sort;
      });
    }
      
  
    agregarUsuario() {
      const saltRounds = 10;


      bcrypt.hash(this.nuevoUsuario.usuario_contrasena, saltRounds).then((hashedPassword) => {
        // Reemplazar la contraseña con la versión encriptada


        if (!this.nuevoUsuario.usuario_nombrecompleto) {
          alert('Debe ingresar un nombre.');
           return;
        }

        if (!this.nuevoUsuario.usuario_email) {
          alert('Debe ingresar un email.');
           return;
        }

        if (!this.nuevoUsuario.usuario_contrasena) {
          alert('Debe ingresar una contraseña.');
           return;
        }
       
        this.nuevoUsuario.usuario_contrasena = hashedPassword;

       
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.nuevoUsuario.usuario_email)) {
          alert('El email ingresado no es válido.');
          return;
        }
    
        // Enviar el objeto completo al servidor
        this.http.post<Usuario>('http://localhost:3000/usuarios', this.nuevoUsuario).subscribe((data) => {
          // Agregar el nuevo usuario a la tabla
          this.dataSource.data = [...this.dataSource.data, data];
    
          // Reiniciar el formulario
          this.nuevoUsuario = {
            usuario_nombrecompleto: '',
            usuario_email: '',
            usuario_contrasena: ''
          };
        });
      }).catch((error) => {
        console.error('Error al encriptar la contraseña:', error);
      });
    }
    editarUsuario(usuario: Usuario) {
      const saltRounds = 10;
      const nuevoNombreCompleto = prompt('Ingrese el nuevo nombre completo:', usuario.usuario_nombrecompleto);
      const nuevoEmail = prompt('Ingrese el nuevo email:', usuario.usuario_email);
      let nuevaContrasena = prompt('Ingrese la nueva contraseña:', usuario.usuario_contrasena);
      if (nuevoNombreCompleto === null || nuevoEmail === null || nuevaContrasena === null) {
        return;
      }

      bcrypt.hash(nuevaContrasena, saltRounds).then((hashedPassword) => {
        // Reemplazar la contraseña con la versión encriptada
        nuevaContrasena = hashedPassword;
        
      });

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(nuevoEmail)) {
        alert('El email ingresado no es válido.');
        return;
      }
      this.http.put<Usuario>(`http://localhost:3000/usuarios/${usuario._id}`, {
        usuario_nombrecompleto: nuevoNombreCompleto,
        usuario_email: nuevoEmail,
        usuario_contrasena: nuevaContrasena
      }).subscribe((data) => {
        this.cargarUsuarios();
      });
    }
    eliminarUsuario(usuario: Usuario) {
      console.log(usuario);
      if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        this.http.delete<Usuario>(`http://localhost:3000/usuarios/${usuario}`).subscribe(() => {
          this.cargarUsuarios();
        });
      }
}
}
