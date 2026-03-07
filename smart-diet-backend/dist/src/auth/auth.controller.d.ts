import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { SignupDto } from './dto/signup.dto';
import { UpdateUserPreferencesDto } from './dto/update-preferences.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto): Promise<{
        id: string;
        email: string;
        nickname: string;
        goalCalories: number;
        createdAt: Date;
        activityLevel: string | null;
        willpowerScore: number;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    getProfile(req: any): {
        message: string;
        user: UserResponseDto;
    };
    updatePreferences(req: any, updateDto: UpdateUserPreferencesDto): Promise<{
        message: string;
        user: UserResponseDto;
    }>;
}
