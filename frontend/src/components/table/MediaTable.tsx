"use client";

import React, { useState, useMemo, useEffect } from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MediaTypeToggle from "@/components/table/MediaTypeToggle";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setSelectedTab, toggleExpandedRow } from "@/store/mediaSlice";
import {
  useGetMediaItemsQuery,
  useGetWorkspaceDetailsQuery,
} from "@/store/mediaApi";

interface StaticMediaFace {
  rent: string;
  images: string;
  description: string;
  closestLandmark: string;
  id: string;
  orientation: string;
  dimension: string;
}

interface RouteInterface {
  name: string;
  distance: string;
}

export default function MediaTable({ onBack }: { onBack: () => void }) {
  const workspaceId = localStorage.getItem("workspaceId"); // This could be dynamic later
  const { data, isLoading, isError, refetch } =
    useGetMediaItemsQuery(workspaceId);

  const {
    data: workspaceDetails,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
  } = useGetWorkspaceDetailsQuery(workspaceId);


  const selectedTab = useSelector(
    (state: RootState) => state.media.selectedTab
  );

  const dispatch = useDispatch();

  const expandedRow = useSelector(
    (state: RootState) => state.media.expandedRow
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (workspaceId) {
      refetch();
    }
  }, [workspaceId]);

  const staticCount = data?.staticMedia?.length || 0;
  const polesCount = data?.streetpoles?.length || 0;

  const mediaItems = useMemo(() => {
    return selectedTab === "static"
      ? data?.staticMedia || []
      : data?.streetpoles || [];
  }, [data, selectedTab]);

  const filteredMediaItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return mediaItems;

    return mediaItems.filter((item: any) =>
      Object.values(item).some(
        (val) => typeof val === "string" && val.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, mediaItems]);

  if (isLoading) return <div>Loading media items...</div>;
  if (isError) return <div>Failed to load media items.</div>;

  return (
    <div className="min-h-screen w-full bg-[#F2F2F5] flex flex-col items-center overflow-hidden px-4 py-6">
      {/* Workspace Details */}
      <div className="bg-white rounded-[8px] p-4 w-full h-[173px] flex flex-col gap-4 mb-19">
        <h2 className="text-xl font-semibold text-gray-900">
          {workspaceDetails?.name || "Workspace"}
        </h2>
        {isWorkspaceLoading ? (
          <p className="text-sm text-gray-600">Loading workspace details...</p>
        ) : isWorkspaceError ? (
          <p className="text-sm text-red-600">
            Failed to load workspace details.
          </p>
        ) : (
          <div className="text-sm text-gray-600 flex flex-col gap-1">
            <span>{workspaceDetails?.email}</span>
            <span>{workspaceDetails?.location}</span>
            <span>{workspaceDetails?.address}</span>
          </div>
        )}
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
              <Input
                placeholder="faces"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <MediaTypeToggle
              selected={selectedTab}
              onSelect={(tab) => dispatch(setSelectedTab(tab))}
              counts={{
                static: staticCount,
                poles: polesCount,
              }}
            />
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
              {filteredMediaItems.map((item: any) => (
                <React.Fragment key={item.id}>
                  <TableRow
                    className="cursor-pointer"
                    onClick={() => dispatch(toggleExpandedRow(item.id))}
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
                    <TableCell>{item.numberOfFaces}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-sm font-medium",
                          item.availability === "Vacant" &&
                            "bg-red-100 text-red-700",
                          item.availability.toLowerCase().includes("available")
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        )}
                      >
                        {item.availability.toLowerCase()}
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
                              {item.staticMediaFaces?.map(
                                (face: StaticMediaFace, idx: number) => (
                                  <li key={idx}>
                                    {face.id} - {face.description} -{" "}
                                    {face.images} - {face.rent + "UGX"}{" "}
                                    {face.dimension}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        {item.type === "pole" && (
                          <div className="pl-4">
                            <p className="font-semibold text-gray-700 mb-2">
                              Routes:
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {item.routes?.map(
                                (route: RouteInterface, idx: number) => (
                                  <li key={idx}>
                                    {route.name} - {route.distance}
                                  </li>
                                )
                              )}
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
