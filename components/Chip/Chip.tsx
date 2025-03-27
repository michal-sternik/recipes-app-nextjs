
import { nunito } from '@/lib/utils';
import { ColorsENUM } from '../../types/recipeTypes';



type ChipProps = {
    color?: ColorsENUM;
    backgroundColor?: boolean;
    children: React.ReactNode;
    onClick?: () => void,
    constantWidth?: boolean
};


const Chip = ({ color, backgroundColor, onClick, children, constantWidth }: ChipProps) => {
    const colorVariants: Record<ColorsENUM, string> = {
        [ColorsENUM.RED]: `border-[var(--color-red)]  text-[var(--color-red)]   ${backgroundColor ? 'bg-[var(--color-red)]/10' : ""}`,
        [ColorsENUM.GREEN]: `border-[var(--color-green)]  text-[var(--color-green)]   ${backgroundColor ? 'bg-[var(--color-green)]/10' : ""}`,
        [ColorsENUM.ORANGE]: `border-[var(--color-orange)]  text-[var(--color-orange)]   ${backgroundColor ? 'bg-[var(--color-orange)]/10' : ""}`,
        [ColorsENUM.BLUE]: `border-[var(--color-blue)]  text-[var(--color-blue)]   ${backgroundColor ? 'bg-[var(--color-blue)]/10 ' : ""}`,
    };

    return (
        <div
            onClick={onClick}
            className={`${color ? colorVariants[color] : "border-black"} ${onClick ? "cursor-pointer" : ""} ${constantWidth ? 'w-[90px]' : ""} ${nunito.className} border-solid border-1 rounded-lg px-5 md:px-2 lg:px-5 h-auto flex items-center justify-center `}>
            {children}
        </div>
    )
}

export default Chip