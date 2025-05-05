"use client";

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";


const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
      toast.success("uploaded successfully!");
    },
    onUploadError: () => {
      console.log("error occurred while uploading");
      toast.error("Error occurred while uploading");
    },
    onUploadBegin: (data) => {
      console.log("upload has begun for", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      console.log("submitted");
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      console.log('File', file);

      // validating the fields

      const validatedFields = schema.safeParse({ file });
      console.log(validatedFields);

      if (!validatedFields.success) {
        toast("Invalid file", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        setIsLoading(false);
        console.log(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file"
        );
        return;
      }

      // upload the file to uploadthing
      const uploadResponse = await startUpload([file]);
      console.log("resp", uploadResponse);
      if (!uploadResponse) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }

      toast.info("📁 Processing PDF");

      //parse the pdf using lang chain

      const result = await generatePdfSummary({
        fileUrl: uploadResponse[0].serverData.fileUrl,
        fileName: file.name,
      });

      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;
        toast.info("📁 Saving PDF...");
        
        if (data.summary) {
          // save summary to the database
          console.log('data.summary', data.summary)
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: uploadResponse[0].serverData.fileUrl,
            title: data.title,
            fileName: file.name,
          });
          toast.success("📁 Summary Generated!");

          formRef.current?.reset();
          setIsLoading(false);
          router.push(`/summaries/${storeResult.data.id}`)
          // redirect to single summary page
        }
      }
    
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
