import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Briefcase, Calendar, ArrowRight, LineChart, Trash2 } from 'lucide-react';

function InterviewItemCard({interview, onDelete}) {
  const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/interview/'+interview?.mockId)
  }

  const onFeedbackPress = () => {
    router.push('/dashboard/interview/'+interview?.mockId+"/feedback")
  }

  const handleDelete = () => {
    onDelete(interview.id);
  };

  return (
    <div className='group bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl p-6 relative overflow-hidden'>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-primary/10" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-tr-full -ml-6 -mb-6 transition-all duration-300 group-hover:bg-primary/10" />

      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      </div>

      <div className='space-y-4 relative'>
        {/* Header */}
        <div>
          <h2 className='font-bold text-primary text-xl mb-1 line-clamp-1 group-hover:text-primary/80 transition-colors'>
            {interview?.jobPosition}
          </h2>
        </div>

        {/* Details */}
        <div className='space-y-3'>
          <div className='flex items-center text-gray-600 bg-gray-50 rounded-lg p-2 transition-colors group-hover:bg-gray-100'>
            <Briefcase className='w-4 h-4 mr-2 text-primary/70' />
            <h2 className='text-sm font-medium'>
              {interview?.jobExp} Years of Experience
            </h2>
          </div>
          
          <div className='flex items-center text-gray-500 bg-gray-50 rounded-lg p-2 transition-colors group-hover:bg-gray-100'>
            <Calendar className='w-4 h-4 mr-2 text-primary/70' />
            <h2 className='text-sm'>
              Created At: {interview?.createdAt}
            </h2>
          </div>
        </div>

        {/* Progress Bar */}
        {/* Buttons */}
        <div className='flex justify-between gap-5 pt-3'>
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            onClick={onFeedbackPress}
          >
            <LineChart className="w-4 h-4" />
            Feedback
          </Button>
          <Button 
            size="sm" 
            className="w-full flex items-center justify-center gap-2 group/btn"
            onClick={onStart}
          >
            Start
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
        <Button
          size="sm"
          variant="destructive"
          className="absolute top-0 right-0 w-auto h-auto p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;