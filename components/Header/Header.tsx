'use client'
import Logo from '../Logo/Logo';
// import Logo from '../Logo/Logo';
import Image from "next/image";
import { usePathname } from 'next/navigation'

//zapytac co robic, jak mamy w root Header i chcemy dowiedziec sie jakie sa params
//tylko ze uzycie hooka od razu wymusza 'use client', a tego nie chcemy,
//bo to jest po prostu logo

//dodatkowo zapytac co zrobic z przypadkiem takim jak <Recipe/> w <Home/>,
//bo home to na pewno 'use client' a recipe moze byc server, bo nie ma tam logiki


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
                        priority // change to suit your needs

                    />
                </div>
                : null
            }
        </div>
    )
}

export default Header