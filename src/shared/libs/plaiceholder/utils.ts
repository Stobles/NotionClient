import { getPlaiceholder } from "plaiceholder";

export async function getLocalBase64(imageUrl: string) {
  try {
    const src = `http://localhost:3000/${imageUrl}`;

    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );

    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (err) {
    err;
  }
}
