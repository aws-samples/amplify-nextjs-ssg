import Link from "next/link";

export default function SSR({ formattedDate }: { formattedDate: string }) {
    return (
        <div className={"container mx-auto pt-6"}>
            <h1 className={"text-3xl"}>Server-side rendered page</h1>
            <p className={"text-md pt-6"}>
                This page is server-side rendered. It was rendered on {formattedDate}.
            </p>
            <div className={"pt-6"}>
                <Link href="/" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      aria-current="page">View this SSR static page.</Link>
            </div>

        </div>
    );
}

export async function getServerSideProps() {
    const renderDate = Date.now();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "long",
    }).format(renderDate);
    console.log(
        `SSR ran on ${formattedDate}. This will be logged in CloudWatch.`
    );
    return { props: { formattedDate } };
}
