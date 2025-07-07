import "dotenv/config";

//aqui estamos exportando el puerto que viene de las variables de entorno 
export const PORT = process.env.PORT || 3000;