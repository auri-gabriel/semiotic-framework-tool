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
      <div class='container py-4 px-3 mx-auto'>
        <h1>Hello, Bootstrap and Vite!</h1>
        <button class='btn btn-primary'>Primary button</button>
      </div>
      <pre>{JSON.stringify(semioticLadderGrouping, null, 2)}</pre>
    </div>
  );
}

export default App;
