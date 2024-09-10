import { getFilteredData } from '@/db/filter';
import MainContent from './components/MainContent';

export default async function Search() {
  const data = await getFilteredData({ page: 1 });

  return (
    <main>
      <h1>Atacana Group</h1>
      <h2>Search for Pharma Trials</h2>
      <MainContent initialData={data} />
    </main>
  );
}
