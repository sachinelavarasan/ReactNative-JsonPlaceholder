import {createSlice} from '@reduxjs/toolkit';

import * as exportsApi from '../api/exportsApi';

const DELAY = 500;

const exportsSlice = createSlice({
  initialState: {
    error: null,
    posts: null,
    isPostsLoading: false,
    isListLoading: true,
  },
  name: 'exports',
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
} = exportsSlice.actions;

export const getAllPosts = () => async dispatch => {
  dispatch(setIsListLoading(true));
  try {
    const resp = await exportsApi.fetchAllPost();
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
    const response = await exportsApi.addAcademicYear(data);
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
      const response = await exportsApi.editAcademicYear(academicYearId, data);
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
      const resp = await exportsApi.deleteAcademicYear(academicYearId);
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

export const exportsSelector = state => state.exports;

export default exportsSlice.reducer;
