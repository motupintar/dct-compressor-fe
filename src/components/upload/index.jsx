import React from 'react';

const Upload = ({ getInputProps, getRootProps, isDragActive, open }) => {
  return (
    <div {...getRootProps()} className="min-h-[90vh] w-full">
      <input {...getInputProps()} className="border-none outline-none" />

      <div className="text-center py-20">
        <p className="font-bold text-5xl text-gray-700">Kompresi Citra Digital</p>
        <p className="text-gray-600 text-xl mt-2 subtitle">
          Kompres <span>JPG</span>, <span>JPEG</span>, <span>PNG</span> Dan Perkecil Ukurannya.
          <br /> Kompress Pada Gambar Menggunakan Metode <span>D</span>escrete <span>C</span>onsine <span>T</span>ransfom
        </p>
      </div>

      <div className="flex w-full flex-col justify-center items-center text-center gap-3">
        <button
          type="button"
          onClick={open}
          className="border-none outline-none px-12 py-5 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-2xl"
        >
          Pilih Gambar
        </button>

        <p className="text-sm text-gray-600">Atau Drop Gambar Disini</p>
      </div>

      {isDragActive && (
        <div className="fixed h-full w-screen top-0 bg-opacity-60 bg-black">
          <div className="flex w-full h-full justify-center items-center text-center">
            <p className="font-semibold text-white text-2xl">Drop Gambar Disini</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
