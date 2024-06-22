import { useState } from "react";

export const useFileUpload = () => {
  const [fileArray, setFileArray] = useState<any[]>([]);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setIsFileUploading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GEN_API}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      const data = await response.json();
      setFileArray((prevFileArray) => [...prevFileArray, data]);
      return { success: true, message: "File Uploaded Successfully!" };
    } catch (error) {
      console.error("Error uploading file:", error);
      return { success: false, message: "File Upload Failed." };
    } finally {
      setIsFileUploading(false);
    }
  };

  return { fileArray, handleFileUpload, isFileUploading };
};
