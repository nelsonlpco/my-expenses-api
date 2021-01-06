import {Request, Response} from 'express';
import { POST, route } from "awilix-express";
import LoginDTO from 'src/domain/dtos/auth/LoginDTO';
import AuthService from 'src/services/AuthService';

@route('/api/auth')
export default class AuthController {
  private readonly _authService: AuthService;

  constructor(authService: AuthService){
    this._authService = authService;
  }

  @POST()
  async login(req: Request<LoginDTO>, resp: Response) {
    const token = await this._authService.signAccessToken(req.body);

    if(!token){
      resp.status(404);
    }else {
      resp.status(200).json({token});
    }
  }
}
