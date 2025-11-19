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
    accent: 'from-sky-400 to-cyan-400',
    badge: 'bg-sky-400/10 text-sky-200 border-sky-400/30'
  },
  lecture: {
    label: 'Lecture',
    accent: 'from-emerald-400 to-teal-400',
    badge: 'bg-emerald-400/10 text-emerald-200 border-emerald-400/30'
  },
  pdf: {
    label: 'PDF',
    accent: 'from-amber-400 to-orange-400',
    badge: 'bg-amber-400/10 text-amber-100 border-amber-400/30'
  }
};

const ContentCard = ({ content, onDelete }) => {
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  const config = typeConfig[content.type?.toLowerCase()] || {
    label: content.type || 'Content',
    accent: 'from-slate-500 to-slate-400',
    badge: 'bg-white/10 text-white'
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
      <Card className="group relative border-white/5 hover:border-white/20 transition-all duration-300">
        <CardInner>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-base font-semibold text-white shadow-inner',
                  config.accent
                )}
              >
                {config.label.slice(0, 2)}
              </div>
              <div>
                <CardTitle className="text-2xl leading-tight">
                  {content.url ? (
                    <a
                      href={content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white transition hover:text-cyan-200"
                    >
                      {content.title}
                    </a>
                  ) : (
                    content.title
                  )}
                </CardTitle>
                <CardDescription className="text-xs uppercase tracking-[0.3em] text-white/40">
                  {content.author || 'Unknown Author'}
                </CardDescription>
              </div>
            </div>
            <Badge className={cn('border text-xs', config.badge)}>{config.label}</Badge>
          </CardHeader>

          <CardContent className="text-base leading-relaxed text-white/80">
            <p className="line-clamp-3">{content.description}</p>
            {content.url && (
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-sm font-medium text-white/70 underline underline-offset-4 hover:text-white"
              >
                Visit resource →
              </a>
            )}
          </CardContent>

          <CardFooter className="mt-8 flex flex-wrap gap-3 text-xs text-white/60">
            {formattedDate && (
              <span className="rounded-full border border-white/10 px-4 py-2">
                Created {formattedDate}
              </span>
            )}
            {content.uploadedFile && (
              <span className="rounded-full border border-white/10 px-4 py-2">
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
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/0 transition group-hover:border-white/30" />
      </Card>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 py-12 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#030712]/90 p-8 text-white shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-rose-300/70">
              Danger zone
            </p>
            <h2 className="mt-4 text-2xl font-semibold">Delete "{content.title}"?</h2>
            <p className="mt-2 text-sm text-white/70">
              This action is permanent. Please confirm you want to remove this asset from your workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <Button
                variant="ghost"
                className="border border-white/10 text-white"
                onClick={() => setConfirming(false)}
              >
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
