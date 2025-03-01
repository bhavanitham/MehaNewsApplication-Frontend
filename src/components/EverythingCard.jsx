import React from "react";

function Card(props) {
  return (
    <div className="w-96 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          className="w-96 h-48 object-cover" 
          src={props.imgUrl} 
          alt={props.title} 
        />
        <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 m-2 rounded text-sm">
          {props.source}
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600">
          {props.title}
        </h2>
        
        <p className="text-gray-600 text-sm mb-4">
          {props.description?.substring(0, 150)}...
        </p>
        
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center w-48">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z"/>
              </svg>
              <span className="text-sm text-gray-600 truncate">{props.author || 'Unknown Author'}</span>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(props.publishedAt).toLocaleDateString()}
            </div>
          </div>
          
          <a 
            href={props.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-colors duration-300"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;