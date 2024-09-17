import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { compareSync as bcryptCompareSync } from "bcrypt";
import { AuthResponseDto } from "./auth.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;
    private jwtExpirationExtendedTimeInSeconds: number;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME');
        this.jwtExpirationExtendedTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME_EXTENDED');
    }

    async signIn(email: string, password: string, stayLoggedIn: boolean): Promise<AuthResponseDto> {
        const foundUser = await this.usersService.findByEmail(email)
        
        if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: foundUser.id, email : foundUser.email, name: foundUser.name, isAdmin: foundUser.isAdmin};

        const expiresIn = stayLoggedIn 
            ? this.jwtExpirationExtendedTimeInSeconds
            : this.jwtExpirationTimeInSeconds;

        const token = this.jwtService.sign(payload, { expiresIn });

        return { token, expiresIn };
    }
}