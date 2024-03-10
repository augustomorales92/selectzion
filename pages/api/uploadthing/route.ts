import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
import { UTApi } from "uploadthing/server";
 
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

export async function DeleteImages(urls: string | string[]) {
  const utapi = new UTApi();
  await utapi.deleteFiles(urls);
}