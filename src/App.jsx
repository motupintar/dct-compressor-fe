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
      selectedIdx,
      dropdownRef,
      getRootProps,
      isDragActive,
      dropdownMenu,
      getInputProps,
      isDropdownOpen,
      uploadedImages,
      isCompressPage,
    },
    methods: { open, compres, clearAll, selectMenu, removeImage, handleDelete, handleSelect, toggleDropdown, downloadSingleClick, downloadAll },
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
            selectedIdx={selectedIdx}
            removeImage={removeImage}
            downloadAll={downloadAll}
            dropdownRef={dropdownRef}
            handleDelete={handleDelete}
            getRootProps={getRootProps}
            handleSelect={handleSelect}
            dropdownMenu={dropdownMenu}
            getInputProps={getInputProps}
            uploadedImages={uploadedImages}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            downloadSingleClick={downloadSingleClick}
          />
        )}
      </div>
      {loading && (
        <div className="fixed w-full top-0 h-screen bg-black bg-opacity-40 flex justify-center items-center z-[3]">
          <Lottie animationData={loadingData} loop />
        </div>
      )}
      {!isCompressPage && (
        <div ref={bottomRef} className="absolute left-10 bottom-10">
          <p className="text-sm text-custom-gray6C">© Kyyboy • 2023</p>
        </div>
      )}
    </div>
  );
};

export default App;
