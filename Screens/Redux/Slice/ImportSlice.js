import {createSlice} from '@reduxjs/toolkit';

import * as importsApi from '../api/importsApi';

const DELAY = 500;

const importsSlice = createSlice({
  initialState: {
    error: null,
    posts: null,
    isPostsLoading: false,
    isListLoading: true,
  },
  name: 'imports',
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setIsPostsLoading: (state, action) => {
      state.isPostsLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsListLoading: (state, action) => {
      state.isListLoading = action.payload;
    },
    appendAcademicYear: (state, action) => {
      state.academicYears = [action.payload, ...state.academicYears];
    },
    editAcademicYear(state, action) {
      const academicYearIndex = state.academicYears.findIndex(
        item => item.oay_id_orgacadyear === action.payload.oay_id_orgacadyear,
      );
      state.academicYears[academicYearIndex] = action.payload;
    },
    removeAcademicYearById: (state, action) => {
      state.academicYears = state.academicYears.filter(
        academicYear => academicYear.oay_id_orgacadyear !== action.payload,
      );
    },
  },
});

export const {
  setPosts,
  setIsPostsLoading,
  setError,
  setDepartmentsList,
  setIsListLoading,
  appendAcademicYear,
  editAcademicYear,
  removeAcademicYearById,
} = importsSlice.actions;

export const getAllPosts = () => async dispatch => {
  dispatch(setIsListLoading(true));
  try {
    const resp = await importsApi.fetchAllPost();
    dispatch(setIsListLoading(false));
    dispatch(setPosts(resp.data || []));
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || 'Something went wrong.'),
    );
  } finally {
    dispatch(setIsListLoading(false));
  }
};
export const addAcademicYear = (data, callback) => async dispatch => {
  dispatch(setIsAcademicYearsLoading(true));
  try {
    const response = await academicYearsApi.addAcademicYear(data);
    if (response.data?.academicYear) {
      dispatch(appendAcademicYear(response.data?.academicYear));

      if (callback) {
        callback();
      }
    }
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || 'Something went wrong.'),
    );
  } finally {
    setTimeout(() => {
      dispatch(setIsAcademicYearsLoading(false));
    }, DELAY);
  }
};

export const updateAcademicYear =
  (academicYearId, data, callback) => async dispatch => {
    dispatch(setIsAcademicYearsLoading(true));
    try {
      const response = await academicYearsApi.editAcademicYear(
        academicYearId,
        data,
      );
      if (response.data?.academicYear) {
        dispatch(editAcademicYear(response.data?.academicYear));

        if (callback) {
          callback();
        }
      }
    } catch (error) {
      dispatch(
        setError(error?.response?.data?.message || 'Something went wrong.'),
      );
    } finally {
      setTimeout(() => {
        dispatch(setIsAcademicYearsLoading(false));
      }, DELAY);
    }
  };

export const deleteAcademicYear =
  (academicYearId, callback) => async dispatch => {
    dispatch(setIsAcademicYearsLoading(true));

    try {
      const resp = await academicYearsApi.deleteAcademicYear(academicYearId);
      dispatch(setIsAcademicYearsLoading(false));
      dispatch(removeAcademicYearById(resp.data.orgAllAcademicYear));
      if (callback) {
        callback();
      }
    } catch (error) {
      dispatch(
        setError(error?.response?.data?.message || 'Something went wrong.'),
      );
    } finally {
      setTimeout(() => {
        dispatch(setIsAcademicYearsLoading(false));
      }, DELAY);
    }
  };

export const importsSelector = state => state.imports;

export default importsSlice.reducer;
