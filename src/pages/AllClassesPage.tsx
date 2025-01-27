import React from "react";
import {useQuery} from "@tanstack/react-query"
import {useNavigate, useParams, useSearchParams} from "react-router"
import ClassDetailsCard from "@/components/ClassDetailsCard"
import {LoadingState} from "@/components/data-states/loading-state"
import {ClassPagination} from "@/components/ClassPagination"
import {searchClasses} from "@/api/public"
import useDynamicTitle from "@/hooks/useDynamicTitle"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Search} from "lucide-react"

const ITEMS_PER_PAGE = 6

export default function AllClassesPage() {
    useDynamicTitle("Classes")
    const {page} = useParams<{ page?: string }>()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const currentPage = Number.parseInt(page || "1", 10)
    const searchQuery = searchParams.get("q") || ""

    const {data: classesData, isLoading} = useQuery({
        queryKey: ["classes", currentPage, searchQuery],
        queryFn: () => searchClasses(searchQuery, currentPage, ITEMS_PER_PAGE),
    })

    const handlePageChange = (newPage: number) => {
        const newSearchParams = new URLSearchParams(searchParams)
        navigate(`/classes/${newPage}?${newSearchParams.toString()}`)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (currentPage !== 1) {
            navigate(`/classes/1?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchParams = new URLSearchParams(searchParams)
        const value = e.target.value
        if (value) {
            newSearchParams.set("q", value)
        } else {
            newSearchParams.delete("q")
        }
        setSearchParams(newSearchParams)

        if (currentPage === 1) {
            setSearchParams(newSearchParams)
        } else {
            navigate(`/classes/1?${newSearchParams.toString()}`)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 py-32 px-6 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Explore Our Classes
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Discover a wide range of fitness classes designed to help you achieve your goals. Join our
                        expert trainers and start your fitness journey today.
                    </p>
                    <form onSubmit={handleSearch} className="flex items-center justify-center gap-2">
                        <Input
                            type="text"
                            placeholder="Search classes..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="max-w-xs bg-gray-800 text-white border-gray-700 focus:border-purple-500"
                        />
                        <Button type="submit" variant="secondary">
                            <Search className="h-4 w-4 mr-2"/>
                            Search
                        </Button>
                    </form>
                </div>

                {isLoading ? (
                    <LoadingState/>
                ) : (
                    <>
                        {!classesData?.data?.length ? (
                            <div className="text-center text-gray-400 py-12">
                                <p className="text-xl">No classes found</p>
                                <p className="mt-2">Try adjusting your search criteria</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                                {classesData.data.map((classItem: any) => (
                                    <ClassDetailsCard key={classItem._id} classItem={classItem}/>
                                ))}
                            </div>
                        )}

                        {classesData && classesData.totalPages > 0 && (
                            <ClassPagination
                                search={searchQuery}
                                currentPage={currentPage}
                                totalPages={classesData.totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}