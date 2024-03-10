import Image from 'next/image';
import { DeleteImage } from './buttons';
import { QueryResultRow } from '@vercel/postgres';

interface Props {
    photoUrls: QueryResultRow[];
    deletedImages: string[];
    handleDeletedImages: (id: string) => void
}
export function ImagesToEdit({photoUrls, deletedImages, handleDeletedImages}: Props) {
  return (
    <div className="align-center mt-4 flex h-[18rem]">
      {photoUrls
        ?.filter((e) => !deletedImages.includes(e.photo_key))
        .map((image, index) => (
          <div key={index} className="relative mr-2">
            <Image
              src={image.photo_url}
              alt={`Thumbnail ${index}`}
              width={200}
              height={120}
              priority
            />
            <DeleteImage
              id={image.photo_key}
              handleDeletedImages={handleDeletedImages}
            />
          </div>
        ))}
    </div>
  );
}
