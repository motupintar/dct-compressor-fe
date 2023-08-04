import React from 'react';

const Upload = ({ getInputProps, getRootProps, isDragActive, open }) => {
  return (
    <div {...getRootProps()} className="h-screen w-full">
      <input {...getInputProps()} className="border-none outline-none" />

      <div className="text-center pt-20 pb-10">
        <p className="font-bold text-6xl text-custom-gray39">Kompresi Citra Digital</p>
        <p className="text-[20px] font-medium text-custom-gray21 mt-5 subtitle">
          Kompres File <span>JPG</span>, <span>JPEG</span>, <span>PNG</span> anda
          <br /> dengan pilihan level kualitas kompresi dan perkecil ukuran pada gambar
          <br />
          menggunakan Metode <span>D</span>escrete <span>C</span>onsine <span>T</span>ransfom
        </p>
      </div>

      <div className="flex w-full flex-col justify-center items-center text-center gap-3">
        <button
          type="button"
          onClick={open}
          className="border-none outline-none px-12 py-5 cursor-pointer text-custom-grayC4 bg-custom-gray39 rounded-lg text-3xl font-medium hover:bg-custom-btnHover"
        >
          Pilih Gambar
        </button>

        <p className="text-sm text-custom-gray6C">Atau Drop Gambar Disini</p>
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
