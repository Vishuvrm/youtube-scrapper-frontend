import React, {useEffect, useState} from 'react'
import CommentsPopup from "./CommentsPopup"
import youtube_logo from "../static/images/youtube.png"
import download_logo from "../static/images/downloading.png"
import view from "../static/images/view.png"
import open_logo from "../static/images/open.png"
import Spinner from './spinner'

function ShowVideoData(props) {

    const [comments, setComments] = useState([])
    const [downloadLink, setDownloadLink] = useState({})
    const [downloading, setDownloading] = useState(false)
    const [activeDownloadingLink, setActiveDownloadingLink] = useState("")
    const [loadingComments, setLoadingComments] = useState(false)
    const [activecommentsLink, setActiveCommentsLink] = useState("")

    const get_comments = async (video_url) => {
        setLoadingComments(true);
        setActiveCommentsLink(video_url);

        const request_options = {
            method: "POST",
            headers: {
                "X-CSRFToken": window.CSRF_TOKEN,
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {url: video_url}
            )
        };


        let comments_response = await fetch("http://127.0.0.1:8000/scrap/get-comments", request_options)
        comments_response = await comments_response.json();

        setComments(comments_response)

        props.set_comments_visibility(true)
        props.set_main_header("Displaying comments for the video")
        setLoadingComments(false)
    }
    

    const download_video = async (video_url) => {
        // setLoading(true);
        setDownloading(true)
        setActiveDownloadingLink(video_url)
        const request_options = {
            method: "POST",
            headers: {
                "X-CSRFToken": window.CSRF_TOKEN,
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {url: video_url}
            )
        };


        let result = await fetch("http://127.0.0.1:8000/scrap/download-video", request_options)
        result = await result.json();

        if (result){
            const downloadLinkObj = Object.assign({}, downloadLink)
            const url = result["video_link"]
            const download_link = result["download_link"]
            downloadLinkObj[url] = download_link
            setDownloadLink(downloadLinkObj)
    }
    setDownloading(false)
    }
    
    return (

        <div>
            {
            props.comments_visible ? <CommentsPopup comments={comments}
                showComments={props.set_comments_visibility} set_main_header = {props.set_main_header}/> : <table className="table-bordered border-dark mx-2 my-2">
                <thead>
                    <tr>
                        <th>Watch on YouTube</th>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Likes</th>
                        <th>Comments</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody> {
                    Object.keys(props.videosData).map((video_link, index1) => {
                        return (
                            <tr key={index1}>
                                <td><a href={video_link} target="_blank"><img src={youtube_logo} width="80" height="50"/></a></td>
                                <td>{
                                    <a href={props.videosData[video_link].thumbnail} target="_blank">
                                        <img src={props.videosData[video_link].thumbnail} width="180" height="90"/>
                                    </a>
                                }</td>
                                <td>{
                                    props.videosData[video_link].title
                                }</td>
                                <td>{
                                    props.videosData[video_link].author
                                }</td>
                                <td>{
                                    props.videosData[video_link].likes
                                }</td>
                                <td>
                                    {
                                        (loadingComments && activecommentsLink===video_link && <Spinner/>) ||
                                        <button onClick={
                                            () => {
                                                get_comments(video_link)
                                            }
                                        }><img src={view} width={40} height={40}/></button>
                                    }
                                </td>
                                <td>
                                    { 
                                    downloadLink.hasOwnProperty(video_link)?
                                        <a href={downloadLink[video_link]} target="_blank">
                                            <img src={open_logo} width={40} height={40} border="0"/>
                                        </a>:
                                        (downloading && activeDownloadingLink===video_link && <Spinner/>) || 
                                        <button onClick={
                                            () => {
                                                download_video(video_link)
                                                }
                                            }>
                                            <img src={download_logo} width={40} height={40} border="0"/>
                                        </button>
                                    }
                                </td>
                            </tr>
                        )
                    })
                } </tbody>
            </table>
        } 
            

            </div>)
    
}

ShowVideoData.propTypes = {}

export default ShowVideoData
