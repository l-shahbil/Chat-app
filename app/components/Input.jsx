const Input = ({ value, onChange, onSubmit }) => (
  <div className="flex items-center space-x-4 w-full">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Type your message..."
      className="p-2 border border-gray-300 rounded-lg flex-grow"
    />
    <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
  </div>
);

export default Input;
