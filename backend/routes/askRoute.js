const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to handle project manager questions
router.post('/', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).send({ error: 'Question is required' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a project manager assistant.' },
                    { role: 'user', content: question }
                ],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const reply = response.data.choices[0].message.content;
        res.send({ reply });
    } catch (error) {
        console.error('Error calling OpenAI API:', error.message);
        res.status(500).send({ error: 'Failed to fetch response from GPT API' });
    }
});

module.exports = router;
