import slugify from "slugify";

export const toSlugify = (slug: string) =>
  slugify(slug, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });

export const prodcutSlug = (product: ProductResponse) =>
  `/product/${toSlugify(product.name)}-${product.id}.html`;

export const prodcutSlugToId = (slug: string) => {
  const id = slug.substring(slug.lastIndexOf("-") + 1, slug.lastIndexOf("."));
  console.log(id);
  return;
};
