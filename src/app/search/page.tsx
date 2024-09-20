import { getTrials } from '@/db/get';
import MainContent from './components/MainContent';
import Header from './components/Header';

export default async function Search() {
  const data = await getTrials({ page: 1 });

  return (
    <main>
      <Header />
      <h1>Atacana Group</h1>
      <h2>Search for Pharma Trials</h2>
      <MainContent initialData={data} />
    </main>
  );
}
