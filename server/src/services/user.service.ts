import { UserSignupDTO } from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import { encryptPassword } from '../utils/password';

export class UserService {
  async userSignup(data: UserSignupDTO): Promise<void> {
    const { email, password, username } = data;
    const hashedPassword = await encryptPassword(password);
    const existingEmail = await UserModel.findOne({ email });
    const existingUsername = await UserModel.findOne({ username });
    if (existingEmail) {
      throw new Error('Email is already in use');
    }
    if (existingUsername) {
      throw new Error('Already existing username');
    }

    const user = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });

    if (!user) {
      throw new Error('Error in creating user. Please try again');
    }
    return;
  }
}

export const userService = new UserService();
