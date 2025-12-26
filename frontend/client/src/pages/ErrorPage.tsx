function ErrorPage() {
  const sad = ":(";
  return (
    <div className="h-screen w-screen bg-[#1C122E] flex justify-center items-center">
      <p className="text-4xl text-[#00FFFF]">Page Not Found {sad}</p>
    </div>
  )
} 

export default ErrorPage