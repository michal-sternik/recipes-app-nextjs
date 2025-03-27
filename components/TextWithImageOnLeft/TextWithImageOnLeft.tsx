import Image from "next/image";
type Props = {
    imageSrc: string;
    children: React.ReactNode
}

const TextWithImageOnLeft = ({ imageSrc, children }: Props) => {
    return (
        <div className='gap-2 w-10 flex flex-start flex-row items-center '>
            <div className="relative h-10 w-10 flex-shrink-0 ">
                <Image
                    src={imageSrc}
                    alt={'recipe icon'}
                    fill
                    className="object-contain"
                />
            </div>

            {children}
        </div>
    )
}

export default TextWithImageOnLeft