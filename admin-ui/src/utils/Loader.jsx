
function Loader() {
  return (
    <div className="absolute z-10 left-0 flex h-full justify-center items-center w-full bg-[#ecefec] ">
      <div className="relative">
        <div className="absolute inset-0 rounded-full h-7 w-7 border-4 border-gray-200"></div>
        <div className="rounded-full h-7 w-7 border-3 border-transparent border-t-blue-600 border-r-purple-600 animate-spin"></div>
      </div>
    </div>
  );
}

export default Loader;
