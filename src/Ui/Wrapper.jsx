export default function Wrapper({children,hight,width}) {
  const wrapperhight = hight?"h-fit":"h-screen"
  const wrapperWidth = width?"w-fit":"w-3/4 sm:w-2/4"
  return (
    <div className={`flex items-center justify-center font-NatoSans capitalize ${wrapperhight}`}>
    <div className={`bg-blue-900 shadow-xl px-8 py-4 text-slate-50 grid gap-4 rounded-md max-w-md ${wrapperWidth}`}>
      {children}
    </div>
  </div>
  )
}
