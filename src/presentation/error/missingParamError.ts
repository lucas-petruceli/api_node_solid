export class MissingParamError extends Error {
    constructor( paramName: string ) {
        super(`Parametro ${paramName} invalido`)
        this.name = 'Parametro Invalido'
    }

}