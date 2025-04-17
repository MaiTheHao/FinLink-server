"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMessages = exports.GeneralErrorMessages = exports.EmailErrorMessages = exports.TokenMessages = exports.PasswordMessages = exports.EmailVerificationMessages = exports.RegistrationMessages = exports.LoginMessages = exports.UserValidationMessages = exports.AuthValidationMessages = void 0;
exports.AuthValidationMessages = {
    EMAIL_REQUIRED: 'Email không được để trống',
    EMAIL_VALID: 'Email không hợp lệ',
    PASSWORD_REQUIRED: 'Mật khẩu không được để trống',
    PASSWORD_STRING: 'Mật khẩu phải là chuỗi',
    PASSWORD_LENGTH: 'Mật khẩu phải có ít nhất 8 ký tự',
    PASSWORD_PATTERN: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số hoặc ký tự đặc biệt',
    PASSWORD_CONFIRM_REQUIRED: 'Xác nhận mật khẩu không được để trống',
    PASSWORD_NOT_MATCH: 'Mật khẩu và xác nhận mật khẩu không khớp',
};
exports.UserValidationMessages = {
    USERNAME_REQUIRED: 'Tên người dùng không được để trống',
    USERNAME_STRING: 'Tên người dùng phải là chuỗi',
    USERNAME_LENGTH: 'Tên người dùng phải có ít nhất 3 ký tự',
    USER_NOT_FOUND: 'Không tìm thấy người dùng',
};
exports.LoginMessages = {
    LOGIN_SUCCESS: 'Đăng nhập thành công',
    LOGIN_FAILED: 'Đăng nhập thất bại',
};
exports.RegistrationMessages = {
    REGISTER_SUCCESS: 'Đăng ký thành công',
    EMAIL_EXISTS: 'Email đã tồn tại',
};
exports.EmailVerificationMessages = {
    EMAIL_VERIFICATION_SENT: 'Email xác thực đã được gửi',
    EMAIL_VERIFIED: 'Email đã được xác thực thành công',
    EMAIL_ALREADY_VERIFIED: 'Email đã được xác thực trước đó',
    EMAIL_VERIFICATION_EXPIRED: 'Mã xác thực email đã hết hạn',
    EMAIL_VERIFICATION_INVALID: 'Mã xác thực email không hợp lệ',
    EMAIL_VERIFICATION_NOT_FOUND: 'Không tìm thấy yêu cầu xác thực email',
};
exports.PasswordMessages = {
    PASSWORD_RESET_SENT: 'Email đặt lại mật khẩu đã được gửi',
    PASSWORD_RESET_SUCCESS: 'Đặt lại mật khẩu thành công',
    PASSWORD_RESET_EXPIRED: 'Mã đặt lại mật khẩu đã hết hạn',
    PASSWORD_RESET_INVALID: 'Mã đặt lại mật khẩu không hợp lệ',
    PASSWORD_RESET_NOT_FOUND: 'Không tìm thấy yêu cầu đặt lại mật khẩu',
    PASSWORD_OLD_REQUIRED: 'Mật khẩu hiện tại không được để trống',
    PASSWORD_OLD_STRING: 'Mật khẩu hiện tại phải là chuỗi',
    PASSWORD_NEW_REQUIRED: 'Mật khẩu mới không được để trống',
    PASSWORD_NEW_STRING: 'Mật khẩu mới phải là chuỗi',
    PASSWORD_CONFIRM_REQUIRED: 'Xác nhận mật khẩu không được để trống',
    PASSWORD_NEW_LENGTH: 'Mật khẩu mới phải có ít nhất 8 ký tự',
    PASSWORD_NEW_PATTERN: 'Mật khẩu mới phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số hoặc ký tự đặc biệt',
    PASSWORD_CONFIRM_STRING: 'Xác nhận mật khẩu phải là chuỗi',
    PASSWORD_NOT_MATCH: 'Mật khẩu mới và xác nhận mật khẩu không khớp',
    PASSWORD_SAME_AS_OLD: 'Mật khẩu mới không được trùng với mật khẩu cũ',
    PASSWORD_INCORRECT: 'Mật khẩu hiện tại không chính xác',
    PASSWORD_CHANGE_SUCCESS: 'Đổi mật khẩu thành công',
};
exports.TokenMessages = {
    TOKEN_REQUIRED: 'Token không được để trống',
    TOKEN_STRING: 'Token phải là chuỗi',
    TOKEN_INVALID: 'Token không hợp lệ hoặc đã hết hạn',
};
exports.EmailErrorMessages = {
    EMAIL_SEND_FAILED: 'Không thể gửi email',
    EMAIL_CONFIG_ERROR: 'Lỗi cấu hình email',
};
exports.GeneralErrorMessages = {
    INTERNAL_SERVER_ERROR: 'Lỗi máy chủ nội bộ',
    UNAUTHORIZED: 'Không có quyền truy cập',
    FORBIDDEN: 'Truy cập bị từ chối',
};
exports.ValidationMessages = {
    ...exports.AuthValidationMessages,
    ...exports.UserValidationMessages,
    ...exports.LoginMessages,
    ...exports.RegistrationMessages,
    ...exports.EmailVerificationMessages,
    ...exports.PasswordMessages,
    ...exports.TokenMessages,
    ...exports.EmailErrorMessages,
    ...exports.GeneralErrorMessages,
};
//# sourceMappingURL=validation-messages.constant.js.map