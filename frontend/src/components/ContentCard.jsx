import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContentCard = ({ content, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video':
        return '🎥';
      case 'lecture':
        return '🎓';
      case 'pdf':
        return '📄';
      default:
        return '📚';
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'pdf':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = () => {
    onDelete(content.id);
    setShowDeleteModal(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="p-6">
          {/* Type Badge */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                content.type
              )}`}
            >
              <span className="mr-2">{getTypeIcon(content.type)}</span>
              {content.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {content.title}
          </h3>

          {/* Author */}
          {content.author && (
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium">By:</span> {content.author}
            </p>
          )}

          {/* Description */}
          <p className="text-gray-700 mb-4 line-clamp-3">
            {content.description}
          </p>

          {/* URL */}
          {content.url && (
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm truncate block mb-4"
            >
              🔗 {content.url}
            </a>
          )}

          {/* Date */}
          <p className="text-xs text-gray-500 mb-4">
            Created: {formatDate(content.created_at)}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/edit/${content.id}`)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "{content.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentCard;
