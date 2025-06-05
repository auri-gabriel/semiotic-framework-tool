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
            setQuestionsByLevel(questions)
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            questionsByLevel: {JSON.stringify(questionsByLevel)}
        </div>
    )
}

export default App
