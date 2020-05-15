export class MissingParamError extends Error {
    constructor( paramName: string ) {
        super(`Parametro ${paramName} nao foi passado`)
        this.name = 'Missing Param'
    }
}