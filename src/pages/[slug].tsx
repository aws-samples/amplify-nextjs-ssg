import React from 'react';
import {tHnBlogPost} from "@/types";
interface tPostProps {
    post: tHnBlogPost
}
const Post = (postProps: tPostProps) => {
    const { post} = postProps;
    const dateString = (new Date(post.time *1000)).toLocaleString();
    return (
        <div>
            <h1>{post.title} </h1>
            <p>Post Score: {post.score}</p>
            <p>Post By: {post.by}</p>
            <p>Post URL: {post.url}</p>
            <p>Post Type: {post.type}</p>
            <p>Post ID: {post.id}</p>
            <p>Post Time: {post.time}</p>
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
    const { slug } = context.params;

    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${slug}.json?print=pretty`);
    const individualPageDetail = await res.json();
    console.log(individualPageDetail, "slug data")
    return {
        props: {
            post: individualPageDetail
        }
    };
}

export default Post;
