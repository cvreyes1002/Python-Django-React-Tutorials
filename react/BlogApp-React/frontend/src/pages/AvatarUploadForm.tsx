import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { useAuth } from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

const AvatarUploadForm = () => {
  const { user } = useAuth();
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Validate if it's actually an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (png, jpg, jpeg).');
        return;
      }

      setSelectedImage(file);
      
      // Create a temporary local URL for the live preview
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedImage) {
      alert('Please select an image first!');
      return;
    }

    // When uploading files, you must use FormData
    const formData = new FormData();
    formData.append('avatar', selectedImage);

    const fetchUserData = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (!token) {
          setError("No token found, please log in.");
          // setLoading(false);
          return;
      }

      try {
        console.log('Uploading...', selectedImage.name);

        await api.post("/api/manage-avatar/", formData);
        navigate(`/profile/${user.id || "default"}`); // Redirect to profile page after successful upload
        window.location.reload(); // Reload the page to reflect the new avatar

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    fetchUserData();
  }
  // if (loading) return <p>Loading user profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>Upload your Image</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Hidden default input, styled via label */}
          <label htmlFor="file-upload" style={styles.uploadLabel}>
            {selectedImage ? 'Change Image' : 'Select Image'}
          </label>
          <input 
            id="file-upload"
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={styles.hiddenInput}
          />

          {/* Live Preview Section */}
          {previewUrl && (
            <div style={styles.previewContainer}>
              <p>Preview:</p>
              <img src={previewUrl} alt="Preview" style={styles.previewImage} />
            </div>
          )}

          <button type="submit" style={styles.submitButton}>
            Upload to Server
          </button>
        </form>
      </div>
    </>
  )
}

// Simple inline styles for demonstration
const styles: Record<string, React.CSSProperties> ={
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  },
  hiddenInput: {
    display: 'none'
  },
  uploadLabel: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  previewContainer: {
    marginTop: '10px'
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default AvatarUploadForm
