export interface ResetPasswordToken {
    id: string;
    email: string;
    newPassword: string;
    token: string;
    exp: number;
    createdAt: Date;
    updatedAt: Date;
}
