import React from 'react';

import { useApp } from './hook';
import { Compress, Navbar, Upload } from './components';

const App = () => {
  const {
    datas: {
      botRef,
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
    },
    methods: { open, compres, clearAll, selectMenu, setSelected, removeImage, downloadClick, toggleDropdown },
  } = useApp();
  return (
    <>
      <Navbar />
      {uploadedImages.length < 1 ? (
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
          setSelected={setSelected}
          dropdownRef={dropdownRef}
          dropdownMenu={dropdownMenu}
          downloadClick={downloadClick}
          uploadedImages={uploadedImages}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
        />
      )}
      {loading && (
        <div className="fixed w-full top-0 h-screen bg-black bg-opacity-40 flex justify-center items-center">
          <p className="text-4xl font-semibold text-white">Mengompres...</p>
        </div>
      )}
      <div ref={botRef} className="h-10 w-full" />
    </>
  );
};

export default App;
