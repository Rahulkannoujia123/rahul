import { getServerSideSitemap } from "next-sitemap";
import { slugify } from "../../utils/link";

export const getServerSideProps = async ctx => {
    const response = await fetch("https://physicsclass.co/api/posts?fields=items(title,id)");
    const capsules = await response.json();
    const fields = capsules.items.map(post => ({
        loc: `https://physicsclass.co${slugify(post.title, post.id)}`,
        lastmod: new Date().toISOString(),
    }));

    return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
