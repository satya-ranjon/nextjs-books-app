"use client";

import { useRef, useState, FormEvent } from "react";
import { Form, FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useClickOutside } from "@/hooks/use-click-outside";
import { FaTimes, FaUpload } from "react-icons/fa";
import { createBookSchema } from "@/lib/validations/book";
import { z } from "zod";
import Image from "next/image";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BookFormData = z.infer<typeof createBookSchema>;

export function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Partial<BookFormData>>({});
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    coverImage: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useClickOutside(modalRef, onClose);

  const validateForm = () => {
    try {
      createBookSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<BookFormData> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0] as keyof BookFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create book");
      }

      // Reset form and close modal
      setFormData({ title: "", author: "", coverImage: "", description: "" });
      onClose();
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, coverImage: data.url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 relative shadow-xl border border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
          <FaTimes className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Add New Book
        </h2>
        <Form onSubmit={handleSubmit}>
          <FormField label="Title" error={errors.title}>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </FormField>

          <FormField label="Author" error={errors.author}>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={formData.author}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, author: e.target.value }))
              }
            />
          </FormField>

          <FormField label="Cover Image" error={errors.coverImage}>
            <div className="space-y-2">
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500">
                  <div className="flex flex-col items-center">
                    {imagePreview ? (
                      <div className="relative w-32 h-32 mb-4">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <FaUpload className="w-8 h-8 mb-2" />
                    )}
                    <p className="text-sm">
                      {uploading
                        ? "Uploading..."
                        : "Click to upload cover image"}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
              {formData.coverImage && (
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Uploaded: {formData.coverImage}
                </p>
              )}
            </div>
          </FormField>

          <FormField label="Description" error={errors.description}>
            <Textarea
              placeholder="Enter book description (optional)"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </FormField>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Add Book
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
