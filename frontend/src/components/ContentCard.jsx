import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/button';
import Badge from './ui/badge';
import {
  Card,
  CardInner,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from './ui/card';
import { cn } from '../utils/cn';

const typeConfig = {
  video: {
    label: 'Video',
    badge: 'bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]'
  },
  lecture: {
    label: 'Lecture',
    badge: 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]'
  },
  pdf: {
    label: 'PDF',
    badge: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
  }
};

const ContentCard = ({ content, onDelete }) => {
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  const config = typeConfig[content.type?.toLowerCase()] || {
    label: content.type || 'Content',
    badge: 'bg-[#E5E7EB] text-[#374151]'
  };

  const formattedDate = content.created_at
    ? new Date(content.created_at).toLocaleDateString('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  return (
    <>
      <Card className="group relative transition-all duration-200 hover:shadow-lg hover:border-[#D1D5DB]">
        <CardInner>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] text-sm font-bold text-[#374151] shadow-sm">
                {config.label.slice(0, 2)}
              </div>
              <div>
                <CardTitle className="text-lg leading-tight">
                  {content.url ? (
                    <a
                      href={content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3B82F6] hover:text-[#2563EB] transition-colors"
                    >
                      {content.title}
                    </a>
                  ) : (
                    content.title
                  )}
                </CardTitle>
                <CardDescription className="text-xs uppercase tracking-[0.1em] text-[#6B7280] mt-0.5">
                  {content.author || 'Unknown Author'}
                </CardDescription>
              </div>
            </div>
            <Badge className={cn('text-xs border', config.badge)}>{config.label}</Badge>
          </CardHeader>

          <CardContent className="text-sm leading-relaxed text-[#374151]">
            <p className="line-clamp-3">{content.description}</p>
            {content.url && (
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#3B82F6] hover:text-[#2563EB] transition-colors"
              >
                Visit resource
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            )}
          </CardContent>

          <CardFooter className="mt-6 flex flex-wrap gap-2 text-xs text-[#6B7280]">
            {formattedDate && (
              <span className="rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 font-medium">
                {formattedDate}
              </span>
            )}
            {content.uploadedFile && (
              <span className="rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 font-medium">
                📎 {content.uploadedFile}
              </span>
            )}
            <div className="ml-auto flex w-full justify-end gap-2 md:w-auto">
              <Button
                variant="night"
                size="sm"
                className="flex-1 md:flex-none"
                onClick={() => navigate(`/edit/${content.id}`)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1 md:flex-none"
                onClick={() => setConfirming(true)}
              >
                Delete
              </Button>
            </div>
          </CardFooter>
        </CardInner>
      </Card>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-12 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-[#E5E7EB] bg-white p-8 text-[#111827] shadow-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-[#FEE2E2] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#991B1B]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              Danger zone
            </div>
            <h2 className="text-2xl font-semibold">Delete "{content.title}"?</h2>
            <p className="mt-3 text-sm text-[#6B7280] leading-relaxed">
              This action is permanent and cannot be undone. Please confirm you want to remove this asset from your workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setConfirming(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  onDelete(content.id);
                  setConfirming(false);
                }}
              >
                Yes, delete it
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentCard;
