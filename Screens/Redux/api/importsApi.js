import axios from './index';

export const fetchAllPost = () => axios.get('posts');

export const addAcademicYear = data =>
  axios.post('api/admin/org/academicyear/addAcademicYear', data);

export const editAcademicYear = (academicYearId, data) =>
  axios.patch(`api/admin/org/academicyear/${academicYearId}`, data);

export const deleteAcademicYear = academicYearId =>
  axios.delete(`api/admin/org/academicyear/${academicYearId}`);
