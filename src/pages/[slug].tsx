import React from 'react';
interface tPostProps {
    post: tHnBlogPost
}

interface tHnBlogPost {
    by:          string;
    descendants: number;
    id:          number;
    kids:        number[];
    score:       number;
    time:        number;
    title:       string;
    type:        string;
    url:         string;
}

export const Post = (postProps: tPostProps) => {
    const { post} = postProps;
    const dateString = (new Date(post.time)).toDateString();
    return (
        <div>
            <h1>{post.title} </h1>
            <p> {dateString} </p>
        </div>
    );
};

// export const getStaticPaths = async () => {
//     const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
//     const posts: string[] = await res.json();
//
//     console.log(posts, "posts");
//     const paths = posts.splice(0, 100).map((post: any) => ({
//         params: {
//             slug: post.slug
//         },
//     }));
//
//     return {
//         paths,
//         fallback: false
//     };
// }
//
// export const getStaticProps = async (context: any) => {
//     const { slug } = context.params;
//     const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${slug}.json?print=pretty`);
//     const individualPageDetail = await res.json();
//     console.log(individualPageDetail, "slug data")
//     return {
//         props: {
//             post: individualPageDetail[0]
//         }
//     };
// }

