import Wrapper from "./components/Wrapper/Wrapper";
import "./App.css";
import Card from "./components/Card/Card";
import { useEffect, useState, useRef } from "react";
import { icons } from "./assets/icons/icons";

function App() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true);
  const mainRef = useRef(null);

  const formatRating = (rating) => {
    return rating >= 1000 ? `${(rating / 1000).toFixed(1)}k` : rating;
  };

  const fetchData = async (currentPage) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:%3e2024-07-15&sort=stars&order=desc&page=${currentPage}`
      );
      const data = await response.json();

      if (data?.message) {
        
        setHasMore(false);
      }
      
      if (data?.items.length > 0) {
        setRepos((prevRepos) => [...prevRepos, ...data.items]);
      }

      
    } catch (error) {
      console.error("Error fetching repositories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page)
  }, [page])

  const handleScroll = () => {
    if (!mainRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = mainRef.current;

    // Check if user scrolled near the bottom
    if (scrollHeight - scrollTop <= clientHeight + 50 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div className="App">
      <header>
        <Wrapper>
          <h1>Trending Repos</h1>
        </Wrapper>
      </header>
      <main ref={mainRef} className="main">
        <div className="items">
          {repos.map(item => (
            <Card
              key={item}
              title={item.name}
              description={item.description}
              imgText={item.owner.login}
              rating={formatRating(item.stargazers_count)}
              ImgIcon={item.owner.avatar_url}
            />
          ))}
        </div>
        {loading && <div style={{padding: '0 0 .5rem 2em'}}>Loading more repositories...</div>}
        {!hasMore && <div style={{padding: '0 0 .5rem 2rem'}}>No more repositories to load.</div>}
      </main>
      <footer>
        <Wrapper>
          <div className="footer-content">
            <div>
              <img src={icons.BlueStarIcon} alt="Star icon" />
              <p className="active">Trending</p>
            </div>
            <div>
              <img src={icons.SettingsIcon} alt="Star icon"  />
              <p>Setings</p>
            </div>
          </div>
        </Wrapper>
      </footer>
      
    </div>
  );
}

export default App;
