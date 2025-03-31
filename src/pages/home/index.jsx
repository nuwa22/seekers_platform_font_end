import Navbar from "../../components/navbar/index.jsx"; // Ensure correct path
import "./home.css";
import libraryImage from "../../assets/library.jpg"; // Ensure correct path

const Home = () => {
  const researchPosts = [
    {
      id: 1,
      title: "Contribute to Innovation: Your Research Matters!",
      author: "Suresh Nuwan",
      closingDate: "2026.05.12",
      image: libraryImage,
      description: `Our research platform is dedicated to collecting valuable insights from researchers across different disciplines. By participating in this survey, you will contribute to a deeper understanding of research practices, challenges, and emerging trends.`,
    },
    {
      id: 2,
      title: "Contribute to Innovation: Your Research Matters!",
      author: "Suresh Nuwan",
      closingDate: "2026.05.12",
      image: libraryImage,
      description: `Our research platform is dedicated to collecting valuable insights from researchers across different disciplines. By participating in this survey, you will contribute to a deeper understanding of research practices, challenges, and emerging trends.`,
    }
  ];

  return (
    <div className="home-container">
      <Navbar />

      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">Home</h1>
          <div className="filter-dropdown">
            <button className="filter-button">Filter your path</button>
          </div>
        </div>

        <div className="research-cards">
          {researchPosts.map((post) => (
            <div className="research-card" key={post.id}>
              <div className="card-image">
                <img src={post.image} alt="Library" />
              </div>

              <div className="card-content">
                <div className="card-header">
                  <div className="author-info">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nav-gnB7w0GUZfUbu6SrlK2K4clSIBOYwu.png"
                      alt={post.author}
                      className="author-avatar"
                    />
                    <div className="author-details">
                      <h3 className="author-name">{post.author}</h3>
                      <p className="closing-date">Closing Date : {post.closingDate}</p>
                    </div>
                  </div>
                </div>

                <h2 className="card-title">{post.title}</h2>
                <p className="card-description">{post.description}</p>

                <div className="card-actions">
                  <button className="view-button">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
