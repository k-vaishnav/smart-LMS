import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CoursesSidebar from "../components/course/CoursesSidebar";
import CoursesGrid from "../components/course/CoursesGrid";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = ["Web Dev", "Data Science", "Design", "Languages"];

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:3002/api/courses");
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? course.category?.name === selectedCategory
      : true;
    const matchesPrice =
      course.price >= priceRange[0] && course.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Skeletons for sidebar
  const renderSidebarSkeleton = () => (
    <div className="card border-0 shadow-sm p-3 h-100">
      <Skeleton height={25} width={`60%`} className="mb-3" />
      <Skeleton height={35} className="mb-3" />
      <Skeleton height={25} width={`40%`} className="mb-2" />
      <Skeleton count={4} height={25} className="mb-2" />
      <Skeleton height={35} className="mt-3" />
    </div>
  );

  // Skeletons for grid
  const renderGridSkeleton = () =>
    Array(6)
      .fill(0)
      .map((_, idx) => (
        <div className="col" key={idx}>
          <div className="card h-100 shadow-sm border-0">
            <Skeleton height={180} />
            <div className="card-body">
              <h5 className="card-title">
                <Skeleton width={`80%`} />
              </h5>
              <p className="card-text text-muted">
                <Skeleton count={2} />
              </p>
              <p className="fw-bold text-primary">
                <Skeleton width={60} />
              </p>
            </div>
          </div>
        </div>
      ));

  return (
    <section className="py-4 bg-light">
      <div className="container-fluid">
        {/* Header */}
        <div className="text-center mb-4">
          {loading ? (
            <>
              <Skeleton height={35} width={250} className="mx-auto mb-2" />
              <Skeleton height={20} width={350} className="mx-auto" />
            </>
          ) : (
            <>
              <h1 className="fw-bold">Explore Courses</h1>
              <p className="text-muted mb-0">
                Find the perfect course to learn new skills and upgrade your
                career.
              </p>
            </>
          )}
        </div>

        {/* Layout */}
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3">
            {loading ? (
              renderSidebarSkeleton()
            ) : (
              <CoursesSidebar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                onReset={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setPriceRange([0, 1000]);
                }}
              />
            )}
          </div>

          {/* Courses Grid */}
          <div className="col-lg-9">
            {loading ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                {renderGridSkeleton()}
              </div>
            ) : filteredCourses.length > 0 ? (
              <CoursesGrid courses={filteredCourses} />
            ) : (
              <div className="text-center py-5">
                <h5 className="text-muted">No courses found!</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
