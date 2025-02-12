import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// DTO para padronizar todas as respostas da API
export class BaseResponseDto<T> {
  status: 'success' | 'error';
  statusCode: number;
  message: string[];
  data?: T;
  errors?: Record<string, string> | string[] | null; // Melhor tipagem para erros

  constructor(
    status: 'success' | 'error',
    statusCode: number,
    message: string | string[],
    data?: T,
    errors?: Record<string, string> | string[] | null
  ) {
    this.status = status;
    this.statusCode = statusCode;
    // Garante que a mensagem sempre será um array
    this.message = Array.isArray(message) ? message : [message];
    this.data = data;
    this.errors = errors;
  }
}

@Injectable()
export class ResponseMiddleware<T> implements NestInterceptor<T, BaseResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<BaseResponseDto<T>> {
    const response = context.switchToHttp().getResponse(); // Obtem o objeto de resposta HTTP

    return next.handle().pipe(
      // Sucesso
      map((data) => {
        const statusCode = response.statusCode || HttpStatus.OK; // Usa o statusCode da resposta ou 200 como padrão
        return new BaseResponseDto<T>('success', statusCode, ['Request successful'], data);
      }),
      // Tratamento de erros
      catchError((error) => {
        let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string[] = ['Internal server error'];
        let errors: Record<string, string> | string[] | null = null;

        if (error instanceof HttpException) {
          statusCode = error.getStatus();
          const response = error.getResponse();

          // Verifica se a resposta é um objeto estruturado ou uma string
          if (typeof response === 'object' && response !== null) {
            const responseObj = response as {
              message?: string | string[];
              errors?: Record<string, string>;
            };

            // Garante que message seja sempre um array
            message = Array.isArray(responseObj.message)
              ? responseObj.message
              : [responseObj.message || 'Request failed'];

            // Preenche os erros caso estejam disponíveis
            errors = responseObj.errors || null;
          } else {
            message = [response];
          }
        }

        // Lança uma nova exceção com o formato padronizado
        throw new HttpException(new BaseResponseDto<null>('error', statusCode, message, null, errors), statusCode);
      })
    );
  }
}
