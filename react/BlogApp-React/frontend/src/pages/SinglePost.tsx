import { Pencil, Trash2 } from 'lucide-react';

export default function PostContainer() {
  // Optional: Handle delete form submission
  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    // Add delete logic here
  };

const SinglePost = () => {
  
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      {/* Title and Actions Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Example Post Title Here</h2>
        <div className="flex items-center gap-3">
          {/* Edit Button */}
          <a 
            href="#" 
            className="text-blue-600 hover:text-blue-800 transition-colors" 
            title="Edit"
          >
            <Pencil className="w-5 h-5" />
          </a>
          
          {/* Delete Form/Button */}
          <form onSubmit={handleDelete} className="inline">
            <button 
              type="submit" 
              className="text-red-600 hover:text-red-800 transition-colors cursor-pointer" 
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Author and Date Meta Info */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <a href="#">
          <img 
            className="w-6 h-6 rounded-full" 
            src="https://gravatar.com/avatar/f64fc44c03a8a7eb1d52502950879659?s=128" 
            alt="kittydoe's avatar" 
          />
        </a>
        <span>
          Posted by <a href="#" className="text-blue-600 hover:underline">kittydoe</a> on 2/3/2019
        </span>
      </div>

      {/* Post Body Content */}
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>My roommate yells at me when I destroy things, but I do what I want.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam praesentium 
          laboriosam unde fuga accusamus reiciendis laudantium quis consequatur, beatae 
          temporibus nemo, tempora voluptatum, perspiciatis accusantium ullam molestiae 
          cupiditate incidunt architecto.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam praesentium 
          laboriosam unde fuga accusamus reiciendis laudantium quis consequatur, beatae 
          temporibus nemo, tempora voluptatum, perspiciatis accusantium ullam molestiae 
          cupiditate incidunt architecto.
        </p>
      </div>
    </div>
  )
}

export default SinglePost


// Key Changes Made:
// Layout & Width: container--narrow and py-md-5 were converted to a responsive wrapper using mx-auto max-w-3xl px-4 py-6 md:py-12.

// Flexbox Alignment: d-flex justify-content-between became flex justify-between items-center to keep the icons and title vertically centered.

// Spacing & Content: Instead of adding standard margins to every paragraph, space-y-4 was added to the body container wrapper to cleanly space out the text.

// Icons: Replaced Font Awesome standard classes with lucide-react components (Pencil and Trash2), which play nicely with Tailwind's sizing utilities (w-5 h-5).

// Avatar Styling: avatar-tiny was replaced with w-6 h-6 rounded-full.
