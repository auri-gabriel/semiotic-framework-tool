import {useEffect, useState} from 'react'
import {getQuestionsGroupedBySemiotics, readQuestions, readTags} from './data/XmlReader'

function App() {
    const [questions, setQuestions] = useState({});
    const [tags, setTags] = useState({});
    const [loading, setLoading] = useState(true);
    const [semioticLadderGrouping, setSemioticLadderGrouping] = useState({});

    useEffect(() => {
        async function fetchData() {
            const questions = await readQuestions();
            setQuestions(questions)

            const tags = await readTags();

            setTags(tags);

            const semioticLadderGroupingData = await getQuestionsGroupedBySemiotics();

            setLoading(false)
            setSemioticLadderGrouping(semioticLadderGroupingData);
        }
        fetchData()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            {/* <pre> */}
            {/* questions: {JSON.stringify(questions, null, 2)} */}
            {/* </pre> */}
            {/* <pre> */}
            {/* tags: {JSON.stringify(tags, null, 2)} */}
            {/* </pre> */}
            <pre>
                {JSON.stringify(semioticLadderGrouping, null, 2)}
            </pre>
        </div>
    )
}

export default App
