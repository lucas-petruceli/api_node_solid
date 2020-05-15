export class InvalidParamError extends Error {
    constructor( paramName: string ) {
        super(`Parametro ${paramName} invalido`)
        this.name = 'Invalid Param'
    }
}