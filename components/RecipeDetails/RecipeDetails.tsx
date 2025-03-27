'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import RecipeService from '@/api/recipeService';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import Chip from '@/components/Chip/Chip';
import { RecipeSkeleton } from '@/components/RecipeSkeleton/RecipeSkeleton';
import TextWithImageOnLeft from '@/components/TextWithImageOnLeft/TextWithImageOnLeft';
import { ColorsENUM } from '@/types/recipeTypes';
import Skeleton from 'react-loading-skeleton';
import Image from "next/image";
import { justMe, nunito } from '@/lib/utils';

const swrConfig = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
}


const RecipeDetails = () => {

    const params = useParams();
    const recipeId = params.id;

    const { data: recipe, error: allDataError } = useSWR(
        `/recipes/${recipeId}?select=tags,name,image,difficulty,cuisine,cookTimeMinutes,image,servings,ingredients,instructions`,
        RecipeService.getRecipeById,
        swrConfig
    );

    useEffect(() => {
        if (allDataError) {
            toast.error("Error with this recipe: \n" + allDataError)
        }
    }, [allDataError])


    return (
        <div className="flex flex-col gap-10 md:gap-20 md:m-10">
            <div className="flex flex-col md:flex-row gap-10">
                <div className=" h-80 md:h-120 w-full md:flex-1/2">
                    {recipe ? <div className="w-full h-full relative border-1 border-solid border-black">
                        <Image src={recipe.image} alt={"header image"} fill
                            className="object-cover"
                        />
                    </div> : <Skeleton className={'mt-15'} width={'100%'} height={'100%'} />}
                </div>
                <div className="md:flex-1/2">
                    {recipe ? (
                        <div className={`${nunito.className}  w-full bg-white flex flex-col p-5 justify-between gap-10`}>
                            <div className='flex flex-row gap-2 flex-wrap'>
                                {recipe.tags.map(tag => <Chip key={tag} color={ColorsENUM.ORANGE}>{tag}</Chip>)}
                            </div>
                            <div className={`${justMe.className} text-6xl`}>{recipe.name}</div>
                            <div className="flex flex-col gap-3">
                                <div className='flex flex-row justify-between'>
                                    <TextWithImageOnLeft imageSrc='/images/level.png'>Level </TextWithImageOnLeft>
                                    <Chip color={ColorsENUM.ORANGE} backgroundColor>{recipe.difficulty}</Chip>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <TextWithImageOnLeft imageSrc='/images/servings.png'>Servings </TextWithImageOnLeft>
                                    <Chip color={ColorsENUM.ORANGE}>{recipe.servings}</Chip>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <TextWithImageOnLeft imageSrc='/images/cuisine.png'>Cuisine </TextWithImageOnLeft>
                                    <Chip color={ColorsENUM.RED}>{recipe.cuisine}</Chip>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <TextWithImageOnLeft imageSrc='/images/time.png'><span className='text-nowrap '>Cooking Time </span> </TextWithImageOnLeft>
                                    <Chip color={ColorsENUM.BLUE}>{recipe.cookTimeMinutes} min</Chip>
                                </div>

                            </div>
                        </div>)
                        : <RecipeSkeleton mdWidth={'w-1/1'} />}
                </div>
            </div>
            {recipe &&
                <div className="flex flex-col-reverse md:flex-row gap-20 mb-10 ">
                    <div className="h-auto w-full md:flex-5/10 pt-5 pl-5">
                        <p className={`${justMe.className} text-6xl mb-10`}>Instructions</p>
                        <ul className="flex flex-col gap-5">
                            {recipe.instructions.map((instruction, idx) => <li key={idx} className={`${nunito.className} text-xl`}>{idx + 1}. {instruction}</li>)}
                        </ul>
                    </div>
                    <div className="h-auto md:flex-5/10 border-black border-solid border-1 pt-5 pb-10 rounded-lg">
                        <p className={`${justMe.className} text-6xl pl-5 md:pl-10 mb-10`}>Ingredients</p>
                        <div className="pl-15 lg:pl-20">
                            <ul className="flex flex-col gap-5 list-disc">
                                {recipe.ingredients.map((ingredient, idx) => <li key={idx} className={`${nunito.className} font-bold text-xl`}>{ingredient}</li>)}
                            </ul>
                        </div>
                    </div>

                </div>
            }

        </div>



    )
}

export default RecipeDetails