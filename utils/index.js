import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email address.')
    .required('Enter your email address.'),
  password: yup.string().required('Enter your password.'),
});

export const otpcodeSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email address.')
    .required('Enter your email address.'),
  otpcode: yup
    .number()
    .typeError('Enter only numeric digits')
    .min(2)
    .required('Enter your OTP.'),
});

export const registerSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email address.')
    .required('Enter your email address.'),
  name: yup
    .string()
    .required('Enter your full name.')
    .max(50, 'Full name must not be longer than 50 characters.'),
  password: yup
    .string()
    .min(8, 'Password must be atleast 8 characters long.')
    .max(20, 'Password must not be longer than 20 characters.')
    .required('Enter a password.'),
});
