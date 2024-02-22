export default function TextSlide({
    children
}: {
    children: string
}) {
    return (
        <div>
            <h1>{children}</h1>
        </div>
    )
}