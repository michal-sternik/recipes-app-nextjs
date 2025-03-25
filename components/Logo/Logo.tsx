
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { justMe } from "@/utils";

const Logo = () => {

    const router = useRouter()
    const pathname = usePathname()
    const isRecipeDetailPage = /^\/recipes\/[^/]+$/.test(pathname)


    return (
        <div className={`relative w-full h-1/3 z-1 flex ${isRecipeDetailPage ? 'text-black' : 'text-white'}  flex-row justify-between items-center`}>
            {isRecipeDetailPage && <div
                onClick={() => router.back()}
                className={`${justMe.className} mx-5 w-35 h-10 justify-center cursor-pointer border-solid border-1 rounded-lg p-1 flex items-center text-md lg:text-2xl`}>
                Go back
            </div>}
            <hr className=' w-2/5' />
            <div className='mx-10 flex flex-row items-center justify-center h-full object-contain'>

                <div className="w-10 md:w-17 h-full relative">
                    <Image src={`/images/${isRecipeDetailPage ? 'logo-black.png' : 'logo.png'}`} alt={"header image"} fill // required
                        className="object-cover"


                    />
                </div>

                <span className={`${justMe.className} text-3xl md:text-6xl px-5 whitespace-nowrap`}> Recipe Book </span>
            </div>
            <hr className={`${isRecipeDetailPage ? 'w-0' : "w-2/5"} md:w-2/5`} />
        </div>
    );
};

export default Logo;
