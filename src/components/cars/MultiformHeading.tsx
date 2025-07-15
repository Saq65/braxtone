import Image from 'next/image'
import React from 'react'

interface MultiformHeaderProps {
    image?: string;
    heading?: string;
}

function MultiformHeading({ image, heading }: MultiformHeaderProps) {
    return (
        <div>
            <div className="flex items-center gap-4">
                <div>
                    <Image
                        src={image || "/default-avatar.png"}
                        alt="dania"
                        width={70}
                        height={70}
                        className="rounded-full object-cover h-auto border-2 border-white shadow"
                    />

                </div>
                <div>
                    <p className="text-lg font-semibold w-2/3">{heading}</p>
                </div>
            </div>
        </div>
    )
}

export default MultiformHeading