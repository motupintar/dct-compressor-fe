import React from 'react';

const Navbar = ({ isCompressPage }) => {
  return (
    <div className="h-[10vh] w-full bg-white shadow-md shadow-gray-300 flex items-center px-10 fixed top-0 z-[1]">
      {!isCompressPage ? (
        <p className="font-semibold text-custom-gray21 text-sm sm:text-[20px]">
          KOMPRESI CITRA DIGITAL DENGAN MENGGUNAKAN METODE DISCRETE COSINE TRANSFORM (DCT)
        </p>
      ) : (
        <div className="w-full flex justify-between items-center">
          <p className="font-semibold text-custom-gray21 text-sm sm:text-[20px]">KOMPRES GAMBAR</p>
          <div className="flex gap-10 font-medium text-[10px] sm:text-sm items-center">
            <p className="text-custom-gray21">Upload</p>
            <p className="text-custom-gray21 underline">Kompres</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
