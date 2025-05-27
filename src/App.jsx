import { useEffect, useState } from 'react'
import { readQuestionsAndLevels } from './data/XmlReader'

function App() {
  const [groupedQuestions, setGroupedQuestions] = useState({})
  const [levels, setLevels] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { levels, groupedQuestions } = await readQuestionsAndLevels()
      setLevels(levels)
      setGroupedQuestions(groupedQuestions)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Questions Grouped by Level</h1>
      {Object.entries(groupedQuestions).map(([levelId, questions]) => (
        <div key={levelId} style={{ marginBottom: '2em' }}>
          <h2>{levels[levelId] || levelId}</h2>
          <ul>
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default App