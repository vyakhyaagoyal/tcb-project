"use client"

import React, { useState, useMemo } from 'react'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-regular-svg-icons';
import ElasticSlider from '@/components/ElasticSlider';
import { createClient } from "@/lib/supabase/client";

export default function CreateProfilePage() {
    const supabase = createClient();
    const [imagePreview, setImagePreview] = useState(null); // preview URL shown to user
    const [name, setName] = useState("");
    const [tag, setTag] = useState("");
    const [bio, setBio] = useState("");
    const [aura, setAura] = useState(50);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [selected, setSelected] = useState(null);

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }

    const clickSaveButton = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSaving(true);

        try {
            const { data: { user }, error: userErr } = await supabase.auth.getUser();
            if (userErr || !user) {
                throw new Error("Not authenticated. Please log in.");
            }
            const userId = user.id;

            const profile = {
                user_id: userId,
                name: name || null,
                genz_tag: tag || null,
                bio: bio || null,
                aura_points: aura ?? 0,
                forte: selected !== null ? fortes[selected] : null,
                // avatar_url: avatarUrl,
                updated_at: new Date().toISOString()
            };

            //upsert into profiles table
            const {data:upserted,error:upsertError}=await supabase
            .from('profiles')
            .upsert(profile,{returning:'representation'});

            if(upsertError){
                throw upsertError;
            }
            // console.log('Saving profile, aura state =', aura);
            setIsSaving(false);
            alert("profile saved");

        }
        catch (err) {
            setError(err.message);
            setIsSaving(false);
            console.error(err);
        }

    }

    const fortes = ["Development", "Cooking", "Gaming", "Art", "Fashion", "Dancing", "Singing", "Writing", "Photography", "Traveling", "Fitness", "Music", "Sports", "Designing", "Influencer", "Movies", "Theatre", "Blogging"];
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
                <h1 className='text-5xl m-8'>Create Your Profile</h1>
                {/* input image */}
                <label htmlFor='profileImage' className='w-28 h-28 rounded-full bg-gray-200 cursor-pointer overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-800 hover:scale-105 transition hover:shadow-lg'>{image ?
                    (<Image src={image} alt="profile" height={100} width={100} className="w-full h-full object-cover" />)
                    : (
                        <FontAwesomeIcon icon={faCamera} className='text-2xl hover:text-gray-800' />
                    )}</label>
                <input id="profileImage" type="file" accept="image/*" className='hidden' onChange={handleImageChange} />
                <label className='m-2'>Profile image</label>
            </div>

            <div className="flex flex-col">

                <div className='flex backdrop-blur-xl bg-white/80 rounded-2xl m-5 p-1 shadow-xl'>

                    <div className='m-6 w-[50vw] relative'>
                        <p className='m-2'>Name</p>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className='border p-2 w-[90%] rounded-xl mb-6 ml-2'></input>

                        <p className='m-2'>Gen-Z Tag</p>
                        <input type="text" value={tag} onChange={e => setTag(e.target.value)} placeholder="Give yourself a gen-z tag" className='border p-2 w-[90%] rounded-xl mb-6 ml-2'></input>

                        <p className='m-2'>Bio</p>
                        <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Flex your personality (but like, in a cute way)" className='border p-2 w-[90%] rounded-xl mb-6 ml-2'></textarea>
                    </div>

                    <div className='relative w-[50vw] m-6'>
                        <p>Aura points meter</p>
                        <label className='text-sm mb-5'>Give yourself a rating based on your aura points. Your vibe score. No pressure</label>

                        <ElasticSlider
                            leftIcon={<>-</>}
                            rightIcon={<>+</>}
                            // startingValue={0}
                            // defaultValue={aura}
                            maxValue={100}
                            isStepped
                            stepSize={1}
                            className='mt-3'
                            onChange={(v) => setAura(Number(v))}
                            value={aura}
                        />

                        <p className='mt-5 mb-3'>Forte? Pick your main character energy</p>
                        <div className='flex flex-wrap gap-3'>
                            {fortes.map((item, index) => {
                                // pick a random rounded class
                                const randomRounded = randomRoundedList[index];
                                const randomRotate = rotateOptions[Math.floor(Math.random() * rotateOptions.length)];
                                const isSelected = selected === index;

                                return (
                                    <div
                                        key={index}
                                        onClick={(e) => { e.preventDefault(); setSelected(index) }}
                                        className={`relative w-28 h-8 border p-2 text-sm hover:cursor-pointer hover:bg-[#c7b6a3] hover:text-white hover:${randomRotate} transition-transform duration-300 flex items-center justify-center ${randomRounded} ${isSelected ? "bg-[#c7b6a3] border-black rotate-2" : "bg-white"}`}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <button className="mx-auto px-5 py-3 bg-linear-to-r from-pink-600 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition mb-5 hover:cursor-pointer"
                    onClick={clickSaveButton}
                    disabled={isSaving}
                >
                    {isSaving?"Saving...":"Save Profile"}
                </button>

            </div>
        </div>
    )
}


