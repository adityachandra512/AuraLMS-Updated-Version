
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Configure CORS properly
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'OPTIONS'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Add OPTIONS handler for preflight
app.options('/generateQuiz', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

// Your existing POST endpoint
app.post('/generateQuiz', async (req, res) => {
  const { topic } = req.body;
  
  // Validate input
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required.' });
  }

  const questionsCount = 10;

  // Build the structured request
  const requestData = {
    contents: [
      {
        parts: [{ text: `Generate a quiz with ${questionsCount} questions about "${topic}". 
Each question should be formatted as JSON with the following keys: 
"question": a string containing the quiz question, 
"options": an array of 4 strings (possible answers), and 
"correctAnswer": a string with the correct answer.
Output the quiz as a JSON array of questions.` }]
      }
    ]
  };

  try {
    const GEMINI_API_KEY = 'AIzaSyCfY7cI6qLLlwsxHWRh6t3drtaK1_jyP7s';

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    // Extract and clean up the response
    const responseData = geminiResponse.data;

    if (!responseData.candidates || responseData.candidates.length === 0) {
      return res.status(500).json({ error: 'Invalid response from Gemini API' });
    }

    // Extract text content
    let quizText = responseData.candidates[0].content.parts[0].text;

    // Remove markdown formatting (backticks and "json" labels)
    quizText = quizText.replace(/```json|```/g, '').trim();

    try {
      const quiz = JSON.parse(quizText);
      res.json(quiz);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      res.status(500).json({ error: 'Failed to parse quiz data.', rawResponse: quizText });
    }

  } catch (error) {
    console.error('Error generating quiz:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate quiz.' });
  }
});

// Add chat endpoint OPTIONS handler
app.options('/chat', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

// Add chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const requestData = {
    contents: [
      {
        parts: [{ text: message }]
      }
    ]
  };
  try {
    const GEMINI_API_KEY = 'AIzaSyCfY7cI6qLLlwsxHWRh6t3drtaK1_jyP7s';
  
    const geminiResponse = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  
    const responseData = geminiResponse.data;
  
    if (!responseData.candidates || responseData.candidates.length === 0) {
      return res.status(500).json({ error: 'Invalid response from Gemini API' });
    }
  
    const responseText = responseData.candidates[0].content.parts[0].text;
    res.json({ response: responseText });
  
  } catch (error) {
    console.error('Error in chat:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate response.' });
  }
});

// Start server on 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Quiz API server running on port ${PORT}`);
});