import React from 'react';
import Lottie from 'lottie-react';

import { useApp } from './hook';
import loadingData from './loading.json';
import { Compress, Navbar, Upload } from './components';

const App = () => {
  const {
    datas: {
      quality,
      loading,
      selected,
      response,
      dropdownRef,
      getRootProps,
      isDragActive,
      dropdownMenu,
      getInputProps,
      isDropdownOpen,
      uploadedImages,
      isCompressPage,
    },
    methods: { open, compres, clearAll, selectMenu, handleSelect, removeImage, downloadClick, toggleDropdown },
  } = useApp();
  return (
    <div className="relative w-full h-screen font-inter overflow-hidden">
      <Navbar isCompressPage={isCompressPage} />
      <div className="flex-1 mt-[10vh]">
        {!isCompressPage ? (
          <Upload getInputProps={getInputProps} getRootProps={getRootProps} isDragActive={isDragActive} open={open} />
        ) : (
          <Compress
            open={open}
            quality={quality}
            compres={compres}
            response={response}
            selected={selected}
            clearAll={clearAll}
            selectMenu={selectMenu}
            removeImage={removeImage}
            dropdownRef={dropdownRef}
            handleSelect={handleSelect}
            dropdownMenu={dropdownMenu}
            downloadClick={downloadClick}
            uploadedImages={uploadedImages}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
          />
        )}
      </div>
      {loading && (
        <div className="fixed w-full top-0 h-screen bg-black bg-opacity-40 flex justify-center items-center z-[3]">
          <Lottie animationData={loadingData} loop />
        </div>
      )}
      <div className="absolute left-10 bottom-10">
        <p className="text-sm text-custom-gray6C">© Tri Boy Girsang • 2023</p>
      </div>
    </div>
  );
};

export default App;
