import React, {useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {useRef} from 'react';


function Form(props) {
    const formData = useRef()

    const onsubmitform = async (event) => {
        props.setLoading(true);
        props.showitems(false);
        // Disable default action of form submit button
        event.preventDefault();

        // Accessing form reference with formData variable.
        // Object destructuring to get form fields with their name.
        var {
            channel_link,
            num_videos
        } = formData.current;

        const channel_link_value = channel_link.value
        const num_videos_value = num_videos.value

        const request_options = {
            method: "POST",
            headers: {
                "X-CSRFToken": window.CSRF_TOKEN,
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {channel_link: channel_link_value, num_videos: num_videos_value}
            )
        };

        let result = await fetch("http://127.0.0.1:8000/scrap/get-videos", request_options)
        result = await result.json();

        props.get_videos_data(result)
        props.showitems(true)
        props.setLoading(false)
    }
    return (
        <div>

            <form ref={formData}
                onSubmit={onsubmitform}
                className="row row-cols-lg-auto g-3 justify-content-center">
                <div className="col">
                    <label className="visually-hidden" htmlFor="url">Youtube channel link</label>
                    <input type="text" className="form-control" id="url" placeholder="Youtube channel url" name="channel_link" required/>
                </div>

                <div className="col">
                    <label className="visually-hidden" htmlFor="num-images">No. of videos</label>
                    <input required name="num_videos"
                        min={1}
                        type="number"
                        className="form-control"
                        id="num-images"
                        placeholder="No. of videos"
                        style={
                            {width: "5rem"}
                        }/>
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-primary">Scrap latest videos</button>
                </div>
            </form>
        </div>
    )
}
Form.propTypes = {}

export default Form
