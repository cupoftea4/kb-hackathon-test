import { RefObject } from "react";

const uploadImage = async (inputFileRef: RefObject<HTMLInputElement>) => {
  if(!inputFileRef.current) return console.error('No file selected.');

  if (inputFileRef.current?.files && inputFileRef.current.files.length > 0) {
    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID aca6d2502f5bfd8',
        },
        body: formData,
      });
      const jsonResponse = await response.json();

      if (response.ok) {
        console.log(jsonResponse);
        const photo = jsonResponse.data.link;
        return photo;
        // const photo_hash = jsonResponse.data.deletehash;
      } else {
        throw new Error(jsonResponse.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    console.error('No file selected.');
  }
};

export default uploadImage;
