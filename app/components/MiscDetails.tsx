import React from 'react'

interface MiscDetailsProps {
    title: string;
    content: React.ReactNode;
}

const MiscDetails: React.FC<MiscDetailsProps> = ({ title, content }: MiscDetailsProps) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center w-[180px]">
            <h3 className="font-semibold my-2">{title}</h3>
            {content}
        </div>
    )
}

export default MiscDetails;