import { use, useEffect, useState } from "react";
import axios from "axios";
import "../styles/courses.css";
import CoursesSidebar from "../components/course/CoursesSidebar";
import CoursesGrid from "../components/course/CoursesGrid";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/courses/recommendations`,
          {
            headers:{
              Authorization: `Bearer ${user.token}`
            }
          }
        );
        setRecommendations(data);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
      }
    }
    if(user)
      fetchRecommendations();
  }, [user]);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);

  const DEFAULT_PRICE = [0, 1000];

  // Fetch categories - In real app, fetch from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/category`);
        setCategories(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("keyword", searchTerm);
      if (selectedCategory) params.append("category", selectedCategory);
      if (
        priceRange[0] !== DEFAULT_PRICE[0] ||
        priceRange[1] !== DEFAULT_PRICE[1]
      ) {
        params.append("minPrice", priceRange[0]);
        params.append("maxPrice", priceRange[1]);
      }
      try {
        const { data } = await axios.get(
          `http://localhost:3002/api/courses?${params.toString()}`
        );
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [searchTerm, selectedCategory, priceRange]);

  const onReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange([0, 1000]);
  };

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
              />
            )}
          </div>

          {/* Courses Grid */}
          <div className="col-lg-9">
            {loading ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                {renderGridSkeleton()}
              </div>
            ) : courses.length > 0 ? (
              <CoursesGrid courses={courses} />
            ) : (
              <div className="no-courses-box text-center py-5 my-4">
                <div className="emoji mb-3">😔</div>
                <h5 className="fw-bold mb-2">No Courses Found</h5>
                <p className="text-muted mb-0">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                {/* Reset Button */}
                <button
                  className="btn btn-outline-secondary mt-3"
                  onClick={onReset}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
         
        </div>
           {/* Recommended for you */}
          {user && recommendations?.basedOnInterest?.length > 0 && (
            <section className="mt-3 p-2 mb-2">
              <h4 className="mb-2 fs-3 fw-bold">Recommended for you</h4>
              <CoursesGrid courses={recommendations.basedOnInterest} />
            </section>
          )}
          {/* popular courses */}
          {recommendations?.popular?.length > 0 && (
            <section className="mt-3 p-2 mb-2">
              <h4 className="mb-2 fs-3 fw-bold">Popular Courses</h4>
              <CoursesGrid courses={recommendations.popular} />
            </section>
          )}
      </div>
    </section>
  );
}
