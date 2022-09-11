import logo from './logo.svg';
import './App.css';
import Form from './components/form';
import {useState} from 'react';
import ShowVideoData from './components/ShowVideoData';
import Spinner from './components/spinner'

function App() {
    const [videosData, setVideosData] = useState({})
    const [showItems, setShowItems] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [mainHeader, setMainHeader] = useState("Scrap latest Youtube videos from any Youtube Channel")
    const [loading, setLoading] = useState(false)

    return (
        <div className="App">
            <div style={{position: "sticky",
                        top: "0px",
                        backgroundColor: "#c8fbe8"}}
                 className="py-2">
            <h1 id='main-header'>
                {mainHeader}</h1>
                <hr/>
            {
            showComments === false ? <Form setLoading={setLoading} get_videos_data={setVideosData}
                showitems={setShowItems}/> : ""
        }
        </div>
        <div style={{backgroundColor: "#cafd9f"}}>
         {
            showItems ? <ShowVideoData main_header={mainHeader}
                set_main_header={setMainHeader}
                videosData={videosData}
                comments_visible={showComments}
                set_comments_visibility={setShowComments}/> : ""
        } </div> 

        {loading && <Spinner/>}
        </div>
    );
}

export default App;
