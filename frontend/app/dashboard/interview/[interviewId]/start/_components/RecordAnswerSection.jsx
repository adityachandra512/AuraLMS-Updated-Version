"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { UserAnswer } from '@/utils/schema';
import { db } from '@/utils/db';
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [micPermission, setMicPermission] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const recognition = useRef(null);

    useEffect(() => {
        // Check for microphone permissions explicitly
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => setMicPermission(true))
            .catch(() => {
                setMicPermission(false);
                toast.error("Microphone access denied. Please enable it in browser settings.");
            });

        // Detect if Web Speech API is available
        const isSpeechRecognitionAvailable = () => {
            const isAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window || 'mozSpeechRecognition' in window || 'msSpeechRecognition' in window;
            console.log('SpeechRecognition available:', isAvailable, window.SpeechRecognition, window.webkitSpeechRecognition, window.mozSpeechRecognition, window.msSpeechRecognition);
            return isAvailable;
        };

        if (isSpeechRecognitionAvailable()) {
            recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;

            recognition.current.onresult = (event) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        setUserAnswer(prevAns => prevAns + ' ' + event.results[i][0].transcript);
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
            };

            recognition.current.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                toast.error("Speech recognition error: " + event.error);
                setIsRecording(false);
            };

            recognition.current.onend = () => {
                setIsRecording(false);
            };
        } else {
            toast.error("Speech recognition is not supported in this browser.");
        }
    }, []);

    const startRecording = () => {
        if (!micPermission) {
            toast.error("Microphone access is required for recording.");
            return;
        }

        if (recognition.current) {
            setUserAnswer('');
            recognition.current.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (recognition.current) {
            recognition.current.stop();
            setIsRecording(false);
        }
    };

    const StartStopRecording = () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    };

    // Function to save user answer and get feedback
    const UpdateUserAnswer = async () => {
        console.log("User Answer:", userAnswer);
        setLoading(true);

        const feedbackPrompt = `
            Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
            User Answer: ${userAnswer}, 
            Please give a rating and short feedback (3-5 lines) in JSON format with 'rating' and 'feedback' fields.
        `;

        let result;
        try {
            result = await chatSession.sendMessage(feedbackPrompt);
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            toast.error("Failed to get feedback from Gemini AI");
            setLoading(false);
            return;
        }

        let JsonFeedbackResp;
        try {
            const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            JsonFeedbackResp = JSON.parse(mockJsonResp);
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            toast.error("Failed to parse feedback from Gemini AI");
            JsonFeedbackResp = { rating: "N/A", feedback: "No feedback available" };
        }

        // Insert data into the database
        try {
            await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: "test@example.com",
                createdAt: moment().format('DD-MM-YYYY')
            });

            toast.success("User answer recorded successfully");
            setUserAnswer('');
        } catch (dbError) {
            console.error("Database error:", dbError);
            toast.error("Failed to save answer.");
        }

        setLoading(false);
    };

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer();
        }
    }, [isRecording, userAnswer]);

    return (
        <div className='flex items-center justify-center flex-col'>
            {/* Webcam Section */}
            <div className='flex flex-col mt-10 justify-center items-center bg-black rounded-lg p-5 relative'>
                <Image src={'/webcam.png'} width={200} height={200} className='absolute' alt="Webcam Background" />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>

            {/* Recording Button */}
            <Button
                disabled={loading || !micPermission}
                variant="outline"
                className="my-10"
                onClick={StartStopRecording}
            >
                {isRecording ? (
                    <h2 className='flex text-red-600 gap-2 animate-pulse items-center'>
                        <StopCircle /> Stop Recording
                    </h2>
                ) : (
                    <h2 className='flex text-center gap-2 items-center'>
                        <Mic /> Record Answer
                    </h2>
                )}
            </Button>
        </div>
    );
}

export default RecordAnswerSection;