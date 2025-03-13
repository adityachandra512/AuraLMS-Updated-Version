// Load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios'); // For making HTTP requests to the Gemini API
const app = express();

app.use(express.json());

// POST endpoint to generate a quiz with a fixed 10 questions
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
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Quiz API server running on port ${PORT}`);
});
