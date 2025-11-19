import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contentAPI } from '../services/api';
import Input from '../components/ui/input';
import Textarea from '../components/ui/textarea';
import Select from '../components/ui/select';
import Label from '../components/ui/label';
import Button from '../components/ui/button';
import {
  Card,
  CardInner,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '../components/ui/card';
import toast from 'react-hot-toast';

const defaultPayload = {
  title: '',
  author: '',
  description: '',
  type: 'Video',
  url: ''
};

const AddContent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultPayload);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.title.trim()) nextErrors.title = 'Title is required';
    if (!formData.author.trim()) nextErrors.author = 'Author is required';
    if (!formData.description.trim()) nextErrors.description = 'Description is required';
    if (!formData.type) nextErrors.type = 'Please pick a content type';
    if (!formData.url.trim()) nextErrors.url = 'URL is required';
    else if (!/^https?:\/\/.+/i.test(formData.url)) {
      nextErrors.url = 'URL must start with http:// or https://';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      toast.error('Please resolve the highlighted fields');
      return;
    }

    try {
      setLoading(true);
      await contentAPI.createContent(formData);
      toast.success('Content published');
      navigate('/');
    } catch (error) {
      console.error('Error adding content:', error);
      toast.error('Something broke. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(defaultPayload);
    setErrors({});
  };

  return (
    <div className="relative min-h-screen pb-16 text-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="mb-10 space-y-4">
          <Link to="/" className="text-sm text-white/60 hover:text-white">
            ← Back to library
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
              Create
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
              Ship something beautiful
            </h1>
          </div>
        </div>

        <Card>
          <CardInner>
            <CardHeader>
              <CardTitle>Content details</CardTitle>
              <CardDescription>
                Provide the metadata that helps teammates find and trust this resource.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Designing thoughtful onboarding journeys"
                      value={formData.title}
                      onChange={handleChange}
                    />
                    {errors.title && (
                      <p className="mt-2 text-sm text-rose-300">{errors.title}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      name="author"
                      placeholder="Who created this?"
                      value={formData.author}
                      onChange={handleChange}
                    />
                    {errors.author && (
                      <p className="mt-2 text-sm text-rose-300">{errors.author}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Share the context, insights, or why this piece matters."
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-rose-300">{errors.description}</p>
                  )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="type">Content type</Label>
                    <Select id="type" name="type" value={formData.type} onChange={handleChange}>
                      <option value="Video" className="text-slate-900">
                        Video
                      </option>
                      <option value="Lecture" className="text-slate-900">
                        Lecture
                      </option>
                      <option value="PDF" className="text-slate-900">
                        PDF
                      </option>
                    </Select>
                    {errors.type && (
                      <p className="mt-2 text-sm text-rose-300">{errors.type}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="url">Resource URL</Label>
                    <Input
                      id="url"
                      name="url"
                      placeholder="https://"
                      value={formData.url}
                      onChange={handleChange}
                    />
                    {errors.url && (
                      <p className="mt-2 text-sm text-rose-300">{errors.url}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 md:flex-row">
                  <Button
                    type="button"
                    variant="ghost"
                    className="border border-white/10 text-white"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? 'Saving...' : 'Publish entry'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </CardInner>
        </Card>
      </div>
    </div>
  );
};

export default AddContent;
