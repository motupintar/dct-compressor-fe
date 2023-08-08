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
    methods: { open, compres, clearAll, selectMenu, handleSelect, removeImage, downloadClick, toggleDropdown },
  } = useApp();
  return (
    <div
      className={`relative w-full font-inter ${
        isCompressPage ? 'min-h-screen lg:h-screen overflow-auto lg:overflow-hidden' : 'h-screen overflow-auto lg:overflow-hidden'
      }`}
    >
      <Navbar isCompressPage={isCompressPage} />
      <div className="pt-[10vh]">
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
            getRootProps={getRootProps}
            handleSelect={handleSelect}
            dropdownMenu={dropdownMenu}
            getInputProps={getInputProps}
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
      <div ref={bottomRef} className="absolute left-10 bottom-10">
        <p className="text-sm text-custom-gray6C">© Tri Boy Girsang • 2023</p>
      </div>
    </div>
  );
};

export default App;
