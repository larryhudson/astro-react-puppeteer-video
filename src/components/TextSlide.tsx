import React from "react";

export default function TextSlide({
    children
}: {
    children: string
}) {

    React.useEffect(() => {
        document.dispatchEvent(new CustomEvent("setDirty"))
    }, [])

    return (
        <div>
            <h1>{children}</h1>
            <div id="slide-ready"></div>
        </div>
    )
}