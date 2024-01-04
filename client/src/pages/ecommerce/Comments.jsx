import React, { useState } from 'react';

function Comments({ initialComments }) {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        // Aquí puedes agregar código para guardar el comentario en tu backend si es necesario
        setComments([...comments, { user: "Usuario actual", comment: newComment }]);
        setNewComment("");
    };

    return (
        <div>
            <h3>Comentarios</h3>
            {comments.map((comment, index) => (
                <div key={index}>
                    <h4>{comment.user}</h4>
                    <p>{comment.comment}</p>
                </div>
            ))}

            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button onClick={handleAddComment}>Agregar comentario</button>
        </div>
    );
}

export default Comments;
