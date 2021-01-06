import bcrypt from 'bcrypt';
import CreateUserDTO from "src/domain/dtos/users/CreateUserDTO";
import User from "src/domain/entities/User";
import UserRepository from "src/infra/database/repositories/UserRepository";

export default class UserService {
  private readonly _userRepository: UserRepository;

  constructor(userRepository: UserRepository){
     this._userRepository = userRepository;
  }


  async getUsers(): Promise<User[]> {
    try {
      const userDocuments  = await this._userRepository.find();

      return userDocuments.map(document => {
        const user = new User();
        user.fromDocument(document);
        return user;
      })

    }catch(error) {
      console.log('Erro ao carregar usuários', error.message);
    }

    return [];
  }

  async getUserByEmail(email: string): Promise<User>{
    try {
      const userDocument = await this._userRepository.find({email});
      const user = new User();
      user.fromDocument(userDocument[0]);

      return user;
    }catch(error) {
      throw new Error('Usuário não existe');
    }
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = new User();
    user.populate('', createUserDTO.name, createUserDTO.email, createUserDTO.password);

    if(!user.isValid()){
      const errors = user.getErrors();
      throw new Error(errors.join(';'));
    }

    const sameUser = await this._userRepository.find({email: createUserDTO.email});

    if(sameUser.length) {
      throw new Error("Usuário já cadastrado");
    }

    await user.protectedPassword();

    const id = await this._userRepository.create(user.toDocument());

    user._id = id;
    return user;
  }

}
