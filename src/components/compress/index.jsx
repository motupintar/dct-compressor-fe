import React from 'react';

const Compress = ({
  open,
  compres,
  quality,
  clearAll,
  selected,
  response,
  selectMenu,
  setSelected,
  removeImage,
  dropdownRef,
  dropdownMenu,
  downloadClick,
  uploadedImages,
  toggleDropdown,
  isDropdownOpen,
}) => {
  return (
    <>
      <div className="mt-4 w-full flex justify-between px-10 gap-3">
        <div onClick={clearAll} className="w-fit p-2 text-white cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </div>
        <div onClick={open} className="w-fit p-2 text-white cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-10 place-items-center px-10">
        {uploadedImages &&
          uploadedImages.map((file, idx) => (
            <div
              className="w-full relative h-[240px] flex flex-col items-center
               justify-end p-2 border-[1px] hover:border-gray-400 bg-white rounded-lg shadow-md shadow-gray-300"
              key={idx}
            >
              <div className="flex w-full justify-end gap-3">
                <div onClick={() => removeImage(idx)} className="text-red-800 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center overflow-hidden">
                <img
                  alt={`Uploaded ${idx + 1}`}
                  src={URL.createObjectURL(file)}
                  onClick={() => setSelected(file)}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ))}
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-6 justify-center my-10">
        {selected && (
          <div>
            <div className="flex gap-2 items-center mb-2">
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-center flex items-center"
                >
                  {quality ? quality : 'Kualitas Kompres'}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 ml-2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="w-full absolute top-10 overflow-hidden rounded-md">
                    {dropdownMenu.map((it, idx) => (
                      <p onClick={() => selectMenu(it)} className="w-full p-2 bg-white hover:bg-gray-300" key={idx}>
                        {it}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={compres} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md h-fit">
                Kompres
              </button>
            </div>
            <img className="h-[200px] w-auto rounded-lg object-cover" src={URL.createObjectURL(selected)} alt={`Selected`} />
            <p className="text-gray-700 text-sm mt-2">{`Ukuran Awal : ${selected.size} bytes`}</p>
          </div>
        )}

        {response && selected.size === response.original_size && (
          <div className="relative">
            <div className="flex w-full justify-end">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mb-2 rounded-md" onClick={downloadClick}>
                download
              </button>
            </div>
            <img
              className="h-[200px] w-auto rounded-lg object-cover"
              src={`data:image/png;base64, ${response.compressed_image_base64}`}
              alt="result"
            />
            <p className="text-gray-700 text-sm mt-2">{`Ukuran hasil : ${response.compressed_size} bytes`}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Compress;
