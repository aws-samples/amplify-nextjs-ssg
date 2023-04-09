import React from 'react';
import {tHnBlogPost} from "@/types";
interface tPostProps {
    post: tHnBlogPost
}
const Post = (postProps: tPostProps) => {
    const { post} = postProps;
    const dateString = (new Date(post.time)).toDateString();
    return (
        <div>
            <h1>{post.title} </h1>
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
