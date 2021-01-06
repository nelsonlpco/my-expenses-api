import LoginDTO from "src/domain/dtos/auth/LoginDTO";
import ConfigurationManager from "src/infra/configurations/ConfigurationManager";
import jwt from 'jsonwebtoken';
import UserService from "./UserService";

export default class AuthService {

  private readonly _config: ConfigurationManager;
  private readonly _userService: UserService;

  constructor(config: ConfigurationManager, userService: UserService){
    this._config = config;
    this._userService = userService;
  }

  async signAccessToken(login: LoginDTO): Promise<string> {

    const user = await this._userService.getUserByEmail(login.user);

    if(!user){
      throw new Error('Usuário não encontrado!');
    }

    if(!user.validatePassword(login.password)){
      throw new Error('Usuário ou senha incorreto!');
    }

    const payload = { }
    const options = {
      expiresIn: '1h',
      issuer: 'nelson@gmail.com',
      audience: user._id,
    };

    return await this._generateToken(login, options, payload);
  }

  async signRefreshToken(login: LoginDTO): Promise<string> {
    const payload = { }
    const options = {
      expiresIn: '1h',
      issuer: 'nelson@gmail.com',
      audience: user._id,
    };

    return await this._generateToken(login, options, payload);
  }

  private _generateToken(login: LoginDTO, options: jwt.SignOptions, payload: string | object | Buffer): Promise<string> {
    return new Promise( (resolve, reject) => {
      jwt.sign(payload, this._config.accessTokenSecrete, options, (error, token) => {
        console.log(error, token)
        if(error){
          reject(error.message);
        }
        else
          resolve(token!);
      });
    });
  }
}
