import React from 'react'
import RatingItem from '../RatingItem'

const LinearRating = (props) => {
    return (
        <div className="w-auto sm:w-full flex items-center justify-items-center sm:justify-between px-2 mx-auto">
            <div className="flex">
               <RatingItem value={props.value} threshold={1}/>
               <RatingItem value={props.value} threshold={2}/>
               <RatingItem value={props.value} threshold={3}/>
               <RatingItem value={props.value} threshold={4}/>
               <RatingItem value={props.value} threshold={5}/>
            </div>
            <div className="text-black">
                {props.value}
            </div>
        </div>
    )
}

export default LinearRating;