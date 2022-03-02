import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: { name: string; email: string };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    /* todo
    // usuário existe
    // validar a senha
    // gerar o jwt
    */

    // usuário existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("E-mail or password incorrect");
    }

    // validar a senha

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("E-mail or password incorrect");
    }

    // gerar o jwt

    const token = sign({}, "05734c87d9e8a2135f9879ff9e4b6918", {
      subject: user.id,
      expiresIn: "1d",
    });

    delete user.password;

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
