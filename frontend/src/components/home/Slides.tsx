'use client'
import { useRef } from "react";


const Slides = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    return (
        <div ref={triggerRef} className="overflow-hidden">
            <div ref={sectionRef} className=" w-[300%] flex flex-row relative "></div>
        </div>
    )
}

export default Slides