import { HttpRequest , HttpResponse } from '../protocols/httpInterface'
import { MissingParamError } from '../error/missingParamError'
import { Controller } from '../protocols/controllerInterface'
import { EmailValidator } from '../protocols/emailValidatorInterface'
import { InvalidParamError } from '../error/invalidParamError'

export class SignUpController implements Controller{
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator){
        this.emailValidator = emailValidator
    }
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
        for (const field of requiredFields){
            if(!httpRequest.body[field]){
                return {
                    statusCode: 400,
                    body: new MissingParamError(field)
                }
            }
        }

        if(!this.emailValidator.isValid(httpRequest.body.email)){
            return {
                statusCode: 400,
                body: new InvalidParamError('email')
            }
        }
        
    }
}