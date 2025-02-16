import { FaUserCircle } from "react-icons/fa";

const Message = ({ message, currentUser }) => {
    const { content, sender, created_at } = message;
    const formattedTime = new Date(created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isUser = sender === currentUser;  // Check if the message is from the current user
  
    return (
      <div className={`flex flex-col ${isUser ? 'items-end self-end' : 'items-start self-start'} mb-2`}>
          <div className="flex items-center mb-2 gap-2">
            {!isUser && <FaUserCircle className='w-6 h-6' />
            }
            <span className={'font-semibold text-gray-600'}>
              {sender}
            </span>
            {isUser && <FaUserCircle className='w-6 h-6'/>
            }
          </div>
        <div
          className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
            isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black' // Blue for user, green for others
          }`}
        >
          <div className="rounded-lg shadow-sm">
            <p className="text-base break-words">{content}</p>
          </div>
          <div className="text-xs text-right mt-1 opacity-70">{formattedTime}</div>
        </div>
      </div>
    );
  };
  
  export default Message;
  