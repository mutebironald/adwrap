"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Workspace() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    location: "",
  });

  const [isWorkspaceMinimized, setIsWorkspaceMinimized] = useState(false);
  const [isStepOneComplete, setIsStepOneComplete] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [mediaFormData, setMediaFormData] = useState({
    type: "",
    name: "",
    format: "",
    location: "",
    faces: "",
    landmark: "",
    availability: "",
  });

  const [isMediaFormComplete, setIsMediaFormComplete] = useState(false);
  const router = useRouter();

  // Check if workspace fields are filled
  useEffect(() => {
    const complete = Object.values(formData).every((val) => val.trim() !== "");
    setIsStepOneComplete(complete);
    if (!complete) setShowMediaForm(false);
  }, [formData]);

  // Check if media form fields are filled
  useEffect(() => {
    const complete = Object.values(mediaFormData).every(
      (val) => val.trim() !== ""
    );
    setIsMediaFormComplete(complete);
  }, [mediaFormData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMediaChange = (e) => {
    setMediaFormData({ ...mediaFormData, [e.target.name]: e.target.value });
  };

  const handleSaveAndProceed = () => {
    if (isStepOneComplete) {
      setIsWorkspaceMinimized(true);
      setShowMediaForm(true);
    }
  };

  const toggleMediaForm = () => {
    if (isStepOneComplete) {
      setShowMediaForm((prev) => !prev);
    }
  };

  const handleFinalProceed = () => {
    if (isMediaFormComplete) {
      router.push("/media-table");
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F5] p-4 space-y-4 max-w-4xl mx-auto">
      {/* Workspace Card */}
      <Card className="transition-all pt-4 cursor-pointer hover:bg-gray-50" onClick={() => setIsWorkspaceMinimized(false)}>
        <CardContent className="p-6">
          <div
            className="flex items-center space-x-4 mb-4 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm">
              1
            </div>
            <h2 className="text-lg font-semibold">Workspace Details</h2>
          </div>

          {!isWorkspaceMinimized && (
            <>
              <p className="mb-4 text-sm text-gray-600">
                Provide details for your workspace in the fields below
              </p>
              <form className="space-y-4" onClick={(e) => e.stopPropagation()}>
                <Input
                  placeholder="Business name"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  onClick={handleSaveAndProceed}
                  disabled={!isStepOneComplete}
                >
                  Save and proceed
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>

      {/* Media Summary Card */}
      <Card
        onClick={toggleMediaForm}
        className={cn(
          "cursor-pointer transition-colors",
          !isStepOneComplete && "pointer-events-none bg-gray-100"
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm">
              2
            </div>
            <h2 className="text-lg font-semibold">Add Media Items</h2>
          </div>
          <p className="text-sm text-gray-600">
            {isStepOneComplete
              ? showMediaForm
                ? "Click to hide media form"
                : "Click to add media items"
              : "(Complete previous step first)"}
          </p>
        </CardContent>
      </Card>

      {/* Media Form */}
      {showMediaForm && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Media Item Details</h2>
            <Input
              placeholder="Type"
              name="type"
              onChange={handleMediaChange}
            />
            <Input
              placeholder="Name"
              name="name"
              onChange={handleMediaChange}
            />
            <Input
              placeholder="Format"
              name="format"
              onChange={handleMediaChange}
            />
            <Input
              placeholder="Location"
              name="location"
              onChange={handleMediaChange}
            />
            <Input
              placeholder="Number of faces"
              name="faces"
              type="number"
              onChange={handleMediaChange}
            />
            <Input
              placeholder="Closest Landmark"
              name="landmark"
              onChange={handleMediaChange}
            />
            <Input
              placeholder="Availability"
              name="availability"
              onChange={handleMediaChange}
            />
          </CardContent>
        </Card>
      )}

      {/* Proceed Footer */}
      <footer className="w-full max-w-[1440px] h-[74px] bg-white fixed bottom-0 left-0 right-0 mx-auto flex items-center justify-center gap-8 px-4 shadow-footer">
        <Button
          disabled={!isMediaFormComplete}
          onClick={handleFinalProceed}
          className="w-[210px] h-[32px] px-[12px] py-[6px] gap-[8px] bg-[#7B7B7B] rounded-[6px] text-white shadow-button text-sm font-medium flex items-center justify-center"
        >
          Proceed
        </Button>
      </footer>
    </div>
  );
}
