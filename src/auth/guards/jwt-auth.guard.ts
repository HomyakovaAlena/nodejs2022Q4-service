import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthInvalidError } from '../errors/auth-invalid.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, payload) {
    if (err || !payload) {
      throw new AuthInvalidError();
    }
    return payload;
  }
}
