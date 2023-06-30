import sanityClient, { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'afjo9y1e',
  dataset: 'production',
  apiVersion: '2023-06-12',
  useCdn: true,
  token: 'skJkL8ysz4K3Dundey4RLF3XjC87xnqoaDbxHmNcaJfjT3tceDkAeSvVjDN7nreqYWYZ1naG8Ij978eCyuCa6iWIyGVCV7sG9TgZQBVc9qOCmytdI6fuwfi2e0eHlguyRIFjn2irOSVLa0AYbhBaTt57okMMkCLKjU1mc0ilR2qVRploGr4H',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);