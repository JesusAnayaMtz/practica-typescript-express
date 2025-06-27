import { NextFunction, Request, Response } from "express"; //importamos el tipo NextFunction para que nos permita llamar a la siguiente funcion

const auth = (req: Request, res: Response, next: NextFunction) => { //middleware para autenticar al usuario
    const {token} = req.headers; //desestructuramos el token del header
    if(token === "autenticado") next(); //si el token es autenticado llamamos a la siguiente funcion
    else res.status(401).json({message: "No autorizado"}); //si el token no es autenticado retornamos un error 401 y un mensaje de error
}

export default auth;