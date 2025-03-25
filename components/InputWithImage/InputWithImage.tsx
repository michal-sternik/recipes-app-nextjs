
import Image from "next/image";

interface InputProps {
    handleInputChange: (input: string) => void,
    inputValue: string
}

const InputWithImage = ({ handleInputChange, inputValue }: InputProps) => {


    return (
        <div className=" w-full md:w-[320px] p-1 gap-2 flex items-center justify-center border border-black rounded-lg">

            <div className="h-6 relative ml-3 w-6 flex-shrink-0">
                <Image
                    src={'/images/loupe.png'}
                    alt={'search box'}
                    fill
                    className='w-full h-full object-cover'

                />
            </div>

            <input
                type="text"
                onChange={(e) => {
                    handleInputChange(e.target.value)
                }}
                value={inputValue}
                className="border-none outline-none w-full h-auto"
            />
        </div>
    );
};

export default InputWithImage

