import { Navigate, Route, Routes } from 'react-router-dom';
import { CourseLayout } from '../shared/layout/CourseLayout';
import { LessonOnePage } from '../modules/aula-1/pages/LessonOnePage';
import { SetupPage } from '../modules/setup/pages/SetupPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<CourseLayout />}>
        <Route index element={<Navigate to="/lesson-1" replace />} />
        <Route path="/lesson-1" element={<LessonOnePage />} />
        <Route path="/setup" element={<SetupPage />} />
      </Route>
    </Routes>
  );
}
