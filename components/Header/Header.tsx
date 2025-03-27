'use client'
import Logo from '../Logo/Logo';
import Image from "next/image";
import { usePathname } from 'next/navigation'

const Header = () => {


    const pathname = usePathname()

    const isRecipePage = pathname === '/recipes'

    return (
        <div className='relative w-full h-30 md:h-60 flex items-center'>
            <Logo />
            {isRecipePage ?
                <div className="w-full h-full absolute">
                    <Image src={"/images/header-background.png"} alt={"header image"} fill // required
                        className="object-cover"
                        priority

                    />
                </div>
                : null
            }
        </div>
    )
}

export default Header