export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container text-center d-flex flex-column flex-md-row align-items-center justify-content-between mt-5">
        {/* Text Section */}
        <div className="text-start">
          <h1 className="display-4 fw-bold text-primary">
            Learn Smarter with Smart LMS
          </h1>
          <p className="lead mt-3 text-secondary">
            An interactive Learning Management System to explore, learn, and grow.  
            Access courses anytime, track your progress, and achieve your goals.
          </p>
          <button className="btn btn-success btn-lg mt-3">
            Get Started
          </button>
        </div>

        {/* Image Section */}
        <div className="mt-4 mt-md-0">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Learning illustration"
            className="img-fluid rounded shadow"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container text-center mt-5">
        <h2 className="mb-4">Why Choose Smart LMS?</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm p-3 h-100">
              <h5 className="text-primary">📚 Learn Anywhere</h5>
              <p className="text-muted">
                Access courses anytime, anywhere on any device.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm p-3 h-100">
              <h5 className="text-primary">📊 Track Progress</h5>
              <p className="text-muted">
                Keep track of your learning journey with detailed reports.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm p-3 h-100">
              <h5 className="text-primary">🎯 Personalized Learning</h5>
              <p className="text-muted">
                Get course recommendations based on your goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
