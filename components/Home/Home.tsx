'use client'

import InputWithImage from '../InputWithImage/InputWithImage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import RecipeService from '../../api/recipeService';
import { RecipeSkeleton } from '../RecipeSkeleton/RecipeSkeleton';
import toast from 'react-hot-toast';
import useSWR from "swr";
import { useDebounce } from '../../hooks/useDebouce';
import { getColorByDifficulty, justMe } from '../../lib/utils';
import { RecipeType } from '../../types/recipeTypes';
import Recipe from '../Recipe/Recipe';
import Chip from '../Chip/Chip';
import Image from "next/image";

interface DifficultyMap {
    [key: string]: RecipeType[];
}
type Props = {
    initialRecipes: RecipeType[];
}

const ITEM_PER_LOAD = 6
const ALL_ITEM_LIMIT = 40;

const swrConfig = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
}

const Home = ({ initialRecipes }: Props) => {

    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [searchPhrase, setSearchPhrase] = useState<string>("")
    const debouncedSearch = useDebounce(searchPhrase);
    const [offset, setOffset] = useState<number>(0)
    const [limit, setLimit] = useState<number>(0)

    const { data: allRecipes, isLoading: allRecipesLoading, error: allDataError } = useSWR(
        `/recipes/search?limit=${ALL_ITEM_LIMIT}&select=tags,name,image,difficulty,cuisine,cookTimeMinutes,image`,
        RecipeService.getRecipes,
        {
            ...swrConfig,
            fallbackData: initialRecipes,
            revalidateOnMount: false,
        },
    );

    //tutaj zalezy nam na tym, zeby nie wywolywalo sie od razu. wiec albo sprawdzenie debouncedSearch?,
    //albo przekazanie do configu revalidateOnMount: false.
    const { data: filteredRecepies, isLoading: filteredRecepiesLoading, error: searchedDataError } = useSWR(
        debouncedSearch ? `/recipes/search?q=${debouncedSearch}&limit=${limit}&select=tags,name,image,difficulty,cuisine,cookTimeMinutes,image` : null,
        RecipeService.getRecipes,
        swrConfig
    );

    const isLoading = allRecipesLoading || filteredRecepiesLoading

    const transformByDifficulty = useMemo((): DifficultyMap => {
        //wywoluje sie przy pierwszym renderze i zapamietuje zwracana wartosc
        if (!allRecipes) return {};

        const difficulties = ["Easy", "Medium", "Hard"];
        return difficulties.reduce((acc: DifficultyMap, difficulty: string) => {
            acc[difficulty] = allRecipes.filter((recipe: RecipeType) => recipe.difficulty === difficulty);
            return acc;
        }, {});
    }, [allRecipes]);


    const displayedRecepies = debouncedSearch.length !== 0
        ? filteredRecepies
        : activeFilter !== 'All' ?
            transformByDifficulty[activeFilter].slice(0, offset + ITEM_PER_LOAD)
            : (console.log("Allrecipes", allRecipes), allRecipes && allRecipes.slice(0, offset + ITEM_PER_LOAD))

    const handleDifficultyFilter = (difficulty: string) => {
        if (searchPhrase !== "") {
            setSearchPhrase("");
        }
        setActiveFilter(difficulty)
        setOffset(0)
    }

    const handleLoadMore = useCallback(() => {
        setOffset(offset + ITEM_PER_LOAD)
        setLimit(limit + ITEM_PER_LOAD)
    }, [limit, offset])

    const handleSearchPhraseChange = (value: string) => {
        setSearchPhrase(value);
        setActiveFilter("All");
        setLimit(ITEM_PER_LOAD);
        setOffset(0)
    };


    useEffect(() => {
        if (allDataError) {
            toast.error("Error with all receipes occured: \n" + allDataError)
        }
    }, [allDataError])

    useEffect(() => {
        if (searchedDataError) {
            toast.error("Error with search engine occured: \n" + searchedDataError)
        }
    }, [searchedDataError])
    console.log(displayedRecepies)
    return (
        <>
            <div className='flex flex-col md:flex-row justify-between py-10 px-5 xl:px-12 gap-10 flex-wrap'>
                <InputWithImage handleInputChange={handleSearchPhraseChange} inputValue={searchPhrase} />
                <div className='flex md:flex-row-reverse gap-2 flex-row-reverse flex-wrap-reverse justify-end'>

                    {["All", "Easy", "Medium", "Hard"].reverse().map((elem: string) => (
                        <Chip
                            key={elem}
                            color={activeFilter === elem ? getColorByDifficulty(elem) : undefined}
                            backgroundColor={activeFilter === elem}
                            onClick={() => handleDifficultyFilter(elem)}
                            constantWidth={true}
                        >
                            {elem}
                        </Chip>
                    ))}

                </div>
            </div>
            <div className="relative  flex-col md:flex-row md:flex-wrap flex items-center md:items-start justify-center min-h-full">
                {displayedRecepies && displayedRecepies.map((recipe: RecipeType) => (

                    <Recipe key={recipe.id} {...recipe} />

                ))}

                {isLoading ? Array(ITEM_PER_LOAD).fill(0).map((_, idx) => <RecipeSkeleton key={idx} />) : null}
            </div>
            <div className='flex p-10 justify-center'>
                <div
                    onClick={() => {
                        if (displayedRecepies?.length !== 0) {
                            handleLoadMore()
                        }
                    }}
                    className={`w-40 h-15 justify-center ${displayedRecepies?.length === 0 ? 'cursor-default' : 'cursor-pointer'} ${justMe.className} border-solid border-1 rounded-lg p-1 flex items-center text-3xl`}>
                    {isLoading ?
                        <div className="w-1/3 h-full relative">
                            <Image
                                src={'/svg/loading.svg'}
                                alt={'loading'}
                                fill
                                className='w-full h-full object-cover'

                            />
                        </div>
                        : displayedRecepies?.length === 0 ? "Nothing found." : "Load more"}

                </div>
            </div >
        </>
    )
}

export default Home