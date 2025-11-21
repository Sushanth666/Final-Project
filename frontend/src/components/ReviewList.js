import React from 'react';
import ReviewItem from './ReviewItem'; // We will create this next

export default function ReviewList({ reviews, onEdit, onDelete }) {
  if (reviews.length === 0) {
    return (
      <p className="text-center text-gray-600 italic mb-6">
        No reviews yet. Be the first!
      </p>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      {reviews.map(review => (
        <ReviewItem 
          key={review.id} 
          review={review} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}