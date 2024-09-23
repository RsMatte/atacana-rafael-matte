import { getTrials } from '@/db/get';
import MainContent from './components/MainContent';
import Header from './components/Header';

export default async function Search() {
  const data = await getTrials({ page: 1 });

  return (
    <main>
      <Header />
      <h1 data-testid="page-h1">Browse Pharma Trials</h1>
      <MainContent initialData={data} />
    </main>
  );
}
