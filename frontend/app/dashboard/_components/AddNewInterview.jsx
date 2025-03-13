"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExp, setJobExp] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const user = { primaryEmailAddress: { emailAddress: "test@example.com" } };

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExp);

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExp}, Depends on Job Position, Job Description and Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview question along with answer in JSON format, Give us question and answer field on JSON`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const MockJsonResp = (await result.response.text()).replace('```json', '').replace('```', '').trim();

            console.log(JSON.parse(MockJsonResp));
            setJsonResponse(MockJsonResp);

            if (MockJsonResp) {
                const resp = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: MockJsonResp,
                        jobPosition: jobPosition,
                        jobDesc: jobDesc,
                        jobExp: jobExp,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD-MM-YYYY')
                    })
                    .returning({ mockId: MockInterview.mockId });

                console.log("Inserted ID:", resp);
                if (resp) {
                    setOpenDialog(false);
                    router.push('/dashboard/interview/' + resp[0]?.mockId);
                }
            } else {
                console.log("ERROR");
            }
        } catch (error) {
            console.error('Error during JSON parsing or DB insertion:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-10 border rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-all cursor-pointer text-center text-lg font-bold' 
                onClick={() => setOpenDialog(true)}
            >
                + Add New
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl p-8 bg-white rounded-xl shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-extrabold text-gray-900">Tell Us About Your Interview</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            <form onSubmit={onSubmit} className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Enter Details About Your Job Position</h2>
                                    <div className='mt-4'>
                                        <label className="font-medium text-gray-700">Job Role/Position</label>
                                        <div className='mt-2'>
                                            <Input className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex. Full Stack Developer" required
                                                value={jobPosition}
                                                onChange={(event) => setJobPosition(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <label className="font-medium text-gray-700">Job Description/Tech Stack</label>
                                        <div className='mt-2'>
                                            <Textarea className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex. React, Angular, NodeJs, MySQL" required
                                                value={jobDesc}
                                                onChange={(event) => setJobDesc(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <label className="font-medium text-gray-700">Years of Experience</label>
                                        <div className='mt-2'>
                                            <Input className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex. 5" type="number" max="50" required
                                                value={jobExp}
                                                onChange={(event) => setJobExp(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-4 justify-end mt-6'>
                                    <Button type="button" variant="ghost" className="text-gray-600 hover:text-gray-800" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition">
                                        {loading ? <LoaderCircle className='animate-spin' /> : null}
                                        {loading ? 'Generating from AI' : 'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview;
