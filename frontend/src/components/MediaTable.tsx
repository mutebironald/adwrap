"use client";

import { useState } from "react";
import React from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MediaTypeToggle from "@/components/MediaTypeToggle";
import { cn } from "@/lib/utils";

import { Search } from "lucide-react";
const mediaItems = [
  {
    id: "B-ID 001",
    type: "static",
    location: "Kyebando Central",
    format: "Standard",
    faces: "1 Face",
    availability: "Occupied",
    rent: "UGX 3,000,000",
    staticMediaFaces: [
      { id: "Face A", orientation: "North", dimension: "6x3m" },
      { id: "Face B", orientation: "South", dimension: "6x3m" },
    ],
  },
  {
    id: "P-ID 002",
    type: "pole",
    location: "Bukoto Road",
    format: "Pole",
    faces: "2 Faces",
    availability: "Vacant",
    rent: "UGX 1,500,000",
    routes: [
      { name: "Route 1", distance: "1km" },
      { name: "Route 2", distance: "500m" },
    ],
  },
];


// const mediaItems = [
//   {
//     id: "B-ID 001",
//     type: "static", // billboard
//     location: "Kyebando Central",
//     description: "Along Kisaasi road",
//     format: "Standard",
//     faces: "1 Face",
//     availability: "Occupied",
//     rent: "UGX 3,000,000",
//     staticMediaFaces: [
//       { id: "Face A", orientation: "North", dimension: "6x3m" },
//       { id: "Face B", orientation: "South", dimension: "6x3m" },
//     ],
//   },
//   {
//     id: "P-ID 002",
//     type: "pole", // street pole
//     location: "Bukoto Road",
//     description: "Near Bukoto flats",
//     format: "Pole",
//     faces: "2 Faces",
//     availability: "Vacant",
//     rent: "UGX 1,500,000",
//     routes: [
//       { name: "Route 1", distance: "1km" },
//       { name: "Route 2", distance: "500m" },
//     ],
//   },
// ];

export default function MediaTable({ onBack }: { onBack: () => void }) {
  const [selectedTab, setSelectedTab] = useState("static");

  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#F2F2F5] flex flex-col items-center overflow-hidden px-4 py-6">
      {/* Workspace Details */}
      <div className="bg-white rounded-[8px] p-4 w-full h-[173px] flex flex-col gap-4 mb-19">
        <h2 className="text-xl font-semibold text-gray-900">Workspace Name</h2>
        <p className="text-sm text-gray-600">
          Details about the workspace, ownership, location, or anything you want
          to show here.
        </p>
      </div>

      {/* White Card containing Media Items Title, Search, Toggle, Table */}
      <div className="bg-white rounded-[8px] p-6 w-full flex flex-col gap-6">
        {/* Media Items Title */}
        <h2 className="text-xl font-semibold text-gray-900">Media Items</h2>

        {/* Search + Media Type Toggle */}
        <div className="bg-[#F6F7FB] p-[5px] rounded-[4px]">
          <div className="flex flex-col gap-4">
            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="faces" className="pl-10" />
            </div>

            <MediaTypeToggle selected={selectedTab} onSelect={setSelectedTab} />
          </div>
        </div>

        {/* Media Table */}
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader className="bg-[#F6F7FB]">
              <TableRow>
                <TableHead>
                  <input type="checkbox" />
                </TableHead>
                <TableHead className="text-xs text-gray-600">
                  Media ID
                </TableHead>
                <TableHead className="text-xs text-gray-600">
                  Location
                </TableHead>
                <TableHead className="text-xs text-gray-600">
                  Description
                </TableHead>
                <TableHead className="text-xs text-gray-600">
                  Media Format
                </TableHead>
                <TableHead className="text-xs text-gray-600">Faces</TableHead>
                <TableHead className="text-xs text-gray-600">
                  Availability
                </TableHead>
                <TableHead className="text-xs text-gray-600">Rent</TableHead>
                <TableHead className="text-xs text-gray-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mediaItems.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow
                    className="cursor-pointer"
                    onClick={() =>
                      setExpandedRow(expandedRow === item.id ? null : item.id)
                    }
                  >
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell className="text-blue-600 underline">
                      {item.id}
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.format}</TableCell>
                    <TableCell>{item.faces}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-sm font-medium",
                          item.availability === "Vacant" &&
                            "bg-red-100 text-red-700",
                          item.availability.includes("Occupied") &&
                            "bg-green-100 text-green-700"
                        )}
                      >
                        {item.availability}
                      </span>
                    </TableCell>
                    <TableCell>{item.rent}</TableCell>
                    <TableCell>⋮</TableCell>
                  </TableRow>

                  {expandedRow === item.id && (
                    <TableRow>
                      <TableCell colSpan={9} className="bg-gray-50">
                        {item.type === "static" && (
                          <div className="pl-4">
                            <p className="font-semibold text-gray-700 mb-2">
                              Faces:
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {item.staticMediaFaces?.map((face, idx) => (
                                <li key={idx}>
                                  {face.id} - {face.orientation} -{" "}
                                  {face.dimension}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.type === "pole" && (
                          <div className="pl-4">
                            <p className="font-semibold text-gray-700 mb-2">
                              Routes:
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {item.routes?.map((route, idx) => (
                                <li key={idx}>
                                  {route.name} - {route.distance}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            Each page is showing a maximum of 20 items
          </span>
          <div className="flex gap-2 items-center">
            <button className="text-sm px-2 py-1 rounded bg-white">◀</button>
            <button className="text-sm px-2 py-1 rounded bg-white">1</button>
            <button className="text-sm px-2 py-1 rounded bg-white">2</button>
            <span>...</span>
            <button className="text-sm px-2 py-1 rounded bg-white">12</button>
            <button className="text-sm px-2 py-1 rounded bg-white">▶</button>
          </div>
          <span className="text-sm text-blue-600 cursor-pointer">View All</span>
        </div>
      </div>
      {/* Back & Proceed Buttons */}
      <div className="w-full max-w-[1440px] mt-auto py-6 flex flex-col md:flex-row items-center justify-center gap-2 bg-[#F2F2F5]">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 w-[210px] h-[32px] rounded-[6px] px-3 py-[6px] text-sm text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          disabled
          className="flex items-center justify-center gap-2 w-[210px] h-[32px] rounded-[6px] px-3 py-[6px] text-sm text-white bg-blue-500 opacity-50 cursor-not-allowed"
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
