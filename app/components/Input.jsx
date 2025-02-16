export default function Input({ value, onChange, onSubmit }) {
    return (
      <div className="chat-input w-full md:w-1/2 mx-auto">
        <input
          type="text"
          placeholder="... اكتب هنا"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          className="input"
        />
        <button onClick={onSubmit} className="btn btn-primary">
          ➤
        </button>
      </div>
    );
  }
  