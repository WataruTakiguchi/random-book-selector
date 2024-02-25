interface SearchButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const ActionButton: React.FC<SearchButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center mb-2"
      onClick={onClick}
      disabled={disabled}
    >
      <span role="img" aria-label="book" className="mr-2">
        📓
      </span>
      新しい本に出会う
    </button>
  );
};

export default ActionButton;
