import React, { useState, useRef } from "react";
import { UploadIcon } from "lucide-react";

// notes - form component should have first name, email, phone, resume, linkedin = general greenhouse components

type FormFields = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };

  
const SubmissionForm = () => {
    const [resume, setResume] = useState<File | null>(null); // file input
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [formData, setFormData] = useState<FormFields>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      });
      

    // to manage text inputs
    const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
          }));
      };

    // to manage file inputs - get the first file if not null if nothing selected
    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setResume(file);

        console.log("Form Data:", formData);        
    };
    console.log("Resume File:", resume);

    // remove file logic
    const handleRemoveFile = () => {
        setResume(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // not answering one of the fields
        if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone || !resume) {
            alert("Please fill out all the required fields.");
            return;
        }

        // sending data to greenhouse
        const greenhouseData = new FormData()
        greenhouseData.append("first_name", formData.first_name)
        greenhouseData.append("last_name", formData.last_name)
        greenhouseData.append("email", formData.email)
        greenhouseData.append("phone", formData.phone)
        greenhouseData.append("resume", resume, resume.name)

        for (const pair of greenhouseData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const response = await fetch("/api/greenhouse", {
                method: "POST",
                body: greenhouseData,
            });

        if (!response.ok) throw new Error();
            alert("Submitted")
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
            });
            setResume(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch {
            alert("There was an error.")
        }


    }
    
    return (
    <div className="max-w-2xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Apply to Paraform
      </h1>
      <p className="text-gray-500 text-sm mb-8 text-center">
        Fill out the form below to apply for the role.
      </p>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {["first_name", "last_name", "email", "phone"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-600 mb-1 uppercase"
            >
              {field.replace("_", " ")}
            </label>
            <input
              id={field}
              value={formData[field as keyof FormFields]}
              onChange={handleTextInput}
              className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:border-blue-600 transition"
            />
          </div>
        ))}
        <div className="relative">
        <label
            htmlFor="resume"
            className="block text-sm font-medium text-gray-600 mb-1 uppercase"
        >
            Upload your Resume
        </label>
        <div className="relative">
            <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
            ref={fileInputRef}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 pr-10"
            />
            {resume && (
            <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
            >
                &times;
            </button>
            )}
        </div>
        {resume && (
            <p className="mt-1 text-sm text-gray-600"></p>
        )}
        </div>


        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md flex items-center justify-center gap-2 transition"
        >
          <UploadIcon className="w-5 h-5" />
          Submit Application
        </button>
      </form>
    </div>
  );

}
export default SubmissionForm;
