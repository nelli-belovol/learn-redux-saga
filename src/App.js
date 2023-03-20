import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLatestNews } from './redux/actions/actionsCreator';
import News from './components/news/news';

const App = () => {
  const dispatch = useDispatch();
  const latestNews = useSelector((state) => state.news?.latestNews || []);
  const popularNews = useSelector((state) => state.news?.popularNews || []);

  const handleNews = () => {
    dispatch(getLatestNews());
  };

  return (
    <div>
      <button onClick={handleNews}>Get News</button>
      <News news={latestNews} title='Latest News' />
      <News news={popularNews} title='Popular News' />
    </div>
  );
};

export default App;
