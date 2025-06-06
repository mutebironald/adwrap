"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { useDispatch } from "react-redux";

import { setWorkspaceData, setWorkspaceId } from "@/store/workspaceSlice";

import {
  useSaveMediaItemMutation,
  useSaveWorkspaceMutation,
} from "@/store/mediaApi";

export default function Workspace() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    location: "",
  });

  const [isWorkspaceMinimized, setIsWorkspaceMinimized] = useState(false);
  const [isStepOneComplete, setIsStepOneComplete] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  type Face = {
    description: string;
    images: string[];
    rent: number;
    availability: string;
  };

  const [mediaFormData, setMediaFormData] = useState<{
    type: string;
    name: string;
    format: string;
    location: string;
    faces: Face[];
    landmark: string;
    availability: string;
    number_of_faces: string;
  }>({
    type: "",
    name: "",
    format: "",
    location: "",
    number_of_faces: "",
    landmark: "",
    availability: "",
    faces: [],
  });

  const [newFace, setNewFace] = useState({
    description: "",
    images: "",
    rent: "",
    availability: "",
  });

  const [saveMediaItem] = useSaveMediaItemMutation();
  const [saveWorkspace] = useSaveWorkspaceMutation();

  const handleFaceChange = (e) => {
    const { name, value } = e.target;
    setNewFace({ ...newFace, [name]: value });
  };

  const addFace = () => {
    if (!newFace.description || !newFace.rent || !newFace.availability) return;

    setMediaFormData({
      ...mediaFormData,
      faces: [
        ...mediaFormData.faces,
        {
          ...newFace,
          images: newFace.images.split(",").map((img) => img.trim()), // parse CSV to array
          rent: parseFloat(newFace.rent),
        },
      ],
    });

    // Reset face form
    setNewFace({ description: "", images: "", rent: "", availability: "" });
  };

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
    const complete = Object.entries(mediaFormData).every(([key, val]) => {
      if (key === "faces") return Array.isArray(val) && val.length > 0;
      return typeof val === "string" && val.trim() !== "";
    });

    setIsMediaFormComplete(complete);
  }, [mediaFormData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMediaChange = (e) => {
    setMediaFormData({ ...mediaFormData, [e.target.name]: e.target.value });
  };

  const handleSaveAndProceed = async () => {
    try {
      // Optionally push form data to Redux
      dispatch(setWorkspaceData(formData));

      const response = await saveWorkspace(formData).unwrap();

      //defaulting this to 1 incase one has seeded table 
      const workspaceId = response?.id ?? 1;

      if (workspaceId) {
        localStorage.setItem("workspaceId", workspaceId);
        dispatch(setWorkspaceId(workspaceId));
      }

      if (isStepOneComplete) {
        setIsWorkspaceMinimized(true);
        setShowMediaForm(true);
      }
    } catch (err) {
      console.error("Failed to save workspace:", err);
    }
  };

  const toggleMediaForm = () => {
    if (isStepOneComplete) {
      setShowMediaForm((prev) => !prev);
    }
  };

  const handleFinalProceed = async () => {
    try {
      await saveMediaItem(mediaFormData).unwrap();
      router.push("/media-table");
    } catch (err) {
      console.error("Error saving media item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F5] p-4 space-y-4 max-w-4xl mx-auto">
      {/* Workspace Card */}
      <Card
        className="transition-all pt-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsWorkspaceMinimized(false)}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4 cursor-pointer">
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
            <select
              name="type"
              value={mediaFormData.type}
              onChange={handleMediaChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Type</option>
              <option value="static">Static</option>
              <option value="streetpole">Streetpole</option>
            </select>

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
              name="number_of_faces"
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
            <div className="border p-4 rounded space-y-2">
              <h3 className="text-md font-semibold">Add Faces</h3>
              <Input
                placeholder="Description"
                name="description"
                value={newFace.description}
                onChange={handleFaceChange}
              />
              <Input
                placeholder="Images (comma-separated)"
                name="images"
                value={newFace.images}
                onChange={handleFaceChange}
              />
              <Input
                placeholder="Rent"
                name="rent"
                type="number"
                value={newFace.rent}
                onChange={handleFaceChange}
              />
              <Input
                placeholder="Availability"
                name="availability"
                value={newFace.availability}
                onChange={handleFaceChange}
              />
              <Button type="button" onClick={addFace}>
                Add Face
              </Button>

              {/* Show preview of faces added */}
              {mediaFormData.faces.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {mediaFormData.faces.map((face, idx) => (
                    <li key={idx}>
                      {face.description} – {face.availability} – ${face.rent}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
