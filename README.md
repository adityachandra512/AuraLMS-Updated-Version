# Aura-LMS-Final

Team Details:
Team member 1: Sanat Kulkarni 
Team member 2: Rachit Methwani
Team member 3: Aditya Chandra
Team member 4: Shivansh Singhania
Team member 5: Aditya Dutt


All The Team members are currently studying in SRM University AP, Andhra Pradesh. Pursuing B.Tech in Computer Science Engineering in pre-final year.


Project Details:
AuraLMS is an innovative learning management system designed to enhance both the teaching and learning experience. It integrates advanced AI capabilities to provide personalized feedback, interactive learning modules, and comprehensive platform management tools.


Key Features in previous prototype:
AI-Driven Mock Interviews: Simulate professional job interview experiences with AI-generated questions and detailed feedback, adaptable to various job roles and experience levels.
Interactive Coding Modules: Engage users with interactive coding exercises. Learn programming languages easily through option based prompts and immediate result feedback.
Comprehensive LMS Management: A complete suite to manage users, assignments, quizzes, and facilitate communication.
AI-Enhanced Content Processing: Utilizes AI to process learning materials, like PDFs, automatically generating useful components, notes, etc.
User-Friendly Interface: Designed with clarity in mind, featuring an easily navigable dashboard, intuitive controls, and a night mode for optimized viewing.





Added Features to the project:
Compiler for custom inputs and outputs: Integrated a versatile code compiler using OneCompiler API with support for Python, C++, and Java. Users can easily select their preferred programming language, input custom code, and receive instant compilation results. Deployed the JavaScript-based APIs to Vercel, enabling seamless integration with our frontend application and ensuring reliable performance.
Custom Quiz Generator: Implemented Gemini 2.0 Flash AI integration with our Express backend, enabling teachers to instantly generate custom quiz questions on any topic with a simple text prompt. Developed an intuitive Next.js frontend with a streamlined user interface that guides students through topic selection and quiz completion. Features real-time feedback functionality that immediately indicates correct and incorrect answers, enhancing the learning experience while drastically reducing teachers' manual question creation workload.
Fixing Interviewing platform: Fixed Rating system of the interviews and feedback system. Optimised the platform for multiple browser agents other than Chromium (So it works on Safari, Firefox and others) 
PDF Text Extraction and Processing: Developed a PDF Text Extractor capable of processing multi-page documents while intelligently cleaning and formatting extracted content. The system effectively handles corrupted or poorly formatted text, ensuring high-quality output regardless of source document quality. Seamlessly integrated this utility into our NextJS frontend as a core application feature, providing users with a reliable tool for converting PDF content into clean, usable text for further processing or analysis.











Team Member Contributions: 

Sanat Kulkarni:
1) Built a compiler using OneCompiler API that works with Python, C++, and Java. Users can pick their language, add their own input, and see results right away. Put the JavaScript APIs on Vercel so they're easier to connect to our frontend.
2) Made a PDF Text Extractor that can handle multiple pages and fix messy text. Added it to our NextJS frontend as one of the main features everyone can use.
3) Came up with the main database structure and planned what features we should add while building our prototype. This helped us figure out what direction to take the app.
4) Added security measures to both the Compiler and PDF Text Extractor to make sure no one could exploit our APIs and mess with our system.
5) Led our team during the hackathon and helped everyone stay on track while we improved our prototype. Made sure we all knew what we were working on and hit our deadlines.

Tech Stack: JavaScript, Vercel, NextJS, ReactJS, NodeJS, ExpressJS, Axios


Rachit Methwani:
1. Initiated the idea of the AI Interviewer that asks personalized tech-related questions based on the Tools/Technologies and Work Experience of the user.
2. Developed the prompting mechanism to retrieve the questions and expected answers (correct answers) based on the inputs given by the user.
3. Used Gemini Flash 2.0 model for generating the questions and expected answers using a prompt.
4. Implemented the feedback feature which gives feedback (relative to years of experience) based on the expected answer according to the prompt given to Gemini API.
5. Implemented persistent storage for previous interviews attempted by the user containing the feedback and rating of each interview.

Tech stack: ReactJs, NextJs, Gemini API.



Aditya Chandra:
1. Designed an attractive landing page with smooth scrolling and engaging animations using TailwindCSS for simplicity and visual appeal.
2. Created dedicated dashboards for Admin (managing users, courses, and events) and Teachers (tracking progress, grading) with data visualization charts.
3. Integrated Gemini API to build a student chat assistant providing clear guidance for career and personal doubts.
4. Developed a signup page with email/password registration, local storage for data, and helpful form validation.
5. We have used Local storage for storing the quiz result for teacher reference.
 
Tech Stack: ReactJS, NextJs, TailwindCSS, Gemini API, Local Storage

Shivansh Singhania: 
1. Connected Gemini 2.0 Flash AI to my Express backend so teachers just type in any topic and it makes custom quiz questions right away - no more writing questions by hand!
2. Developed a simple sign-in where students enter their roll number (saved in local storage) so we can track who's who throughout the quiz
3. Created a clean Next.js frontend that guides students through picking their topic and taking the quiz, plus it tells them right away if they got each answer right or wrong
4. Developed a way to save all the important info (student details and scores) locally so teachers can see how everyone did on the quizzes
5. Created the Express.js backend to handle everything behind the scenes - all the API requests, quiz generation, and making sure the frontend and backend work together properly

Tech stack: NextJs, ReactJs, Gemini API, Tailwind CSS, ExpressJs

Aditya Dutt:
1. Created a real-time interview assessment tool that uses artificial intelligence analysis to instantly respond to candidate answers.
2. Developed and put into use a dynamic scoring system that judges answers on technical accuracy, thoroughness, and clarity.
3. Developed an instinctual interview dashboard presenting extensive interview statistics, progress monitoring, and past performance history.
4. Created a modular interview card system that organizes interview sessions in an effective way with filtering options.
5. Created a comprehensive interview recording system with integrated Web Speech API for real-time speech-to-text transcription and webcam video capture.

Tech stack: ReactJS, NextJS, TailwindCSS



