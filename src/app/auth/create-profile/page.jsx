"use client"

import React, { useState,useMemo } from 'react'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-regular-svg-icons';
import ElasticSlider from '@/components/ElaticSlider';

export default function CreateProfilePage() {
    const [image, setImage] = useState(null);
    const [selected, setSelected] = useState(null);

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    }

    const fortes = ["Development", "Cooking", "Gaming", "Art", "Piano", "Style", "Dancing", "Singing", "Writing", "Photography", "Traveling", "Fitness", "Music", "Sports", "Crafting", "Designing", "Anime", "Movies", "Theatre", "Blogging"];
    const roundedOptions = ["rounded-md", "rounded-3xl"];
    const rotateOptions = ["rotate-0", "rotate-2", "-rotate-2"];
    const randomRoundedList = useMemo(() => {
    return fortes.map(() =>
      roundedOptions[Math.floor(Math.random() * roundedOptions.length)]
    );
  }, []);

    return (
        <div className='min-h-screen bg-[#c7b6a3]'>

            <div className='flex flex-col items-center p-2'>

                <h1 className='text-5xl mb-8'>Create Your Profile</h1>

                {/* input image */}
                <label htmlFor='profileImage' className='w-28 h-28 rounded-full bg-gray-200 cursor-pointer overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-800'>{image ?
                    (<Image src={image} alt="profile" height={100} width={100} className="w-full h-full object-cover" />)
                    : (
                        <FontAwesomeIcon icon={faCamera} className='text-2xl hover:text-gray-800' />
                    )}</label>
                <input id="profileImage" type="file" accept="image/*" className='hidden' onChange={handleImageChange} />
                <label className='m-2'>Profile image</label>
            </div>

            <div className='flex bg-white rounded-2xl m-5 p-1 shadow-lg'>

                <div className='m-6 w-[50vw] relative'>
                    <p className='m-2'>Name</p>
                    <input type="text" placeholder="Enter your name" className='border p-2 w-1/3 rounded-xl mb-6 ml-2'></input>

                    <p className='m-2'>Gen-Z Tag</p>
                    <input type="text" placeholder="Give yourself a gen-z tag" className='border p-2 w-1/3 rounded-xl mb-6 ml-2'></input>

                    <p className='m-2'>Bio</p>
                    <textarea placeholder="Tell us about yourself" className='border p-2 w-1/3 rounded-xl mb-6 ml-2'></textarea>
                </div>

                <div className='relative w-[50vw] m-6'>
                    <p>Aura points meter</p>
                    <label className='text-sm mb-5'>Give yourself a rating based on your aura points</label>

                    <ElasticSlider
                        leftIcon={<>+</>}
                        rightIcon={<>-</>}
                        startingValue={50}
                        defaultValue={0}
                        maxValue={100}
                        isStepped
                        stepSize={1}
                        className='mt-3'
                    />

                    <p className='m-2 mt-8'>What's your forte?</p>
                    <div className='flex flex-wrap gap-3'>
                        {fortes.map((item, index) => {
                            // pick a random rounded class
                            const randomRounded =randomRoundedList[index];
                            const randomRotate =rotateOptions[Math.floor(Math.random() * rotateOptions.length)];
                            const isSelected = selected === index;

                            return (
                                <div
                                    key={index}
                                    onClick={(e)=> {e.preventDefault(); setSelected(index)}}
                                    className={`relative w-28 h-8 border p-2 text-sm hover:cursor-pointer hover:bg-[#c7b6a3] hover:text-white hover:${randomRotate} transition-transform duration-300 flex items-center justify-center ${randomRounded} ${isSelected ? "bg-[#c7b6a3] border-black rotate-2" : "bg-white"}`}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}
