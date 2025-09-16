import { DotLottieReact } from '@lottiefiles/dotlottie-react';



export default function Home(){
    return(
        <div className="w-full flex flex-col items-center justify-center bg-home h-[calc(100vh-64px)]">
            <h1 className='text-5xl font-bold mb-15
             md:text-6xl 
             lg:text-6xl
             md:text-6xl'>Todo app</h1>
            <div className=' p-0 max-w-xs h-auto  mb-15 md:max-w-sm
               lg:max-w-md'>
            <DotLottieReact
      src="https://lottie.host/028c5231-4ae1-432f-a504-b3fda945e2a9/FCLnb90iby.lottie"
      loop
      autoplay
      speed={0.5} 
    />
            </div>
            <div className=' mx-5 text-center text-gray-500'>
                <p className='text-xl font-semibold md:text-2xl lg:text-3xl '>Accedi per accedere alla dashboard dei todos</p>
            </div>
        </div>
    )
}