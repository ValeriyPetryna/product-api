import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class SequelizeUniqueConstraintInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          throw new HttpException(
            `'${error.errors[0].path}' must be unique`,
            HttpStatus.CONFLICT,
          );
        } else {
          throw error;
        }
      }),
    );
  }
}
