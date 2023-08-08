import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toastError, toastSuccess } from './components';

export function useApp() {
  const dropdownMenu = ['Rendah', 'Sedang', 'Tinggi'];
  const bottomRef = useRef();
  const dropdownRef = useRef();

  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(undefined);
  const [selected, setSelected] = useState(undefined);
  const [response, setResponse] = useState(undefined);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCompressPage, setIsCompressPage] = useState(false);

  function clearAll() {
    setUploadedImages([]);
    setSelected(undefined);
    setResponse(undefined);
    setIsCompressPage(false);
  }

  function handleSelect(it) {
    setSelected(it);
    setResponse(undefined);
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
      const response = await axios.post('https://dct-compressor-be.vercel.app/compress', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponse(response.data[0]);
      setLoading(false);
      toastSuccess({ title: 'Success', message: 'Berhasil mengompres gambar' });
    } catch (error) {
      setLoading(false);
      toastError({
        title: 'Sorry',
        message: 'An error occoured on the server when handling your request',
      });
    }
  }

  function getFileNameWithoutExtension(fileName) {
    const lastIndex = fileName.lastIndexOf('.');
    if (lastIndex === -1) {
      return fileName;
    } else {
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

    setUploadedImages((prevUploadedImages) => [...prevUploadedImages, ...images]);
    setIsCompressPage(true);
  }, []);

  const removeImage = (index) => {
    setUploadedImages((prevUploadedImages) => prevUploadedImages.filter((_, i) => i !== index));
    if (selected === uploadedImages[index]) {
      setSelected(undefined);
      setResponse(undefined);
    }
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
    const isSmall = window.innerWidth < 1025;
    if ((response || selectMenu) && isSmall) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response, selected]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return {
    datas: {
      loading,
      quality,
      selected,
      response,
      bottomRef,
      dropdownRef,
      getRootProps,
      isDragActive,
      dropdownMenu,
      getInputProps,
      isDropdownOpen,
      uploadedImages,
      isCompressPage,
    },
    methods: {
      open,
      compres,
      clearAll,
      selectMenu,
      removeImage,
      handleSelect,
      downloadClick,
      toggleDropdown,
    },
  };
}
