import {configureStore} from '@reduxjs/toolkit';
import importsReducer from './Slice/ImportSlice';
import exportsReducer from './Slice/ExportSlice';
import authReducer from './Slice/AuthSlice';

export default configureStore({
  reducer: {
    imports: importsReducer,
    exports: exportsReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
