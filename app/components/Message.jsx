const Message = ({ message }) => {
  const { content, sender, created_at } = message;
  const formattedTime = new Date(created_at).toLocaleTimeString();

  return (
    <div className={`message ${sender === 'You' ? 'message-user' : 'message-other'}`}>
      <div className="message-header">
        <strong>{sender}</strong> 
        <span className="time">{formattedTime}</span>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Message;
