"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

interface UploadFormInputProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}

export const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(function UploadFormInput({ onSubmit, isLoading }, ref) {
  return (
    <form onSubmit={onSubmit} ref={ref} className="flex flex-col gap-6">
      <div className="flex justify-end items-center gap-1.5">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className={cn(isLoading && 'opacity-50 cursor-not-allowed')}
          disabled={isLoading}
        />
        <Button disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Processing...</> : "Upload your PDF"}</Button>
      </div>
    </form>
  );
});


export default UploadFormInput;


