import {
  generateUploadDropzone,
} from '@uploadthing/react';

import type { OurFileRouter } from '@/pages/api/uploadthing/core';

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
