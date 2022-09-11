import React, {useEffect, useState} from 'react'

function CommentsPopup(props) {

    return (
        <>

            <div style={
                {
                    height: '41.5rem',
                    backgroundImage: "url(https://images.unsplash.com/photo-1600303881706-b8a373dc73c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80)",
                    backgroundSize: 'Cover',
                    backgroundRepeat: 'no-repeat',
                    overflow: 'hidden'
                }
            }>
                <button type="button" className="btn btn-warning py-2 mt-4"
                    onClick={
                        () => {
                            props.showComments(false);
                            props.set_main_header("Scrap latest Youtube videos from any Youtube Channel");
                        }
                }>
                    <span>&#8592;</span>Back to all videos</button>

                <div className='row justify-content-center mx-5'>
                    <div className=' mt-5 shadow-lg bg-white rounded'
                        style={
                            {
                                height: '37rem',
                                width: '85rem',
                            }
                    }>
                        <div style={
                            {
                                height: '35rem',
                                overflowY: 'scroll'
                            }
                        }>

                            <table className="table-bordered border-dark mx-2 my-2">

                                <thead>
                                    <tr>

                                        <th className='w-25'>Name</th>
                                        <th className='w-75'>comments</th>

                                    </tr>
                                </thead>
                                <tbody> {
                                    props.comments.map((data, index) => <tr key={index}>

                                        <td className='w-25'>
                                            {
                                            data.commenter_name
                                        }</td>
                                        <td className='w-75'>
                                            {
                                            data.comment
                                        }</td>
                                    </tr>)
                                } </tbody>
                            </table>
                            <hr></hr>
                            {/* <button onClick={}>Close</button> */} </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentsPopup;
