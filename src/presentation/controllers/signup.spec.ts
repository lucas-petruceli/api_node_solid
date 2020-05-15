import { SignUpController } from './signup'
import { MissingParamError } from '../error/missingParamError'
import { InvalidParamError } from '../error/invalidParamError'
import { EmailValidator } from '../protocols/emailValidatorInterface'

interface SutTypes {
	sut: SignUpController,
	emailvalidatorStub: EmailValidator
}

const makeSut = () : SutTypes => {
	class EmailvalidatorStub implements EmailValidator { //Stub é um tipo de Mock (spai, stub , fake)
		isValid (email: string): boolean {
			return true
		}
	}

	const emailvalidatorStub = new EmailvalidatorStub()
	const sut = new SignUpController( emailvalidatorStub )

	return {
		sut,
		emailvalidatorStub
	}
}

describe('SignUp Controller', () => {
  test('Return statusCode 400, se nao passar o nome para rota', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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

  test('Return statusCode 400, se email nao for valido', () => {
	const { sut , emailvalidatorStub} = makeSut()
	jest.spyOn(emailvalidatorStub, 'isValid').mockReturnValueOnce(false)
	
    const httpRequest = {
		body: {
			name: 'any_name',
			email: 'any_name@mail.com',
			password: 'any_password',
			passwordConfirmation: 'any_password'
		}
	}
	const httpResponse = sut.handle(httpRequest)
	expect(httpResponse.statusCode).toBe(400)
	expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})