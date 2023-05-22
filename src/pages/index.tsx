import Image from 'next/image'
import {Inter} from 'next/font/google'
import Link from "next/link";

const inter = Inter({subsets: ['latin']})

interface tHomeProps {
    posts: number[],
    formattedDate: string
}

export default function Home(props: tHomeProps) {
    const {formattedDate} = props;
    return (
        <div className={"container mx-auto"}>
            <div className="ml-10 flex items-baseline space-x-4">
                <h1 className="text-3xl font-bold tracking-tight text-white-900">Static (SSG) page</h1>
                <br/>
            </div>

            <p className="text-sm text-gray-500">This page is static site generated page (SSG). It was built on {formattedDate}.</p>
            <Link href="/ssr">View a server-side rendered page.</Link>

            <p className="text-sm text-gray-500">This page demonstrates a SSG page where we pulled the data (list, detail) at the time of the build. Please click on each of the links.</p>
            <div className={"pt-6"}>
                <h3  className={"text-xl font-bold tracking-tight text-white-900"}>List of Hacker News Post IDs</h3>
                <ul className="divide-y divide-gray-200">
                    {props.posts.length > 0 && props.posts.map((postId: number) => (
                        <li key={postId} className="py-4 flex">
                            <div className="ml-3">
                                <Link href={`/${postId}`}>
                                    <p className="text-sm font-medium text-white-900">{postId}</p>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export async function getStaticProps() {
    const buildDate = Date.now();
    try {
        const formattedDate = new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
            timeStyle: "long",
        }).format(buildDate);

        const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        const postIds: number[] = await res.json();
        return {
            props: {
                posts: postIds,
                formattedDate
            }
        };
    } catch (e) {
        console.log(e);
    }
}
