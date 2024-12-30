import React from "react";

const NewsSection = () => {
  return (
    <section className="flex flex-col w-full">
      <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold self-start">
        News
      </h2>
      <img
        loading="lazy"
        src="/images/news-bg.png"
        alt="Latest news"
        className="min-h-52 object-cover gap-4 mt-4 w-full rounded-2xl md:rounded-3xl xl:rounded-4xl max-md:max-w-full"
      />
    </section>
  );
};

export default NewsSection;
