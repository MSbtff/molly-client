

export const BuySkeleton = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#EFF2F1] pb-20">
    <div className="mt-4 xs:w-[480px] sm:w-[700px] h-[200px] bg-white rounded-[10px] border p-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
    
    <div className="mt-4 xs:w-[480px] sm:w-[700px] h-[300px] bg-white rounded-[10px] border p-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-4 xs:w-[480px] sm:w-[700px] h-[100px] bg-white rounded-[10px] border p-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded-md w-full"></div>
    </div>
    
    <div className="mt-4 xs:w-[480px] sm:w-[700px] h-[180px] bg-white rounded-t-[10px] border p-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
    
    <div className="xs:w-[480px] sm:w-[700px] h-[70px] bg-gray-300 rounded-b-[10px] p-4 animate-pulse">
      <div className="flex justify-between">
        <div className="h-5 bg-gray-400 rounded w-1/4"></div>
        <div className="h-5 bg-gray-400 rounded w-1/4"></div>
      </div>
    </div>

    <div className="xs:w-[480px] sm:w-[700px] h-[60px] mt-4 animate-pulse">
      <div className="h-14 bg-gray-300 rounded-[10px] w-full"></div>
    </div>
  </div>
  )
}
