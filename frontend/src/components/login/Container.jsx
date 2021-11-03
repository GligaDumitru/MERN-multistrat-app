export default function Container({ children }) {
    return (
        <div className="mx-auto my-8 md:my-0 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="max-w-sm w-96">{children}</div>
        </div>
    );
}
