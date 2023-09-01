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
      allQuality,
      allResponse,
      dropdownRef,
      getRootProps,
      isDragActive,
      dropdownMenu,
      getInputProps,
      allDropdownRef,
      isDropdownOpen,
      uploadedImages,
      isCompressPage,
      isAllDropdownOpen,
    },
    methods: {
      open,
      compres,
      clearAll,
      selectMenu,
      compresAll,
      removeImage,
      handleSelect,
      downloadClick,
      selectAllMenu,
      toggleDropdown,
      toggleAllDropdown,
      downloadSingleClick,
    },
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
            allQuality={allQuality}
            compresAll={compresAll}
            selectMenu={selectMenu}
            allResponse={allResponse}
            removeImage={removeImage}
            dropdownRef={dropdownRef}
            getRootProps={getRootProps}
            handleSelect={handleSelect}
            dropdownMenu={dropdownMenu}
            selectAllMenu={selectAllMenu}
            getInputProps={getInputProps}
            downloadClick={downloadClick}
            allDropdownRef={allDropdownRef}
            uploadedImages={uploadedImages}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            isAllDropdownOpen={isAllDropdownOpen}
            toggleAllDropdown={toggleAllDropdown}
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
          <p className="text-sm text-custom-gray6C">© Tri Boy Girsang • 2023</p>
        </div>
      )}
    </div>
  );
};

export default App;
