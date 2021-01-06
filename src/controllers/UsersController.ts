import {Request, Response} from 'express';
import { GET, POST, route } from "awilix-express";
import ShowUserDTO from "src/domain/dtos/users/ShowUserDTO";
import UserService from "src/services/UserService";
import UserDTO from 'src/domain/dtos/users/UserDTO';

@route('/api/users')
export default class UsersController {
  private readonly _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  @GET()
  async getUsers(_req: Request, resp: Response){
    const users = await this._userService.getUsers();
    const usersDTO = users.map(user => new ShowUserDTO(user._id, user.name));

    resp.status(200).json({users: usersDTO});
  }

  @POST()
  async createUser(req: Request<UserDTO>, resp: Response): Promise<ShowUserDTO> {
    const user = await this._userService.createUser(req.body);
    return new ShowUserDTO(user._id, user.name);
  }

}
