import Head from "next/head";

interface ISEO {
  title: string;
  description?: string;
}

const SEO = ({ title, description }: ISEO): JSX.Element => {
  const seo = {
    title: `${title} · YC`,
    description: description || `Conheça a YC`,
    image: "",
    keywords: "portifolio",
    url: "",
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content="@hyerdev" />
      <meta name="image" content={seo.image} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:locale" content="pt_BR" />

      <meta property="twitter:card" content={seo.image} />
      <meta property="twitter:url" content={seo.url} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image" content={seo.image}></meta>
    </Head>
  );
};

export default SEO;
