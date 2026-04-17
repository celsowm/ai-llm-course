import { Box } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nProvider';
import { ExportSlide } from '../../shared/components/ExportSlide';
import { SlideDeck } from '../../shared/components/SlideDeck';
import { getTopics } from '../../shared/content/topics';

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const { locale } = useI18n();
  const navigate = useNavigate();
  const topics = getTopics(locale);

  const currentIndex = topics.findIndex((t) => t.path === `/${topicId}`);

  if (currentIndex === -1) {
    return <Navigate to={topics[0].path} replace />;
  }

  return (
    <SlideDeck
      activeStep={currentIndex}
      onPrev={currentIndex > 0 ? () => navigate(topics[currentIndex - 1].path) : undefined}
      onNext={currentIndex < topics.length - 1 ? () => navigate(topics[currentIndex + 1].path) : undefined}
    >
      {topics.map((topic) => (
        <ExportSlide key={topic.id} title={topic.title}>
          <Box sx={{ height: '100%', width: '100%' }}>
            {topic.render()}
          </Box>
        </ExportSlide>
      ))}
    </SlideDeck>
  );
}
