import videoHomePage from '../../assets/video-homepage.mp4'
const HomePage = (props) => {
    return (
        <div className="homepage-container">
            <h1>HomePage</h1>
            <video autoPlay loop muted  >
                <source src={videoHomePage} type="video/mp4" />
            </video>
        </div>
    );
}

export default HomePage