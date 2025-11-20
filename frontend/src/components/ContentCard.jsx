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
    badge: 'bg-[#DBEAFE] text-[#1D4ED8]'
  },
  lecture: {
    label: 'Lecture',
    badge: 'bg-[#DCFCE7] text-[#15803D]'
  },
  pdf: {
    label: 'PDF',
    badge: 'bg-[#FEF3C7] text-[#B45309]'
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
      <Card className="group relative transition-all duration-200 hover:shadow-md">
        <CardInner>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F4F6] text-sm font-semibold text-[#111827]">
                {config.label.slice(0, 2)}
              </div>
              <div>
                <CardTitle className="text-2xl leading-tight">
                  {content.url ? (
                    <a
                      href={content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3B82F6] hover:text-[#2563EB]"
                    >
                      {content.title}
                    </a>
                  ) : (
                    content.title
                  )}
                </CardTitle>
                <CardDescription className="text-xs uppercase tracking-[0.3em] text-[#6B7280]">
                  {content.author || 'Unknown Author'}
                </CardDescription>
              </div>
            </div>
            <Badge className={cn('text-xs', config.badge)}>{config.label}</Badge>
          </CardHeader>

          <CardContent className="text-base leading-relaxed text-[#374151]">
            <p className="line-clamp-3">{content.description}</p>
            {content.url && (
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-sm font-medium text-[#3B82F6] underline underline-offset-4 hover:text-[#2563EB]"
              >
                Visit resource →
              </a>
            )}
          </CardContent>

          <CardFooter className="mt-6 flex flex-wrap gap-3 text-xs text-[#6B7280]">
            {formattedDate && (
              <span className="rounded-full border border-[#E5E7EB] px-4 py-1">
                Created {formattedDate}
              </span>
            )}
            {content.uploadedFile && (
              <span className="rounded-full border border-[#E5E7EB] px-4 py-1">
                Attachment: {content.uploadedFile}
              </span>
            )}
            <div className="ml-auto flex w-full justify-end gap-3 md:w-auto">
              <Button
                variant="secondary"
                className="flex-1 md:flex-none"
                onClick={() => navigate(`/edit/${content.id}`)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6 py-12">
          <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 text-[#111827] shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#DC2626]">
              Danger zone
            </p>
            <h2 className="mt-4 text-2xl font-semibold">Delete "{content.title}"?</h2>
            <p className="mt-2 text-sm text-[#374151]">
              This action is permanent. Please confirm you want to remove this asset from your workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <Button variant="outline" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
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
