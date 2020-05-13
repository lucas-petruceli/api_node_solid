import { HttpRequest, HttpResponse} from './httpInterface'

export interface Controller {
    handle(httpRequest: HttpRequest): HttpResponse 
}