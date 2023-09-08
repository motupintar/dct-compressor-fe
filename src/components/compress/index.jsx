import React from 'react';
import { Tooltip } from 'react-tooltip';

const Compress = ({
  open,
  compres,
  quality,
  clearAll,
  selected,
  response,
  selectMenu,
  downloadAll,
  removeImage,
  dropdownRef,
  selectedIdx,
  handleSelect,
  dropdownMenu,
  handleDelete,
  getRootProps,
  getInputProps,
  uploadedImages,
  toggleDropdown,
  isDropdownOpen,
  downloadSingleClick,
}) => {
  function totalBefore(list) {
    let result = 0;
    list.forEach((it) => (result += it.original_size));

    return result;
  }

  function totalAfter(list) {
    let result = 0;
    list.forEach((it) => (result += it.compressed_size));

    return result;
  }

  function totalResult(list) {
    let result = 0;
    result = Math.abs(Math.floor(((totalAfter(list) - totalBefore(list)) / totalBefore(list)) * 100));

    return result;
  }

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
                key={idx}
                onClick={() => handleSelect(file, idx)}
                className={`w-full relative h-[240px] flex flex-col items-center group justify-end p-3 pt-2 bg-white rounded-lg shadow-md shadow-gray-300 gap-2 ${
                  selectedIdx.includes(idx) ? 'border-[2px] border-blue-400 hover:border-blue-600' : 'border-[2px] hover:border-gray-400'
                }`}
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
                  <img alt={`Uploaded ${idx + 1}`} src={URL.createObjectURL(file)} className="h-full w-auto object-cover rounded-md" />
                </div>
                <div className="font-medium text-sm text-custom-gray21 w-full pt-2">
                  <p className="w-full truncate">{`Nama file : ${file.name}`}</p>
                  <p className="w-full truncate">{`Ukuran File : ${file.size} bytes`}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`w-full lg:w-1/3 pb-20 lg:pb-10 py-6 px-10 h-auto lg:h-[90vh] ${
          uploadedImages.length < 1 ? 'lg:overflow-y-hidden' : 'lg:overflow-y-scroll'
        } bg-white relative overflow-x-hidden`}
      >
        <div className="flex-1 w-full flex flex-col gap-6 pb-6">
          {selected.length > 0 ? (
            selected.map((it, idx) => (
              <div key={idx} className="w-full group bg-custom-grayEC rounded-lg overflow-hidden py-2">
                <div className="flex w-full justify-end opacity-0 group-hover:opacity-100 px-2">
                  <div id="del_lft_btn" onClick={() => handleDelete(selectedIdx[idx], it)} className="text-red-800 cursor-pointer">
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
                <div className="w-full flex flex-col group">
                  <div className="w-full h-[25vh] rounded-lg p-4 flex justify-center">
                    <img className="h-full w-auto rounded-md object-cover" src={URL.createObjectURL(it)} alt={`Selected`} />
                  </div>
                  <div className="px-4">
                    <p className="w-full truncate">{`Nama file : ${it.name}`}</p>
                    <p className="w-full truncate">{`Ukuran File : ${it.size} bytes`}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full p-4 bg-custom-grayEC rounded-lg">
              <p className="text-custom-gray21 font-medium">Klik gambar untuk memilih gambar yang akan di kompres</p>
            </div>
          )}
          {response.length > 0 && (
            <>
              <p className="my-3 font-semibold text-2xl">Hasil Kompresi</p>
              {response.map((it, idx) => (
                <div key={idx} className="w-full group bg-custom-grayEC rounded-lg overflow-hidden py-2">
                  <div className="flex w-full justify-end opacity-0 group-hover:opacity-100 px-2">
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
                  <div className="w-full flex flex-col gap-6 group">
                    <div className="w-full h-[25vh] rounded-lg p-4 flex justify-center">
                      <img
                        className="h-full w-auto rounded-md object-cover"
                        src={`data:image/png;base64, ${it.compressed_image_base64}`}
                        alt="result"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="font-semibold text-custom-gray21">
                <p>{`Ukuran Awal : ${totalBefore(response)} bytes`}</p>
                <p>{`Ukuran hasil : ${totalAfter(response)} bytes`}</p>
                <p>{`Terkompres : ${totalResult(response)}%`}</p>
              </div>
            </>
          )}
        </div>

        {response.length > 0 ? (
          <button
            className="bg-custom-gray21 hover:bg-custom-btnHover text-custom-grayC4 font-semibold p-4 rounded-md w-full text-center"
            onClick={downloadAll}
          >
            Download Semua
          </button>
        ) : selected.length > 0 ? (
          <div className="w-full flex flex-col sm:flex-row items-center gap-4">
            {/* <div ref={dropdownRef} className="relative w-full">
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
            </div> */}
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
          <div className="fixed lg:absolute w-full h-screen bg-black bg-opacity-60 top-0 left-0 text-white px-10 flex flex-col items-center justify-center text-center font-medium text-xl gap-6 z-[2]">
            <p>Tidak ada gambar yang di upload</p>
            <svg onClick={clearAll} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 cursor-pointer">
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

      <Tooltip anchorSelect="#del_lft_btn" place="left" variant="error">
        <p>Hapus gambar</p>
      </Tooltip>

      <Tooltip anchorSelect="#dld_btn" place="top-end" variant="info">
        <p>Download gambar</p>
      </Tooltip>
    </div>
  );
};

export default Compress;
