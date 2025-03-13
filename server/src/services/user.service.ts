import { UserSigninDTO, UserSignupDTO } from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import { comparePassword, encryptPassword } from '../utils/password';
import jwt from 'jsonwebtoken';

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

    async userSignin(data: UserSigninDTO): Promise<Record<string, string>> {
        const { email,password } = data;
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found')
        }
        const checkPassword = await comparePassword(password,user.password);
        if (!checkPassword) {
            throw new Error('Incorrect password')
        }
        const token = jwt.sign({ id:user.id },process.env.JWT_SECRET);

        return { token };
    }
}

export const userService = new UserService();
