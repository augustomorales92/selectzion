import { createRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from './core';
import { UTApi } from 'uploadthing/server';

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(request: Request) {
  const urls = await request.json();
  const utapi = new UTApi();
  await utapi.deleteFiles(urls);
}
