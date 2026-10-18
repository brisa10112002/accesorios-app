export interface Usuario {
  nombre: string;
  rol: 'admin' | 'cliente';
}

export interface UsuarioRegistrado {
  id: string;
  nombre: string;
  usuario: string;
  contrasena: string;
  pregunta: string;
  respuesta: string;
  rol: 'admin' | 'cliente';
}
