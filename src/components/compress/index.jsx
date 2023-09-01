import React from 'react';
import { Tooltip } from 'react-tooltip';

const Compress = ({
  open,
  compres,
  quality,
  clearAll,
  selected,
  response,
  allQuality,
  selectMenu,
  compresAll,
  removeImage,
  dropdownRef,
  allResponse,
  handleSelect,
  dropdownMenu,
  getRootProps,
  selectAllMenu,
  downloadClick,
  getInputProps,
  allDropdownRef,
  uploadedImages,
  toggleDropdown,
  isDropdownOpen,
  isAllDropdownOpen,
  toggleAllDropdown,
  downloadSingleClick,
}) => {
  return (
    <div className="w-full h-auto lg:h-[90vh] flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3 py-6 px-10 h-auto lg:h-[90vh] lg:overflow-y-scroll">
        <div className="flex gap-4">
          <div
            id="back_btn"
            onClick={clearAll}
            className="w-fit h-fit p-2 text-custom-grayC4 cursor-pointer bg-custom-gray21 hover:bg-custom-btnHover rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </div>
          <div {...getRootProps()}>
            <input {...getInputProps()} className="border-none outline-none" />
            <div
              id="add_btn"
              onClick={open}
              className="w-fit h-fit p-2 text-custom-grayC4 cursor-pointer bg-custom-gray21 hover:bg-custom-btnHover rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {uploadedImages &&
            uploadedImages.map((file, idx) => (
              <div
                className="w-full relative h-[240px] flex flex-col items-center group justify-end p-3 pt-2 border-[1px] hover:border-gray-400 bg-white rounded-lg shadow-md shadow-gray-300 gap-2"
                key={idx}
              >
                <div className="flex w-full justify-end opacity-0 group-hover:opacity-100">
                  <div id="del_btn" onClick={() => removeImage(idx)} className="text-red-800 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 flex justify-center items-center overflow-hidden">
                  <img
                    alt={`Uploaded ${idx + 1}`}
                    src={URL.createObjectURL(file)}
                    onClick={() => handleSelect(file)}
                    className="h-full w-auto object-cover rounded-md"
                  />
                </div>
                <div className="font-medium text-sm text-custom-gray21 w-full pt-2">
                  <p className="w-full truncate">{`Nama file : ${file.name}`}</p>
                  <p className="w-full truncate">{`Ukuran File : ${file.size} bytes`}</p>
                </div>
              </div>
            ))}
        </div>

        {allResponse ? (
          <>
            <p className="my-10 text-2xl font-semibold">Hasil Kompresi</p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allResponse.map((response, idx) => (
                <div
                  className="w-full relative h-[240px] flex flex-col items-center group justify-end p-3 pt-2 border-[1px] hover:border-gray-400 bg-white rounded-lg shadow-md shadow-gray-300 gap-2"
                  key={idx}
                >
                  <div className="flex w-full justify-end opacity-0 group-hover:opacity-100">
                    <div id="dld_btn" onClick={() => downloadSingleClick(idx, response)} className="text-blue-800 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center items-center overflow-hidden">
                    <img
                      className="h-full w-auto object-cover rounded-md"
                      src={`data:image/png;base64, ${response.compressed_image_base64}`}
                      alt="result"
                    />
                  </div>
                  <div className="w-full font-medium text-sm text-custom-gray21">
                    <p className="w-full truncate">{`Ukuran Awal : ${response.original_size} bytes`}</p>
                    <p className="w-full truncate">{`Ukuran hasil : ${response.compressed_size} bytes`}</p>
                    <p className="w-full truncate">{`Terkompres : ${Math.abs(
                      Math.floor(((response.compressed_size - response.original_size) / response.original_size) * 100)
                    )}%`}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full flex justify-end">
            <div className="py-6 w-full lg:w-3/4 flex flex-col sm:flex-row items-center gap-4">
              <div ref={allDropdownRef} className="relative w-full">
                <button
                  onClick={toggleAllDropdown}
                  className="bg-custom-gray21 hover:bg-custom-btnHover text-custom-grayC4 font-semibold p-4 rounded-md w-full flex items-center justify-between truncate"
                >
                  {allQuality ? allQuality + '%' : 'Kualitas Kompres'}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 ${isAllDropdownOpen ? 'rotate-0' : 'rotate-180'}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isAllDropdownOpen && (
                  <div className="w-full absolute bottom-16 overflow-hidden rounded-md">
                    {dropdownMenu.map((it, idx) => (
                      <p onClick={() => selectAllMenu(it)} className="w-full p-2 bg-white hover:bg-gray-300" key={idx}>
                        {it + '%'}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={compresAll}
                className="bg-custom-gray21 hover:bg-custom-btnHover text-custom-grayC4 font-semibold p-4 rounded-md w-full text-center"
              >
                Kompres Semua
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`w-full lg:w-1/3 mb-20 ${
          selected ? 'h-fit lg:h-full' : 'h-[50vh] lg:h-full'
        } bg-white flex flex-col items-center gap-6 justify-end p-6 relative`}
      >
        <div className="flex-1 w-full flex flex-col gap-6">
          {selected ? (
            <div className="w-full h-[25vh] bg-custom-grayEC rounded-lg p-4 flex justify-center">
              <img className="h-full w-auto rounded-md object-cover" src={URL.createObjectURL(selected)} alt={`Selected`} />
            </div>
          ) : (
            <div className="w-full p-4 bg-custom-grayEC rounded-lg">
              <p className="text-custom-gray21 font-medium">Klik gambar untuk memilih gambar yang akan di kompres</p>
            </div>
          )}
          {response && (
            <div className="w-full flex flex-col gap-6">
              <div className="w-full h-[25vh] bg-custom-grayEC rounded-lg p-4 flex justify-center">
                <img
                  className="h-full w-auto rounded-md object-cover"
                  src={`data:image/png;base64, ${response.compressed_image_base64}`}
                  alt="result"
                />
              </div>
              <div className="font-semibold text-custom-gray21">
                <p>{`Ukuran Awal : ${response.original_size} bytes`}</p>
                <p>{`Ukuran hasil : ${response.compressed_size} bytes`}</p>
                <p>{`Terkompres : ${Math.abs(Math.floor(((response.compressed_size - response.original_size) / response.original_size) * 100))}%`}</p>
              </div>
            </div>
          )}
        </div>

        {response ? (
          <button
            className="bg-custom-gray21 hover:bg-custom-btnHover text-custom-grayC4 font-semibold p-4 rounded-md w-full text-center"
            onClick={downloadClick}
          >
            Download
          </button>
        ) : selected ? (
          <div className="w-full flex flex-col sm:flex-row items-center gap-4">
            <div ref={dropdownRef} className="relative w-full">
              <button
                onClick={toggleDropdown}
                className="bg-custom-gray21 hover:bg-custom-btnHover text-custom-grayC4 font-semibold p-4 rounded-md w-full flex items-center justify-between truncate"
              >
                {quality ? quality + '%' : 'Kualitas Kompres'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-4 h-4 ${isDropdownOpen ? 'rotate-0' : 'rotate-180'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="w-full absolute bottom-16 overflow-hidden rounded-md">
                  {dropdownMenu.map((it, idx) => (
                    <p onClick={() => selectMenu(it)} className="w-full p-2 bg-custom-grayEC hover:bg-gray-300" key={idx}>
                      {it + '%'}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={compres}
              className="bg-custom-gray21 hover:bg-custom-btnHover text-custom-grayC4 font-semibold p-4 rounded-md w-full text-center"
            >
              Kompres
            </button>
          </div>
        ) : (
          <></>
        )}

        {uploadedImages.length < 1 && (
          <div className="absolute w-full h-full bg-black bg-opacity-60 top-0 text-white px-10 flex flex-col items-center justify-center text-center font-medium text-xl gap-6 z-[2]">
            <p>Tidak ada gambar yang di upload</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
              <path
                fillRule="evenodd"
                d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            <p>Tambahkan / Upload gambar melalui menu yang tersedia</p>
          </div>
        )}
      </div>

      <Tooltip anchorSelect="#back_btn" place="top-start" variant="info" className="z-10">
        <p>Kembali ke halaman awal</p>
      </Tooltip>

      <Tooltip anchorSelect="#add_btn" place="right" variant="info">
        <p>Tambah gambar</p>
      </Tooltip>

      <Tooltip anchorSelect="#del_btn" place="top-end" variant="error">
        <p>Hapus gambar</p>
      </Tooltip>

      <Tooltip anchorSelect="#dld_btn" place="top-end" variant="info">
        <p>Download gambar</p>
      </Tooltip>
    </div>
  );
};

export default Compress;
