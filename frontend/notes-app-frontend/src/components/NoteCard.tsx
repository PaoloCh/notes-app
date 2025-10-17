import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  onEdit: (note: Note) => void;
}

function NoteCard({ note, onDelete, onArchive, onEdit }: NoteCardProps) {
  return (
    <li className="bg-white rounded-lg shadow-md p-6 flex flex-col transition-transform hover:scale-105">
      <div className="flex-grow">
        {note.category && (
          <span className="text-xs font-semibold bg-purple-200 text-purple-800 px-2 py-1 rounded-full mb-2 inline-block">
            {note.category.name}
          </span>
        )}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{note.title}</h2>
        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{note.content}</p>
      </div>
      <div className="text-sm text-gray-500 mt-auto pt-4 border-t border-gray-200 flex justify-between items-center">
        <span>Status: {note.archived ? 'Archived' : 'Active'}</span>
        <div className="flex gap-2">

          <button
            onClick={() => onArchive(note.id)}
            className="px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600"
          >
            {note.archived ? 'Unarchive' : 'Archive'}
          </button>

          <button
            onClick={() => onDelete(note.id)}
            className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>

          <button
            onClick={() => onEdit(note)}
            className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          
        </div>
      </div>
    </li>
  );
}

export default NoteCard;
