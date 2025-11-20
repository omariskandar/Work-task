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
    <div className="min-h-screen bg-[var(--color-background)] pb-16 text-[#111827]">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 space-y-8">
        <section className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <Badge variant="default">Dashboard</Badge>
              <div>
                <h1 className="text-3xl font-bold text-[#111827] tracking-tight">
                  Content Manager
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-[#6B7280]">
                  Create, edit, and publish your knowledge base with clarity.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-medium text-[#6B7280]">
                <span className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2">
                  Total: {contents.length}
                </span>
                <span className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2">
                  Showing: {filteredContents.length}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="night" className="flex-1" onClick={fetchContents}>
                Refresh
              </Button>
              {/* <Link to="/add" className="flex-1">
                <Button className="w-full">Add new content</Button>
              </Link> */}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#374151] mb-2">
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
            <div className="rounded-xl border-2 border-dashed border-[#E5E7EB] bg-white p-16 text-center shadow-sm">
              <div className="mx-auto max-w-md space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#F3F4F6]">
                  <svg className="h-8 w-8 text-[#9CA3AF]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#111827]">
                    Nothing matches your filters
                  </h3>
                  <p className="mt-2 text-sm text-[#6B7280]">
                    {searchTerm || filterType !== 'all'
                      ? 'Try resetting the search or switching the type filter.'
                      : 'Start by creating your first resource.'}
                  </p>
                </div>
                <Link to="/add">
                  <Button className="mt-4">Create your first entry</Button>
                </Link>
              </div>
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
