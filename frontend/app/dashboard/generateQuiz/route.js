import { NextResponse } from "next/server";

export async function POST(request) {
  const { topic } = await request.json();

  try {
    // Generate the quiz here instead of making another request
    const quizData = {
      message: `Quiz generated successfully for topic: ${topic}`,
    };

    const res = NextResponse.json(quizData);
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return res;
  } catch (error) {
    console.error("Error generating quiz:", error);
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
}

export async function OPTIONS(request) {
  const res = new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
  return res;
}