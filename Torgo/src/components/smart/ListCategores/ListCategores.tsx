import React from 'react'

export interface ListCategoresProps{
  id: number;
  name: string;
  photo_url: string;
}

const ListCategores = (images: ListCategoresProps) => {
  return (
    <>
        <div key={images.id} className="flex flex-col items-center gap-3">
          <img
            src={images.photo_url}
            alt={`Image ${images.id}`}
            className="w-32 h-32 border-4 border-[#3D9637] rounded-full"
          />
          <p className="text-xl font-semibold text-[#244622]">{images.name}</p>
        </div>
    </>
  )
}

export default ListCategores
