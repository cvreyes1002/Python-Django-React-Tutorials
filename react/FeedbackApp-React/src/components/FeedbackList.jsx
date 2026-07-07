import FeedbackItem from "./FeedbackItem"

function FeedbackList({feedback}) {
    if (!feedback || feedback.lenth === 0) {
        return <p>No Feedback Yet!</p>
    }

    return (
    <div className="feedback-list">
        {feedback.map((item) => (
            <FeedbackItem key={item.id} item={item}/>
        ))}
    </div>
  )
}

export default FeedbackList