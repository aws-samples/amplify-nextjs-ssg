import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ formattedDate }) {
  return (
      <>
        <h1>Static page</h1>
        <p>This page is static. It was built on {formattedDate}.</p>
        <p>
          <a href="/ssr">View a server-side rendered page.</a>
        </p>
      </>
  );
}

export async function getStaticProps() {
  const buildDate = Date.now();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "long",
  }).format(buildDate);

  return { props: { formattedDate } };
}
