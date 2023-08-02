import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useApp() {
  const dropdownMenu = ['Rendah', 'Sedang', 'Tinggi'];
  const dropdownRef = useRef();
  const botRef = useRef();

  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(undefined);
  const [selected, setSelected] = useState(undefined);
  const [response, setResponse] = useState(undefined);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function clearAll() {
    setSelected(undefined);
    setResponse(undefined);
    setUploadedImages([]);
  }

  function getQuality() {
    switch (quality) {
      case 'Sedang':
        return 50;
      case 'Tinggi':
        return 75;
      default:
        return 25;
    }
  }

  async function compres() {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', selected);
    formData.append('quality', getQuality());

    try {
      // Make the POST request using Axios
      const response = await axios.post('https://dct-compressor-be.vercel.app/compress', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response here, if needed
      setResponse(response.data[0]);
      setLoading(false);
      botRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      setLoading(false);
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
  }

  function getFileNameWithoutExtension(fileName) {
    const lastIndex = fileName.lastIndexOf('.');
    if (lastIndex === -1) {
      // File has no extension
      return fileName;
    } else {
      // Extract the file name without extension
      return fileName.slice(0, lastIndex);
    }
  }

  function downloadClick() {
    const nameOfFile = selected.name || 'image.png';

    const contentType = selected.type || '';
    const base64Data = response.compressed_image_base64;
    const fileName = `${getFileNameWithoutExtension(nameOfFile)}_compressed.png`;

    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  function filterImg(acceptedFiles) {
    const accExt = ['png', 'jpg', 'jpeg'];

    const result = [];
    acceptedFiles.forEach((it) => {
      const ext = it.name.split('.').pop();
      const isImage = accExt.includes(ext);

      if (isImage) {
        result.push(it);
      }
    });

    return result;
  }

  const onDrop = useCallback((acceptedFiles) => {
    const images = filterImg(acceptedFiles);

    // Append the newly uploaded images to the existing images in the state
    setUploadedImages((prevUploadedImages) => [...prevUploadedImages, ...images]);
  }, []);

  const removeImage = (index) => {
    // Remove the image from the state based on its index
    setUploadedImages((prevUploadedImages) => prevUploadedImages.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  function selectMenu(it) {
    setQuality(it);
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the dropdown element
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return {
    datas: {
      botRef,
      loading,
      quality,
      selected,
      response,
      dropdownRef,
      getRootProps,
      isDragActive,
      dropdownMenu,
      getInputProps,
      isDropdownOpen,
      uploadedImages,
    },
    methods: {
      open,
      compres,
      clearAll,
      selectMenu,
      setSelected,
      removeImage,
      downloadClick,
      toggleDropdown,
    },
  };
}
