import { SquarePen,Image } from 'lucide-react'
import React, { useState } from 'react'
import { FaStarOfDavid } from 'react-icons/fa6'

const Images = () => {
  const [categoryId,setCategoryId]=useState(0)
  const Catgories=["Realistic","Ghibli Style"]

  return (
    <div>
      <div className=" bg-blue-50 pt-10 flex pl-10 h-screen gap-4 items-start justify-start w-full">
        {/* 1st */}
        <div className="bg-white p-8 flex flex-col items-center justify-center gap-6 w-1/2 ">
          <div className="flex items-center gap-2 justify-start">
            <FaStarOfDavid className="bg-blue-400 rounded-full text-white" />
            <h1 className="font-semibold">AI Image Generator</h1>
          </div>
          
            <div className="w-full">
                <label className='pb-4'>Describe Your Image</label>
            <textarea
              className="border  border-gray-300 outline-none rounded-xl py-4 px-8 w-full"
              placeholder="Describe what you want to see in the image..."
            />
            </div>
        

          <div className="w-full gap-2 flex flex-col">
            <p>Style</p>
            <div className='flex flex-wrap w-2/3 items-center w-full justify-start gap-3 '>
              {Catgories.map((item,index)=>(
                <div onClick={()=>setCategoryId(index)} className={`${index===categoryId?`bg-blue-400`:`bg-white`} border border-gray-200 cursor-pointer py-1 px-3 rounded-2xl `} key={index}>{item}</div>
              ))}
            </div>
          </div>

          <div className="flex cursor-pointer text-white items-center justify-center gap-2 bg-green-400 w-full py-2 rounded-3xl mt-4 ">
            <Image />
            <p>Generate Image</p>
          </div>
        </div>

        {/* 2nd */}
        <div className="bg-white p-8 flex flex-col items-center w-1/3 justify-center">
          <div className="flex items-start justify-start gap-2">
            <Image className="text-blue-400" />
            <p>Generate Image</p>
          </div>

          <div className="flex flex-col items-center justify-center p-9 h-96">
            <Image className="text-gray-300" />
            <p className="text-sm text-gray-300">Enter a topic and click "Generate Image" to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Images