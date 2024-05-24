export default function Wrapper({children}) {
  return (
    <div className="flex items-center justify-center h-screen font-NatoSans capitalize">
    <div className="bg-blue-900 shadow-xl w-3/4 sm:w-2/4 px-8 py-4 text-slate-50 grid gap-4 rounded-md max-w-md">
      {children}
    </div>
  </div>
  )
}
