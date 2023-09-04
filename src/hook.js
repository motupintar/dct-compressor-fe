import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toastError, toastSuccess } from './components';

export function useApp() {
  const dropdownMenu = [25, 50, 75];
  const bottomRef = useRef();
  const dropdownRef = useRef();

  const [selected, setSelected] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(undefined);
  const [selectedIdx, setSelectedIdx] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCompressPage, setIsCompressPage] = useState(false);

  function clearAll() {
    setSelected([]);
    setResponse([]);
    setSelectedIdx([]);
    setUploadedImages([]);
    setIsCompressPage(false);
  }

  function handleSelect(it, idx) {
    if (selectedIdx.includes(idx)) return;
    setSelectedIdx((prev) => [...prev, idx]);
    setSelected((prev) => [...prev, it]);
    setResponse([]);
  }

  function handleDelete(idx, it) {
    setSelectedIdx((prev) => prev.filter((item) => item !== idx));
    setSelected((prev) => prev.filter((item) => item !== it));
    setResponse([]);
  }

  async function compres() {
    setLoading(true);
    const formData = new FormData();
    for (const image of selected) {
      formData.append('image', image);
    }
    formData.append('quality', quality ? quality : 25);

    try {
      const response = await axios.post('http://127.0.0.1:5000/compress', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponse(response.data);
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

  function downloadSingleClick(idx, response) {
    const nameOfFile = selected[idx].name || 'image.png';

    const contentType = selected[idx].type || '';
    const base64Data = response.compressed_image_base64;
    const fileName = `${getFileNameWithoutExtension(nameOfFile)}_compressed.png`;

    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  function downloadAll() {
    for (let i = 0; i < response.length; i++) {
      const element = response[i];
      downloadSingleClick(i, element);
    }
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
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
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
      selectedIdx,
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
      downloadAll,
      removeImage,
      handleSelect,
      handleDelete,
      toggleDropdown,
      downloadSingleClick,
    },
  };
}
