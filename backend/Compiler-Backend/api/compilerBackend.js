import express from 'express';
import axios from 'axios';
import cors from 'cors';  // Add this line at the top

const app = express();
app.use(cors());  // Add this line before other middleware
app.use(express.json());

const compileAndRun = async (language, code, input) => {
  // Determine the file extension based on the language
  let fileExtension;
  switch (language) {
    case 'python':
      fileExtension = 'py';
      break;
    case 'javascript':
      fileExtension = 'js';
      break;
    case 'java':
      fileExtension = 'java';
      break;
    case 'cpp':
    default:
      fileExtension = 'cpp';
      break;
  }

  const options = {
    method: 'POST',
    url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
    headers: {
      'x-rapidapi-key': '',
      'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      language: language,
      stdin: input,
      files: [
        {
          // Use the determined file extension
          name: 'Main.' + fileExtension,
          content: code
        }
      ],
      outputFileName: 'output.txt'
    }
  };

  try {
    const response = await axios.request(options);
    const output = response.data.stdout ? response.data.stdout.trim() : null; // Ensure response.data.stdout is not null
    return {
      success: true,
      output: output,
      error: response.data.stderr,
      executionTime: response.data.executionTime
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

app.post('/verify', async (req, res) => {
  const { language, code, testCases } = req.body;
  
  if (!language || !code || !testCases || !Array.isArray(testCases)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid request body. Required: language, code, and testCases array' 
    });
  }

  try {
    const results = [];
    let allTestsPassed = true;

    for (const test of testCases) {
      const result = await compileAndRun(language, code, test.input);
      const passed = result.success && result.output === test.expectedOutput;
      
      if (!passed) allTestsPassed = false;
      
      results.push({
        input: test.input,
        expectedOutput: test.expectedOutput,
        actualOutput: result.output,
        passed: passed,
        error: result.error
      });
    }

    return res.json({
      success: true,
      allTestsPassed,
      results
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
// Remove the conditional server setup
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }

// Change the export to module.exports for Vercel
export default app; // Ensure the app is exported
