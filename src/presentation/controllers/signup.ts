import { HttpRequest , HttpResponse } from '../protocols/httpInterface'
import { MissingParamError } from '../error/missingParamError'
import { Controller } from '../protocols/controllerInterface'

export class SignUpController implements Controller{
    handle(httpRequest: HttpRequest): HttpResponse {
        if (!httpRequest.body.name) {
            return {
                statusCode: 400,
                body: new MissingParamError('name')
            }
        }
        if (!httpRequest.body.email) {
            return {
                statusCode: 400,
                body: new MissingParamError('email')
            }
        }
    }
}