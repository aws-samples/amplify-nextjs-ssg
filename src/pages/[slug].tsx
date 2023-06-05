import React from 'react';
import {tHnBlogPost} from "@/types";

interface tPostProps {
    post: tHnBlogPost
}

const Post = (postProps: tPostProps) => {
    const {post} = postProps;
    const dateString = (new Date(post.time * 1000)).toLocaleString();
    return (
        <div className={"container mx-auto"}>
            <h1 className={"text-xl text-white-500"}>SSG detailed page</h1>
            <h3 className={"text-3xl text-white-500"}>{post.title} </h3>
            <p className={"pt-6 text-lg font-bold text-white-500"}> Post Score:</p>
            <p className={"text-md  text-white-500"}>{post.score}</p>

            <p className={"pt-6 text-lg font-bold text-white-500"}> Post By:</p>
            <p className={"text-md  text-white-500"}>{post.by}</p>

            <p className={"pt-6 text-lg font-bold text-white-500"}> Post URL:</p>
            <p className={"text-md  text-white-500"}>{post.url}</p>

            <p className={"pt-6 text-lg font-bold text-white-500"}> Post Type:</p>
            <p className={"text-md  text-white-500"}>{post.type}</p>

            <p className={"pt-6 text-lg font-bold text-white-500"}> Post ID:</p>
            <p className={"text-md  text-white-500"}>{post.id}</p>

            <p className={"pt-6 text-lg font-bold text-white-500"}> Post Time:</p>
            <p className={"text-md  text-white-500"}>{post.time}</p>

            <p className={"pt-6 text-lg font-bold text-white-500"}> Date fetched:</p>
            <p> {dateString} </p>
        </div>
    );
};

export const getStaticPaths = async () => {
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    const posts: number[] = await res.json();

    const paths = posts.splice(0, 100).map((postId: number) => ({
        params: {
            slug: String(postId)
        },
    }));

    return {
        paths,
        fallback: false
    };
}

export const getStaticProps = async (context: any) => {
    const {slug} = context.params;

    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${slug}.json?print=pretty`);
    const individualPageDetail = await res.json();
    return {
        props: {
            post: individualPageDetail
        }
    };
}

export default Post;