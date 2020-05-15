import { SignUpController } from './signup'
import { MissingParamError } from '../error/missingParamError'

const makeSut = () : SignUpController => {
	return new SignUpController()
}

describe('SignUp Controller', () => {
  test('Return statusCode 400, se nao passar o nome para rota', () => {
    const sut = makeSut()
    const httpRequest = {
		body: {
			email: 'any_email@mail.com',
			password: 'any_password',
			passwordConfirmation: 'any_password'
		}
	}
	const httpResponse = sut.handle(httpRequest)
	expect(httpResponse.statusCode).toBe(400)
	expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  
  test('Return statusCode 400, se nao passar o email para rota', () => {
    const sut = makeSut()
    const httpRequest = {
		body: {
			name: 'any_name',
			password: 'any_password',
			passwordConfirmation: 'any_password'
		}
	}
	const httpResponse = sut.handle(httpRequest)
	expect(httpResponse.statusCode).toBe(400)
	expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})