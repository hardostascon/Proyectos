import { Component,OnInit ,ViewChild, AfterViewInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table' ;
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import * as bcrypt from 'bcryptjs';
import { HttpClientModule } from '@angular/common/http'; 
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { DialogNuevoUsuarioComponent } from './dialog-nuevo-usuario/dialog-nuevo-usuario.component';
import { CustomPaginatorIntl } from './custom-paginator-intl';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { DialogEditarUsuarioComponent } from './dialog-editar-usuario/dialog-editar-usuario.component';
interface Usuario{
   _id?: string;
   usuario_nombrecompleto: string;
   usuario_email: string;
   usuario_contrasena: string;

}

@Component({ 
  selector: 'app-root',
  imports: [RouterOutlet,MatTableModule,FormsModule, MatFormFieldModule,HttpClientModule,MatInputModule,MatPaginatorModule,CommonModule, MatSortModule],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl } // Proveedor personalizado
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,AfterViewInit  {
  displayedColumns: string[] = ['usuario_nombrecompleto', 'usuario_email','acciones'];
  //dataSource: Usuario[] = [];
  dataSource = new MatTableDataSource<Usuario>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  nuevoUsuario: Usuario = {
    usuario_nombrecompleto: '',
    usuario_email: '',
    usuario_contrasena: ''
};
 constructor(private http: HttpClient,private dialog: MatDialog) { }
 ngOnInit() {
    this.cargarUsuarios();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Vincular el paginador
    this.dataSource.sort = this.sort;
  }

  abrirDialogoNuevoUsuario() {
  const dialogRef = this.dialog.open(DialogNuevoUsuarioComponent, {
    width: '400px'
  });

  

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {

      const saltRounds = 10; 
      // Aquí puedes enviar el POST con HttpClient
      /*this.http.post<Usuario>('http://localhost:3000/usuarios', resultado).subscribe(() => {
        this.cargarUsuarios();
      });*/
      console.log(resultado);

      bcrypt.hash(resultado.usuario_contrasena, saltRounds).then((hashedPassword) => {
        // Reemplazar la contraseña con la versión encriptada


        if (!resultado.usuario_nombrecompleto) {
          alert('Debe ingresar un nombre.');
           return;
        }

        if (!resultado.usuario_email) {
          alert('Debe ingresar un email.');
           return;
        }

        if (!resultado.usuario_contrasena) {
          alert('Debe ingresar una contraseña.');
           return;
        }
       
        resultado.usuario_contrasena = hashedPassword;

       
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(resultado.usuario_email)) {
          alert('El email ingresado no es válido.');
          return;
        }
    
        // Enviar el objeto completo al servidor
        this.http.post<Usuario>('http://localhost:3000/usuarios', resultado).subscribe((data) => {
          // Agregar el nuevo usuario a la tabla
          this.dataSource.data = [...this.dataSource.data, data];
    
          // Reiniciar el formulario
          this.nuevoUsuario = {
            usuario_nombrecompleto: '',
            usuario_email: '',
            usuario_contrasena: ''
          };
          this.cargarUsuarios();
        });
      }).catch((error) => {
        console.error('Error al encriptar la contraseña:', error);
      });
    }
  });
}




abrirDialogoUsuario(usuario: Usuario) {
  const dialogRef = this.dialog.open(DialogEditarUsuarioComponent, {
    width: '400px',
    data: usuario
  });

  dialogRef.afterClosed().subscribe((resultadoEditado: Usuario) => {
    if (resultadoEditado) {

      const saltRounds = 10;  

      console.log(resultadoEditado);

      bcrypt.hash(resultadoEditado.usuario_contrasena, saltRounds).then((hashedPassword) => {
        // Reemplazar la contraseña con la versión encriptada
        resultadoEditado.usuario_contrasena = hashedPassword;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(usuario.usuario_email)) {
          alert('El email ingresado no es válido.');
          return;
        }
        
        // Lógica para guardar los cambios
        this.http.put(`http://localhost:3000/usuarios/${usuario._id}`, resultadoEditado).subscribe(() => {
          this.cargarUsuarios(); // recarga la tabla
        });
        
      }).catch((error) => {
        console.error('Error al encriptar la contraseña:', error);
      });

      

      
    }
  });
}



  cargarUsuarios() {
      this.http.get<Usuario[]>('http://localhost:3000/usuarios').subscribe((data) => {
        console.log(data);
        //this.dataSource = data;
        this.dataSource.data = data;
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

aplicarFiltro(event: Event) {
  const filtro = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filtro.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage(); // Reinicia la paginación al aplicar un filtro
  }
}
}
