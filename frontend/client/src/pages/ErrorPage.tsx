function ErrorPage() {
  const sad = ":(";
  return (
    <div className="h-screen w-screen bg-[#1C122E] flex justify-center items-center">
      <p className="text-4xl text-[#00FFFF]">Internal server error! {sad}</p>
    </div>
  )
} 

export default ErrorPage