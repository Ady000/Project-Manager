import React, { useState } from 'react';
import axios from 'axios';
import './ProjectManager.css'; // Optional: For custom styles

const ProjectManager = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim()) {
            alert('Please enter a question');
            return;
        }

        setLoading(true);
        setResponse('');

        try {
            const result = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/ask`,
                { question },
                { headers: { 'Content-Type': 'application/json' } }
            );

            setResponse(result.data.reply);
        } catch (error) {
            console.error('Error:', error);
            setResponse('Failed to get a response. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="project-manager-container">
            <h1>Project Manager Assistant</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Ask the project manager something..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows="5"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Ask'}
                </button>
            </form>
            {response && (
                <div className="response-box">
                    <h2>Response:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default ProjectManager;
