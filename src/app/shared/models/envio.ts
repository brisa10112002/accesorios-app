export interface Provincia {
  id: string;
  nombre: string;
}

export interface Localidad {
  id: string;
  nombre: string;
}

export interface DatosEnvio {
  nombre: string;
  direccion: string;
  provincia: string;
  localidad: string;
  codigoPostal: string;
}
