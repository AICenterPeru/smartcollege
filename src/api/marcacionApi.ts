import axiosClient from "./axiosClient";

export interface TipoMarcacion {
  tipoMarcacionId: number;
  descripcion: string;
}


export interface RegistrarMarcacionRequest {
  institucionId: number;
  alumnoId: number;
  tipoMarcacionId: number;
  tipoRegistro: number; 
}

export interface AlumnoInfo {
  nombreCompleto: string;
  nombreAlumnoCorto: string;
  idsApoderado: number[];
  apoderados: string[];
}

export interface RegistrarMarcacionResponse {
  mensaje: string;
  alumno: AlumnoInfo | null; 
  error?: boolean;    
}

export interface Marcacion {
  marcacionId: number;
  matriculaId: number;
  fecha: string; 
  horaIngreso: string;
  horaSalida: string; 
  tardanza: number;
}

export const marcacionApi = {
  obtenerTipos: async (): Promise<TipoMarcacion[]> => {
    const response = await axiosClient.get("/Marcacion/ObtenerTipoMarcacion");
    return response.data;
  },


  registrar: async (
    data: RegistrarMarcacionRequest
  ): Promise<RegistrarMarcacionResponse> => {
    try {
      const response = await axiosClient.post("/Marcacion/RegistrarMarcacion", data);
      return {
        mensaje: response.data.mensaje,
        alumno: response.data.alumno,
        error: false  
      };
    } catch (error: any) {
      const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Error al registrar marcación";

      return {
        mensaje: message,
        alumno: null,
        error: true,
      };
    }
  },

  obtenerMarcacionesDelDia: async (
    institucionId: number
  ): Promise<Marcacion[]> => {
    const response = await axiosClient.get("/Marcacion/ObtenerMarcacionesDelDia", {
      params: { institucionId },
    });
    return response.data;
  },
};