
import { ColorsENUM, RecipeType } from '../../types/recipeTypes';
import Chip from '../Chip/Chip';
import TextWithImageOnLeft from '../TextWithImageOnLeft/TextWithImageOnLeft';
import { getColorByDifficulty, justMe, nunito } from '../../utils';
import { useState } from 'react';
import { RecipeSkeleton } from '../RecipeSkeleton/RecipeSkeleton';
import Link from 'next/link';
import Image from "next/image";

const Recipe = ({ id, name, image, cuisine, tags, cookTimeMinutes, difficulty }: RecipeType) => {

    const [imageLoaded, setImageLoaded] = useState(false);

    {/* if image is not loaded we have to display it to make it possible to load, so firstly we 'hide it using opacity 0 and position absolute to place them apart of current layout, and then just opacity 100 */ }
    // console.log(id, imageLoaded)
    return (
        <>
            {!imageLoaded && (<RecipeSkeleton mdWidth='w-3/10' />)}
            <Link href={`/recipes/${id.toString()}`} className={`h-120 flex flex-col w-9/10 md:w-44/100 xl:w-3/10 m-5 overflow-hidden box-content rounded-xl border-solid border-1 border-black 
                ${!imageLoaded ? 'hidden' : ''}`}>

                <div className="h-2/5 w-full">

                    <div className="w-full h-full relative">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className='w-full h-full object-cover'
                            onLoad={() => {
                                console.log(`image ${id} loaded`)
                                setImageLoaded(true)
                            }}
                            //default is "lazy" - When lazy, defer loading the image until it reaches a calculated distance from the viewport.
                            //so we need 'eager' to be sure that onLoad works
                            loading='eager'


                        />
                    </div>

                </div>


                <hr />
                <div className={`${nunito.className} h-3/5 w-full bg-white flex flex-col p-5 justify-between`}>
                    <div className='flex flex-row gap-2 flex-wrap'>
                        {tags.map(tag => <Chip key={tag} color={ColorsENUM.ORANGE} >{tag}</Chip>)}
                    </div>
                    <div className={`${justMe.className} text-3xl`}>{name}</div>
                    <div className='flex flex-row justify-between'>

                        <TextWithImageOnLeft imageSrc='/images/cuisine.png' ><span className='md:text-xs lg:text-lg'>Cuisine </span></TextWithImageOnLeft>
                        <Chip color={ColorsENUM.RED} ><span className='md:text-xs lg:text-lg'>{cuisine}</span></Chip>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <TextWithImageOnLeft imageSrc='/images/time.png' ><span className='md:text-xs lg:text-lg text-nowrap '>Cooking Time </span> </TextWithImageOnLeft>
                        <Chip color={ColorsENUM.BLUE} ><span className='md:text-xs lg:text-lg'>{cookTimeMinutes} min</span></Chip>
                    </div>
                    <div className='flex' >
                        <Chip color={getColorByDifficulty(difficulty)} backgroundColor>
                            <span className='md:text-xs lg:text-lg'>{difficulty}</span>
                        </Chip>
                    </div>
                </div>
            </Link>

        </>
    );
}


export default Recipe;
