import { useEffect, useState } from 'react';
import { getQuestionsGroupedBySemiotics } from './business/SemioticLadderManager';

function App() {
  const [loading, setLoading] = useState(true);
  const [semioticLadderGrouping, setSemioticLadderGrouping] = useState({});

  useEffect(() => {
    async function fetchData() {
      const semioticLadderGroupingData = await getQuestionsGroupedBySemiotics();

      setLoading(false);
      setSemioticLadderGrouping(semioticLadderGroupingData);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <pre>{JSON.stringify(semioticLadderGrouping, null, 2)}</pre>
    </div>
  );
}

export default App;
