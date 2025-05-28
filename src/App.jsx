import {useEffect, useState} from 'react'
import {readQuestionsAndLevels} from './data/XmlReader'

function App() {
    const [questionsByLevel, setQuestionsByLevel] = useState({})
    const [levels, setLevels] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const {levels, questions} = await readQuestionsAndLevels()
            setLevels(levels)
            // Group questions by level
            const grouped = {}
            questions.forEach(q => {
                if (!grouped[q.level]) grouped[q.level] = []
                grouped[q.level].push(q)
            })
            setQuestionsByLevel(grouped)
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            {Object.entries(questionsByLevel).map(([levelId, questions]) => (
                <div key={levelId}>
                    <h2>{levels[levelId]?.name || levelId}</h2>
                    <ul>
                        {questions.map(q => (
                            <li key={q.text}>{q.text}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default App
