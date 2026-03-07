import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UpdateUserPreferencesDto } from './dto/update-preferences.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        id: string;
        email: string;
        nickname: string;
        activityLevel: string | null;
        goalCalories: number;
        willpowerScore: number;
        createdAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    updateUserPreferences(userId: string, dto: UpdateUserPreferencesDto): Promise<{
        id: string;
        email: string;
        nickname: string;
        activityLevel: string | null;
        goalCalories: number;
        willpowerScore: number;
        createdAt: Date;
    }>;
}
