import { Navigate, Route, Routes } from 'react-router-dom';
import { CourseLayout } from '../shared/layout/CourseLayout';
import { TopicPage } from '../features/topic-page/TopicPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<CourseLayout />}>
        <Route index element={<Navigate to="/what-is-ai" replace />} />
        <Route path="/:topicId" element={<TopicPage />} />
      </Route>
    </Routes>
  );
}
