import React, { useState } from 'react';

const FeedForm = ({ onAddFeed }) => {
    const [feedName, setFeedName] = useState('');
    const [feedSource, setFeedSource] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (feedName && feedSource) {
            onAddFeed({ name: feedName, source: feedSource });
            setFeedName('');
            setFeedSource('');
        } else {
            alert('Please fill in both fields.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Feed Name</label>
                <input
                    type="text"
                    value={feedName}
                    onChange={(e) => setFeedName(e.target.value)}
                    className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-gray-300"
                    placeholder="Enter feed name"
                    required
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Feed Source</label>
                <input
                    type="text"
                    value={feedSource}
                    onChange={(e) => setFeedSource(e.target.value)}
                    className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-gray-300"
                    placeholder="Enter feed source (e.g., video URL)"
                    required
                />
            </div>
            <button type="submit" className="w-full py-3 bg-primary hover:bg-primary/90 text-surface font-bold rounded-lg transition-all">
                Add Feed
            </button>
        </form>
    );
};

export default FeedForm;