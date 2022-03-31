import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { User } from "@modules/accounts/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUsersDTO): Promise<void> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
