import axios from './index';

export const signUp = data => axios.post('users/signup', data);

export const signIn = data => axios.post('users/login', data);

export const verifyCode = data => axios.post('users/verify-code', data);

export const addAcademicYear = data =>
  axios.post('api/admin/org/academicyear/addAcademicYear', data);

export const editAcademicYear = (academicYearId, data) =>
  axios.patch(`api/admin/org/academicyear/${academicYearId}`, data);

export const deleteAcademicYear = academicYearId =>
  axios.delete(`api/admin/org/academicyear/${academicYearId}`);
