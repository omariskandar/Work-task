import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentAPI } from '../services/api';
import ContentCard from '../components/ContentCard';
import Loading from '../components/Loading';
import Input from '../components/ui/input';
import ModernSelect from '../components/ModernSelect';
import Button from '../components/ui/button';
import Badge from '../components/ui/badge';
import toast from 'react-hot-toast';

const filterOptions = [
  { label: 'All Types', value: 'all' },
  { label: 'Video', value: 'video' },
  { label: 'Lecture', value: 'lecture' },
  { label: 'PDF', value: 'pdf' }
];

const AllContent = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const data = await contentAPI.getAllContent();
      setContents(data);
    } catch (error) {
      console.error('Error fetching contents:', error);
      toast.error('Unable to reach the library right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await contentAPI.deleteContent(id);
      setContents((prev) => prev.filter((content) => content.id !== id));
      toast.success('Entry removed');
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content. Please try again.');
    }
  };

  const filteredContents = contents.filter((content) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !term ||
      content.title?.toLowerCase().includes(term) ||
      content.description?.toLowerCase().includes(term) ||
      content.author?.toLowerCase().includes(term);

    const matchesType =
      filterType === 'all' ||
      content.type?.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesType;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen pb-16 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-20 top-10 h-60 w-60 rounded-full bg-cyan-400/30 blur-[120px]" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-amber-300/20 blur-[140px]" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <section className="rounded-[36px] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/40 to-slate-900/20 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <Badge className="bg-white/10 text-white/70">Dashboard</Badge>
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-white">
                  Content Command Center
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-white/70">
                  Create, edit, and publish your knowledge
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <span className="rounded-2xl border border-white/10 px-4 py-2">
                  Total records: {contents.length}
                </span>
                <span className="rounded-2xl border border-white/10 px-4 py-2">
                  Showing: {filteredContents.length}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" className="flex-1" onClick={fetchContents}>
                Refresh
              </Button>
              {/* <Link to="/add" className="flex-1">
                <Button className="w-full">Add new content</Button>
              </Link> */}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[28px] border border-white/5 bg-white/5 p-6 backdrop-blur-2xl">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Search the library
              </label>
              <Input
                placeholder="Try “Next.js”, “Motion design”, or an author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ModernSelect
              label="Content type"
              value={filterType}
              onChange={(newValue) => setFilterType(newValue)}
              options={filterOptions}
              placeholder="All Types"
            />
          </div>
        </section>

        <section className="mt-8">
          {filteredContents.length === 0 ? (
            <div className="rounded-[32px] border border-dashed border-white/20 bg-white/5 p-12 text-center backdrop-blur-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.6em] text-white/30">
                Empty state
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Nothing matches your filters
              </h3>
              <p className="mt-2 text-white/60">
                {searchTerm || filterType !== 'all'
                  ? 'Try resetting the search or switching the type filter.'
                  : 'Start by creating your first resource.'}
              </p>
              <Link to="/add">
                <Button className="mt-6">Create your first entry</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredContents.map((content) => (
                <ContentCard key={content.id} content={content} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AllContent;
