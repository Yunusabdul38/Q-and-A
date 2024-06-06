import image from "../assets/apple-touch-icon.png"
export default function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-svh bg-blue-900/25">
      <div className="animate-spinner w-32 h-32 border-solid border-[5px] p-3">
        <img src={image} alt="logo"/>
      </div>
    </div>
  );
}
